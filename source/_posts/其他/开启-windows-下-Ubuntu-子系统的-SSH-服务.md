---
title: 开启 windows 下 Ubuntu 子系统的 SSH 服务
tags:
  - ssh
  - ubuntu
  - win10
id: 1503
categories:
  - 教程
date: 2020-05-25
---

```bash
# 卸载openssh-client
sudo apt-get remove openssh-client # 卸载openssh-client并重新安装

# 安装ssh服务
sudo apt-get install ssh
# 理论上包含了 openssh-server 和客户端 openssh-client，如果安装出现异常，请独立安装这两个

# 修改配置
vi /etc/ssh/sshd_config

Port = 22 # 默认是22端口，如果和windows端口冲突或你想换成其他的否则不用动
#ListenAddress 0.0.0.0 # 如果需要指定监听的IP则去除最左侧的井号，并配置对应IP，默认即监听PC所有IP
PermitRootLogin yes # 如果你需要用 root 直接登录系统则此处改为 yes
PasswordAuthentication yes # 将 no 改为 yes 表示使用帐号密码方式登录

# 设置密码
passwd root

# 启动 ssh 服务
service ssh start
# sudo /etc/init.d/ssh start

# 查看 ssh 状态
service ssh status
```

> 局域网内的其他终端无法连接: 不要忘了，还要配置防火墙开启端口才能被其他 PC 访问
