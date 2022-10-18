import re

import requests

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) \
        AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
}
# 构造资源地址
url_list = [f"https://www.qqtxt.cc/list/1_{str(i)}.html" for i in range(1, 11)]
ex = '<li><span class="s2">《<a href=".*?" target="_blank">(.*?)</a>》</span>'
# 发送请求
for url in url_list:
    res = requests.get(url, headers=headers)
    res.encoding = "gbk"
    data = re.findall(ex, res.text, re.S)
    print(data)
