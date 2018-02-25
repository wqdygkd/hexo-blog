---
title: hexo博客托管到coding
date: 2018-02-25
updated: 2018-02-25
tags: hexo
---

# coding上创建一个新项目

创建项目 `cuilongjin` ，获取这个项目的ssh地址，我的是 `https://git.coding.net/cuilongjin/cuilongjin.git`

# `_config.yml` 配置

修改博客根目录下 `_config.yml` 文件中的deploy如下
```yml
deploy:
- type: git
  repo: ssh://git@github.com/cuilongjin/cuilongjin.github.io.git
  branch: master
- type: git
  repo: ssh://git@git.coding.net:cuilongjin/cuilongjin.git
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
