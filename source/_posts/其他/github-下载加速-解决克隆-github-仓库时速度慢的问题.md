---
title: github 下载加速--解决克隆 github 仓库时速度慢的问题
tags:
  - github
id: '890'
categories:
  - 前端
date: 2020-03-09 17:13:21
---

## 修改 host 方式

访问 http://tool.chinaz.com/dns 或 https://www.ipaddress.com/

查询以下三个链接的 DNS 解析地址

```
github.com
assets-cdn.github.com
github.global.ssl.fastly.net
```

找到 TTL 值最小的 IP，修改系统 Hosts 文件

之后刷新系统 DNS 缓存

Windows+X 打开系统命令行（管理员身份）或 powershell

运行 ipconfig /flushdns 手动刷新系统 DNS 缓存。

## 利用国内代码管理平台中转

利用码云(gitee)

新建仓库-导入已有仓库 将 github 仓库 clone 到 gitee 中

如果项目中有子模块，同理也需要 clone 到 gitee 中，同时修改主仓库中的 .gitmodules 文件，将子模块的地址修改为 gitee 地址

## 使用 GitHubDesktop 客户端

## 使用代理

仅仅开代理是不行的，需要单独配置

如果使用 HTTPS 协议克隆需要如下配置

```bash
# 设置代理
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080

#取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

使用 SSH 协议克隆需要如下配置

修改.ssh/config

```
Host github.com
Hostname github.com
ProxyCommand connect -S 127.0.0.1:1080 %h %p
```

1080 端口换成你本地代理客户端的 socks 端口

## github.com.cnpmjs.org 镜像站

```bash
git clone https://github.com/vuejs/vue.git
# 改为
git clone https://github.com.cnpmjs.org/vuejs/vue.git
```
