---
title: speedtest 测速脚本
tags:
  - linux
id: '230'
categories:
  - - 教程
date: 2019-10-25 00:00:30
---

```bash
wget https://raw.github.com/sivel/speedtest-cli/master/speedtest.py
# 添加权限
chmod a+rx speedtest.py
# 简单的使用方法
python speedtest.py
# 生成一张图片，并分享给其他人
python speedtest.py --share
# 在默认情况下，SpeedTest是选择离测试机最近的一个节点进行测试的，如果你想要自定义测试到某个地区的上传/下载速率，那首先列出目前可用的SpeedTest服务器：
python speedtest.py --list
# 此时会列出所有的服务器（按照距离远近进行排列）
# 如果想一点一点的列出服务器，请输入：
python speedtest.py --list|more
# 如果你想列出指定地区的测试节点，可以使用
python speedtest.py --list | grep China
python speedtest.py --server 22991
# 如果是要生成分享的图片，那就加上 share
python speedtest.py --server 11599 --share
```

