---
title: nodejs 安装与版本管理工具
tags:
  - nodejs
id: '439'
categories:
  - 前端
date: 2020-01-19 17:05:05
---

## 服务器端

[n](https://github.com/tj/n)
[nvm](https://github.com/nvm-sh/nvm)
[NodeSource](https://github.com/nodesource/distributions)

安装 n

```bash
npm install -g n
```

使用 n 管理 nodejs 版本

```bash
n --latest               # Output the latest node version available
n --lts                  #  Output the latest LTS node version available
n ls                     # Output downloaded versions
n ls-remote [version]    # Output matching versions available for download
n uninstall              # Remove the installed node and npm

# 安装最新版
n latest

# 安装长期支持版本
n lts

# 安装指定版本
n 12.4.1

# 切换nodejs版本
n
# 上下键选择已安装的版本，回车切换
ο node/13.6.0
  node/10.4.1

# 查看当前版本 node -v
node -v
```

## windows 端

[nvm-windows](https://github.com/coreybutler/nvm-windows)

### 安装

注意：1. 需要卸载已经安装的 nodejs 版本，并删除残留的 nodejs 程序目录（例如："C:\Program Files\nodejs"）
2. 删除 npm 全局安装的包（"C:\Users\<user>\AppData\Roaming\npm"

* 安装 nvm-windows [下载](https://github.com/coreybutler/nvm-windows/releases)

* 重新安装全局包
	安装完成后，必须为每个安装版本的node重新安装全局工具


### 使用

nvm-windows runs in an Admin shell. You'll need to start powershell or Command Prompt as Administrator to use nvm-windows

NVM for Windows is a command line tool. Simply type nvm in the console for help. The basic commands are:

* `nvm arch [32|64]`: Show if node is running in 32 or 64 bit mode. Specify 32 or 64 to override the default architecture.
* `nvm install <version> [arch]`: The version can be a node.js version or "latest" for the latest stable version. Optionally specify whether to install the 32 or 64 bit version (defaults to system arch). Set [arch] to "all" to install 32 AND 64 bit versions.
* `nvm list [available]`: List the node.js installations. Type available at the end to show a list of versions available for download.
* `nvm on`: Enable node.js version management.
* `nvm off`: Disable node.js version management (does not uninstall anything).
* `nvm proxy [url]`: Set a proxy to use for downloads. Leave [url] blank to see the current proxy. Set [url] to "none" to remove the proxy.
* `nvm uninstall <version>`: Uninstall a specific version.
* `nvm use <version> [arch]`: Switch to use the specified version. Optionally specify 32/64bit architecture. nvm use <arch> will continue using the selected version, but switch to 32/64 bit mode based on the value supplied to <arch>. For information about using use in a specific directory (or using .nvmrc), please refer to issue #16.
* `nvm root <path>`: Set the directory where nvm should store different versions of node.js. If <path> is not set, the current root will be displayed.
* `nvm version`: Displays the current running version of NVM for Windows.
* `nvm node_mirror <node_mirror_url>`: Set the node mirror.People in China can use https://npm.taobao.org/mirrors/node/
* `nvm npm_mirror <npm_mirror_url>`: Set the npm mirror.People in China can use https://npm.taobao.org/mirrors/npm/
