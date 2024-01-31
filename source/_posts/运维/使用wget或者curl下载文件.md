---
title: 使用wget或者curl下载文件
tags:
  - linux
id: '1947'
categories:
  - - uncategorized
date: 2020-08-11
---

## 下载 github release 文件

下载编译好的软件包（需要有编译的包）

```bash
# wget
wget --no-check-certificate --content-disposition https://github.com/ctripcorp/apollo/releases/download/v1.5.1/apollo-adminservice-1.5.1-github.zip

# curl
curl -LJO https://github.com/ctripcorp/apollo/releases/download/v1.5.1/apollo-adminservice-1.5.1-github.zip
```

下载源码压缩包

wget -q https://github.com/git/git/archive/v${GIT_VERSION}.tar.gz

wget -O git-master.zip https://github.com/git/git/archive/${GIT_BRANCH}.zip
