---
title: Git 问题总结
date: 2018-01-20
updated: 2018-01-20
tags: Git
---

1. `git add .` 的时候遇到 `warning: LF will be replaced by CRLF in ......` 解决办法

```bash
git config core.autocrlf

git config --global core.autocrlf false
```

2. 合并pull两个不同的项目，出现 `fatal: refusing to merge unrelated histories`

```bash
git pull origin master ----allow-unrelated-histories
```