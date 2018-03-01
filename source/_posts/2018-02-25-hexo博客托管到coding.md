---
title: hexo博客托管到coding
date: 2018-02-25
updated: 2018-02-25
tags: hexo
---

# coding上创建一个新项目

创建项目 `cuilongjin` ，获取这个项目的ssh地址

> 若用户名与仓库名相同，可以直接访问 `用户名.coding.me` 访问博客

# \_config.yml 配置

修改博客根目录下`_config.yml`文件中的deploy如下

```yml
deploy:
  type: git
  repo: 
    github: ssh://git@github.com/cuilongjin/cuilongjin.github.io.git
    coding: ssh://git@git.coding.net/cuilongjin/cuilongjin.git
  branch: master
```

# 设置SSH公钥
可以直接使用之前部署github时已经生成的公钥
添加后，在git bash命令输入：

```bash
ssh -T git@git.coding.net
```

如果得到下面提示就表示公钥添加成功了：
Coding 提示: Hello cuilongjin, You've connected to Coding.net via SSH. This is a personal key.

# pages服务方式部署

在 `source/` 需要创建一个空白文件

```bash
cd source
touch Staticfile  #名字必须是Staticfile
```
