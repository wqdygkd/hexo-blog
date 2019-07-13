---
title: 常用命令
categories:
  - [工具]
data: 2019/07/12
---



快速删除 node_modules 文件夹

```bash
rmdir -r node_modules
# 或
rm -r node_modules

# 或使用 npm 包
npm i rimraf -g
rimraf node_modules

npm i -g dlf
dlf node_modules
```



一次执行多条命令

```bash
# cmd 使用 && 连接多个命令
cd vue && npm i
# powershell 使用 | 连接多条命令
cd vue | npm i
```



