---
title: 使用wget或者curl下载github release文件
tags: []
id: '1947'
categories:
  - - uncategorized
---

wget wget --no-check-certificate --content-disposition [https://github.com/ctripcorp/apollo/releases/download/v1.5.1/apollo-adminservice-1.5.1-github.zip](https://github.com/ctripcorp/apollo/releases/download/v1.5.1/apollo-adminservice-1.5.1-github.zip)

curl curl -LJO [https://github.com/ctripcorp/apollo/releases/download/v1.5.1/apollo-adminservice-1.5.1-github.zip](https://github.com/ctripcorp/apollo/releases/download/v1.5.1/apollo-adminservice-1.5.1-github.zip)