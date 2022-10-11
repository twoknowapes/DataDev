import re
import socket

# 获取到资源地址
url_list = [
    "https://pic.netbian.com/uploads/allimg/220211/004115-1644511275bc26.jpg",
    "https://pic.netbian.com/uploads/allimg/220215/233510-16449393101c46.jpg",
    "https://pic.netbian.com/uploads/allimg/211120/005250-1637340770807b.jpg",
]
for url in url_list:
    # 创建 socket 套接字
    client = socket.socket()
    # 创建连接
    client.connect(("pic.netbian.com", 80))
    # 构造 https 请求
    https_reqs = (
        "GET "
        + url
        + " HTTP/1.1\r\nuser-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) \
        AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    )
    print(https_reqs)
    client.send(https_reqs.encode())

    # 接收数据
    res = b""
    data = client.recv(1024)
    while data:
        res += data
        data = client.recv(1024)
    # 关闭连接
    client.close()

    # 提取数据
    imgs = re.findall(b"\r\n\r\n(.*)", res, re.S)

    # 保存数据
    with open(f"{url}.png", "wb") as f:
        f.write(imgs[0])
