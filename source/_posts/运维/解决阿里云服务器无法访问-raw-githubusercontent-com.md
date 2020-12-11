---
title: 解决阿里云服务器无法访问 raw.githubusercontent.com
tags: []
id: '1912'
categories:
  - - 教程
date: 2020-07-23 18:18:59
---

原因是因为dns污染，没法找到正确的ip，可以通过修改host解决

访问[这里](https://githubusercontent.com.ipaddress.com/raw.githubusercontent.com)获取正确的ip地址

打开服务器的 hosts 文件

```bash
vim /etc/hosts

# 添加这一行内容
获取到的ip raw.githubusercontent.com

# 或者直接添加下面这一行
199.232.68.133 raw.githubusercontent.com
```

保存退出，ping 一下试试
