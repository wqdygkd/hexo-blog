---
title: Git 使用 submodule 管理子模块
date: 2018-01-20
updated: 2018-01-20
tags: Git
---

# 使用 Git Submodule 解决下面几个问题：

A项目，C项目，B库

1. 如何在A项目中使用B库
2. B库在A项目中被修改了如何提交到B库远程库
3. C项目如何获取b库最新的提交
4. clone A项目时如何自动导入B库

## 什么是Submodule

> git Submodule 是一个很好的多项目使用共同类库的工具，他允许类库项目做为repository,子项目做为一个单独的git项目存在父项目中，子项目可以有自己的独立的commit，push，pull。而父项目以Submodule的形式包含子项目，父项目可以指定子项目header，父项目中会的提交信息包含Submodule的信息，再clone父项目的时候可以把Submodule初始化

## 1. 使用Submodule

使用git命令向A项目中添加Submodule B ：

```bash
git submodule add git@github.com:cuilongjin/B.git
```

使用 `git status` 命令可以看到

```bash
On branch master
Changes to be committed:
    new file:   .gitmodules
    new file:   B
```

> `.gitmodules` 文件是一个配置文件,保存了项目 URL 和你拉取到的本地子目录

```bash
[submodule "B"]
        path = B
        url = git@github.com:cuilongjin/B.git
```

> 可以看到记录了子项目的目录和子项目的git地址信息。text 内容只保护子项目的commit id，就能指定到对于的git header上。父项目的git并不会记录Submodule的文件变动，它是按照commit git指定Submodule的git header。这两个文件都需要提交到父项目的git中。

## 2. 修改Submodule

> 需要确认有对Submodule B 的commit权限

进入Submodule B目录里面，提交Submodule的更改内容：

```bash
git add
git commit -m'submodule A'
```

然后push 到远程服务器: `git push`

然后再回到父目录,提交 Submodule B 在父项目中的变动：

```bash
git status
on branch master

modified: B (new commits)
```

可以看到 B 中已经变更为 Submodule 最新的commit id:

```bash
Subproject commit *********
```

把Submodule的变动信息推送到父项目的远程服务器

```bash
git commit -m'update submodule B'
git push
```

这样就把子模块的变更信息以及子模块的变更信息提交到远程服务器了，从远程服务器上更新下来的内容就是最新提交的内容了。

## 3. 更新Submodule

1. 在父项目的目录下直接运行

```bash
git submodule foreach git pull
```

2. 在Submodule B 的目录下面更新

```bash
cd B
git pull
```

## 4. clone Submodule

克隆一个带子模块的项目

1. 采用递归参数 --recursive

```bash
git clone git@github.com:cuilongiin/   --recursive
```

2. 第二种方法先clone父项目，再初始化Submodule

```bash
git clone git@github.com:cuilongjin/
cd B
git submodule init //初始化你的本地配置文件
git submodule update //
```

## 删除Submodule

```bash
git rm [submodule name]
```
