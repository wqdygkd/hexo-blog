---
title: 网站配置SSL后无法访问解决办法
tags:
  - ssl
  - wordpress
id: '450'
categories:
  - - wordpress
date: 2020-02-04 14:04:31
---

1. 开放 443 端口

2. 域名证书有效且配置正确

3. ssl配置问题


正确启用HTTP/2支持，正确配置ssl_protocols和ssl_ciphers

启用HTTP2并非只在 listen 443 ssl 配置中加入http2就行了，它主要需要两个地方的设置支持：ssl_protocols 和 ssl_ciphers 。

修改如下配置以向后兼容

```diff
listen 443 ssl http2;
- ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
+ ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
```

在线 http2 检测

https://www.rosehosting.com/network-tools/http2-support.html

https://myssl.com/http2_check.html

https://www.ssllabs.com/ssltest/analyze.html

![](/wp-content/uploads/2020/03/HTTP2-test.png)
![](/wp-content/uploads/2020/03/HTTP2-test-1.png)

