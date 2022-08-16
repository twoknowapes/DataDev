import sys
from abc import ABC, abstractmethod
from typing import Iterable, List, Literal, Optional, TextIO
from urllib import parse

import requests
from lxml import etree


class Post:
    """Hacker News 上的条目

    :param title: 标题
    :param link: 链接
    :param points: 当前得分
    :param comments_cnt: 评论数
    """

    def __init__(self, title: str, link: str, points: str, comments_cnt: str):
        self.title = title
        self.link = link
        self.points = points
        self.comments_cnt = comments_cnt


# 大类拆小类实现 SRP（单一职责原则）
class PostsWriter:
    """负责将帖子列表写入文件中"""

    def __init__(self, fp, title: str):
        self.fp = fp
        self.title = title

    def write(self, posts: List[Post]):
        self.fp.write(f"# {self.title}\n\n")
        for i, post in enumerate(posts, 1):
            self.fp.write(f"> TOP {i}: {post.title}\n")
            self.fp.write(f"> 分数: {post.points} 评论数: {post.comments_cnt}\n")
            self.fp.write(f"> 地址: {post.link}\n")
            self.fp.write("------\n")


class PostFilter(ABC):
    """抽象类：定义如何过滤帖子结果"""

    @abstractmethod
    def validate(self, post: Post) -> bool:
        """判断帖子是否应该保留"""
        pass


class DefaultPostFilter(PostFilter):
    """保留所有帖子"""

    def validate(self, post: Post) -> bool:
        return True


class HNTopPostsSpider:
    """抓取 Hacker News Top 内容条目

    :param fp: 存储抓取结果的目标文件对象
    :param limit: 限制条目数目、默认为 5
    :param filter_by_hosts: 过滤结果的站点列表、默认为 None、代表不过滤
    """

    items_url = "https://news.ycombinator.com/"
    file_title = "Top news on HN"

    def __init__(self, limit: int = 5, filter_by_hosts: Optional[List[str]] = None):
        self.limit = limit
        self.filter_by_hosts = filter_by_hosts

    def fetch(self) -> Iterable[Post]:
        """从 Hacker News 抓取 Top 内容

        :return: 可迭代的 Post 对象
        """
        resp = requests.get(self.items_url)

        # 使用 Xpath 可以方便地从页面解析出需要的内容
        html = etree.HTML(resp.text)
        items = html.xpath('//table[@class="itemlist"]/tr[@class="athing"]')

        counter = 0
        for item in items[: self.limit]:
            node_title = item.xpath('./td[@class="title"]/a')[0]
            node_detail = item.getnext()
            points_text = node_detail.xpath('.//span[@class="score"]/text()')
            comments_text = node_detail.xpath(".//td/a[last()]/text()")[0]

            post = Post(
                title=node_title.text,
                link=node_title.get("href"),
                # 条目可能会没有评分
                points=points_text[0].split()[0] if points_text else "0",
                comments_cnt=comments_text.split()[0],
            )
            # 使用测试方法来判断是否返回该帖子
            if self._check_link_from_hosts(post.link):
                counter += 1
                yield post

    def _check_link_from_hosts(self, link: str):
        """检查某链接是否属于所定义的站点"""
        if self.filter_by_hosts is None:
            return True
        pares_link = parse.urlparse(link)
        return pares_link.netloc in self.filter_by_hosts


class GithubPostFilter(PostFilter):
    """仅过滤 GitHub 站点"""

    def validate(self, post: Post) -> bool:
        parsed_link = parse.urlparse(post.link)
        return parsed_link.netloc == "github.com"


class GithubNBloomBergPostFilter(PostFilter):
    """过滤 GitHub/Bloomberg 站点"""

    def validate(self, post: Post) -> bool:
        parse_link = parse.urlparse(post.link)
        return parse_link.netloc in ("gitbub.com", "bloomberg.com")


# 实现新角色将写入和读取的工作串联起来
def get_hn_top_posts(fp: Optional[TextIO] = None):
    """获取 Hacker News Top 内容、并将其写入文件中

    :param fp: 需要写入的文件、如未提供、将向标准输出打印
    """
    dest_fp = fp or sys.stdout
    hosts = None
    hosts = ["github.com", "bloomberg.com"]
    crawler = HNTopPostsSpider(filter_by_hosts=hosts)
    writer = PostsWriter(dest_fp, title="Tops new on HN")
    writer.write(list(crawler.fetch()))


if __name__ == "__main__":
    get_hn_top_posts()
