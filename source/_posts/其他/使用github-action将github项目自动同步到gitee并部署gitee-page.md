---
title: 使用 github actions 将 github 项目自动同步到 gitee 并自动部署 Gitee Pages
tags:
  - github actions
  - github pages
  - gitee pages
id: 2023
categories:
  - 教程
date: 2021-03-03
---

由于 github Pages 和 netlify 的访问速度慢，所以现在将博客部署到 Gitee Pages

先使用 wearerequired/git-mirror-action 将 GitHub 仓库同步到 Gitee 仓库，再使用 yanglbme/gitee-pages-action 实现 Gitee Pages 的自动部署。

### 配置秘钥

* 使用命令 `ssh-keygen -t rsa -C "youremail@example.com"` 生成 SSH Key(⚠️注意此处不要设置密码)

* 在 GitHub 项目的「​Settings -> Secrets」路径下配置好命名为 `GITEE_RSA_PRIVATE_KEY` 和 `GITEE_PASSWORD` 的两个密钥。其中：`GITEE_RSA_PRIVATE_KEY` 存放 `id_rsa` 私钥；`GITEE_PASSWORD` 存放 `Gitee` 帐号的密码

* 在 GitHub 的个人设置页面「Settings -> SSH and GPG keys」​ 配置 SSH 公钥（即：id_rsa.pub），命名随意

* 在 Gitee 的个人设置页面「安全设置 -> SSH 公钥」​ 配置 SSH 公钥（即：id_rsa.pub），命名随意

### 示例

```yml
name: Sync to Gitee

on:
  push:
    branches: [main, gh-pages]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 注意在 Settings->Secrets 配置 GITEE_RSA_PRIVATE_KEY
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          # 注意替换为你的 GitHub 源仓库地址
          source-repo: git@github.com:cuilongjin/hexo-blog.git
          # 注意替换为你的 Gitee 目标仓库地址
          destination-repo: git@gitee.com:cuilongjin/hexo-blog.git

      - name: Build Gitee Pages
        uses: yanglbme/gitee-pages-action@main
        with:
          # 注意替换为你的 Gitee 用户名
          gitee-username: cuilongjin
          # 注意在 Settings->Secrets 配置 GITEE_PASSWORD
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          # 注意替换为你的 Gitee 仓库，仓库名严格区分大小写，请准确填写，否则会出错
          gitee-repo: cuilongjin/hexo-blog
          # 要部署的分支，默认是 master，若是其他分支，则需要指定（指定的分支必须存在）
          branch: gh-pages
```
