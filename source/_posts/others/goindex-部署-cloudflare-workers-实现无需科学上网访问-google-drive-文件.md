---
title: GoIndex 部署 CloudFlare Workers 实现无需科学上网访问 Google Drive 文件
tags: []
id: '1223'
categories:
  - - 教程
date: 2020-04-22 00:00:45
---

04/27 更新 解决 workers 无法正常访问

作者删除了 github 仓库， GoIndex 依赖的 js 资源加载失败，导致网页打开是一片空白

解决方法；

首先到 GitHub Fork 一份 goindex，可以直接 fork [我的](https://github.com/cuilongjin/goindex)，

登录 CF，打开 workers，选中项目，找到以下代码，我的是在 21 行，替换成有效的即可（可以是你 fork 的，也可以直接使用我的）

```html
<script src="//cdn.jsdelivr.net/combine/gh/jquery/jquery@3.2/dist/jquery.min.js,gh/donwa/goindex@${authConfig.version}/themes/${authConfig.theme}/app.js"></script>
```

替换成

```html
<script src="//cdn.jsdelivr.net/combine/gh/jquery/jquery@3.2/dist/jquery.min.js,gh/cuilongjin/goindex/themes/${authConfig.theme}/app.js"></script>
```

原文

利用 GoIndex 程序，以及 CloudFlare，可以将 Google Drive 文件以目录形式（类似 OneIndex 部署 OneDrive 网盘）列出，可直链调用网盘图片、音频、视频文件等，也可以下载，流量走 CloudFlare ，网速由 CloudFlare 决定

项目地址： https://github.com/donwa/goindex

demo： https://index.gd.workers.dev/

安装部署方案 1

1、在本地安装 rclone
2、按照 https://rclone.org/drive/ 流程进行授权
3、执行 rclone config file 查看 rclone.conf 路径。找到 root_folder_id 和 refresh_token 记录下来
4、下载 https://github.com/donwa/goindex 中的 index.js 并填入 root 和 refresh_token
5、复制代码 到 CloudFlare 部署

安装部署方案 2

作者不会记录 refresh_token，但为避免纠纷，建议有条件的同学使用方案 1 进行部署
1、访问https://install.gd.workers.dev/
2、授权认证后，生成部署代码
3、复制代码 到 CloudFlare 部署

目录 id：例如 google 网盘链接为`https://drive.google.com/drive/folders/1rrDnupW_1qxRnQf-jy_0PN_GqNK8SEk2`，则目录 id 为 `1rrDnupW_1qxRnQf-jy_0PN_GqNK8SEk2`

部署 CloudFlare

绑定自定义域名

https://github.com/donwa/goindex/issues/4
