---
title: 免费申请SSL证书，为网站启用 HTTPS
tags:
  - ssl
id: '1909'
categories:
  - 前端
date: 2020-07-22 17:30:04
---

## Let's Encrypt

官方网站：https://letsencrypt.org/

现提供通配符 SSL 证书，需使用 certbot 或 acme.sh 手动发行

### certbot

github：https://github.com/certbot/certbot

安装 EPEL

EPEL (Extra Packages for Enterprise Linux)是由 Fedora 社区打造，为 RHEL 及衍生发行版如 CentOS、Scientific Linux 等提供额外的软件包

```bash
yum -y install epel-release
```

安装 certbot

```bash
yum -y install certbot
```

申请 SSL 证书

```bash
certbot certonly --standalone -d www.test.org
```

证书文件在 /etc/letsencrypt/ 文件夹下

### acme.sh

acme.sh 实现了 acme 协议, 可以从 letsencrypt 生成免费的证书

github：https://github.com/acmesh-official/acme.sh/wiki/说明

### 宝塔面板

支持一键配置 `宝塔SSL`,`Let's Encrypt`免费证书

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@main/img/20210102184437.png)

## freessl

提供免费HTTPS证书申请 https://freessl.cn/

## 其他

HTTPS 网站检测 https://myssl.com/


参考文章：

https://teddysun.com/527.html
