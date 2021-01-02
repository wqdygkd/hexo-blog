---
title: 使用 github 仓库作为图床，并用 jsDelivr 加速
tags:
  - github
  - 图床
  - jsDelivr
id: 2007
date: 2020-12-09
---

## github+JSDelivr

1. 创建一个仓库来存储需要存放的静态资源

2. 使用JSDelivr加速加载Github资源

形式为 `https://cdn.jsdelivr.net/gh/{Github用户名}/{Github仓库名}@{版本名}/{仓库下资源路径}`

其中版本名可以是当前仓库的 Release 或分支名

例如 github 链接为

```
https://github.com/cuilongjin/static/blob/main/test.txt
```

则使用JSDelivr加速链接为

```
https://cdn.jsdelivr.net/gh/cuilongjin/static@main/test.txt
```

3. 使用 picgo 进行图片上传

> picgo 一款图片上传的工具，目前支持SM.MS图床，七牛图床，腾讯云COS，阿里云OSS，Imgur，又拍云，GitHub等图床
> github地址：https://github.com/Molunerfinn/PicGo
> 配置手册：https://picgo.github.io/PicGo-Doc/zh/guide/
> 插件：https://github.com/PicGo/Awesome-PicGo

配置 github图床

仓库名为第一步创建的仓库，分支名随意，我的为 main
token 获取地址: https://github.com/settings/tokens，点击 `Generate new token` ,复选框为你这个 token 的权限，勾选 `repo` 即可
存储路径为仓库目录，可以随意
自定义域名根据需要设置，这里我们设置为 jsdelivr 加速域名，形式为 `https://cdn.jsdelivr.net/gh/{Github用户名}/{Github仓库名}@{版本名}`

![](https://cdn.jsdelivr.net/gh/cuilongjin/static@main/img/20210101223210.png)


## 使用 npm+JSDelivr

需要将当前仓库发布为npm包

去 npm 官网注册个账号去,然后

```bash
npm login
npm publish
```

如果你的包名为 `@your-name/your-package` 时需要 `--access public` 参数，原因是当包名以 `@your-name` 开头时，`npm publish` 会默认发布为私有包，但是 npm 的私有包需要付费

请注意，如果你之前用过淘宝镜像，那么请先手动切回官方源 `npm config set registry https://registry.npmjs.org`

发布成功之后，可以通过以下方式访问文件

`https://cdn.jsdelivr.net/npm/(yourpackagename)@(version)/(file)`

> 其他一些镜像
>
> unpkg https://www.unpkg.com
> 知乎出品 https://unpkg.zhimg.com/
> 百度 https://code.bdstatic.com/npm/
> 饿了么 https://shadow.elemecdn.com/npm/

当文件有更新时，需要更新发布

```bash
# 删除指定的版本
npm unpublish 包名@版本号
# 重新发布
npm publish
```

配置 github action 自动发布

```yml
name: npm Package

on:
  push:
    branches:
      - main

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2.1.2
        with:
          node-version: '12.x'

      - run: npm unpublish @cuilongjin/static@1.0.0

      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```
