---
title: pm2 - node 进程管理工具
tags:
  - nodejs
  - pm2
id: '1800'
categories:
  - 前端
date: 2020-07-01 11:01:06
---

安装

```bash
$ npm install pm2 -g
```

使用

```bash
$ pm2 list # 显示所有进程状态

$ pm2 start <js文件路径>.js # 同 node <js文件路径>.js
$ pm2 start <json描述文件路径>.json
$ pm2 start <python文件路径>.py --interpreter python
$ pm2 start <sh文件路径>.sh --interpreter bash
$ pm2 start ./node_modules/<某模块名称>/<模块主文件路径>.js
$ pm2 start <某种方式> -- --param_name param_value
$ pm2 start npm -- start # 同 npm start
$ pm2 start npm -- run <scriptname> # 同 npm run <scriptname>
$ pm2 start npm --watch --name <taskname> -- run <scriptname> # --name 指定任务名 --watch监听文件变化

$ pm2 start yarn -- start
$ pm2 start yarn -- run <scriptname>

$ pm2 stop     <app_name|namespace|id|'all'|json_conf> # 停止进程  all 停止所有进程
$ pm2 restart  <app_name|namespace|id|'all'|json_conf> # 重启进程  all 重启所有进程
$ pm2 delete   <app_name|namespace|id|'all'|json_conf> # 删除进程  all 删除所有进程
$ pm2 reload all # 重载所有进程

$ pm2 describe <id|app_name> # 进程详情

$ pm2 monit # 进程日志、详情

# 更新 PM2
# Install latest PM2 version
$ npm install pm2@latest -g
# Save process list, exit old PM2 & restore all processes
$ pm2 update
```
