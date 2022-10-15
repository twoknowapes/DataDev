import requests

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) \
        AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
}
url = "http://www.cninfo.com.cn/new/disclosure"
for p in range(1, 4):
    data = {
        "column": "szse_latest",
        "pageNum": p,
        "pageSize": 30,
        "sortName": "",
        "sortType": "",
        "clusterFlag": "true",
    }
    res = requests.post(url, headers=headers, data=data)

    with open("./cninfo.txt", "a", encoding="utf-8") as f:
        d = res.json()["classifiedAnnouncements"]
        for i in range(30):
            for j in range(len(d[i])):
                f.write(
                    d[i][j]["announcementTitle"]
                    + "\t"
                    + d[i][j]["announcementTypeName"]
                    + "\t"
                    + d[i][j]["secName"]
                    + "\n"
                )
