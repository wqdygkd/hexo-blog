---
title: rclone 检查否拷贝完全
tags: []
id: '1511'
categories:
  - - uncategorized
---

检查是否拷贝完全？发现丢文件了？

A. 拷贝完请做以下检查

rclone --config rclone.conf size src001:源路径 rclone --config rclone.conf size dst001:目标路径 如果发现目标盘比源盘体积还要大，那么对目标盘进行去重；如果发现目标盘比源盘少文件了，那么再拷贝一次；如果还是少，那么就是源盘里面的有重复文件了，直接对其进行去重复。去重命令：

rclone --config rclone.conf dedupe dst001:源路径 rclone --config rclone.conf dedupe src001:目标路径