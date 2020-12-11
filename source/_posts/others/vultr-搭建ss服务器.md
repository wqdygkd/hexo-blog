---
title: 搭建ss服务器
tags:
  - ss
id: '224'
categories:
  - - 教程
date: 2019-07-09 00:00:08
---

## 购买 VPS 服务器

vultr 注册地址：https://www.vultr.com/

利用 `ipip` 这个网站的 实用工具里的 ping 来全国性的 ping 我们的主机，检测连通性

## 部署 VPS 服务器

### ssh 工具

**Win：**
使用软件 PuTTY
打开软件
Host Name (or IP address) 写你服务器的 IP 地址
Port 默认 22
Connection type 选择 SSH
Open

**Mac：**
默认有 SSH 命令
ssh root@IP
输入用户名和密码,用户名为 root
login as: root
root@IP's password:

### 安装服务

CentOS/Debian/Ubuntu ShadowsocksR 单/多端口 一键管理脚本
https://doub.io/ss-jc42/

```bash
yum -y install wget

wget -N --no-check-certificate https://softs.fun/Bash/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

备用脚本：

```bash
yum -y install wget

wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

复制上面的代码到 VPS 服务器里，按回车键，脚本会自动安装，以后只需要运行 `bash ssr.sh` 这个快捷命令就可以出现下图的界面进行设置。

1. 安装 SSR 服务端
2. 设置端口和密码
3. 设置的加密方式: aes-256-cfb
4. 选择协议插件: auth_sha1_v4
5. 选择混淆插件 plain

ShadowsocksR MudbJSON 模式多用户一键脚本 支持流量限制
https://doub.io/ss-jc60/

```bash
wget -N --no-check-certificate https://softs.fun/Bash/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh
```

备用下载地址

```bash
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh
```

```bash
bash ssrmu.sh
```

## 测速脚本官方地址

```bash
wget https://raw.githubusercontent.com/oooldking/script/master/superbench.sh
chmod +x superbench.sh
./superbench.sh
```

## 加速

[锐速/BBR/魔改 BBR/KCPTUN 加速效果对比测试](https://ssr.tools/674)

【原版 BBR】

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh

# 重启服务器

# 验证是否安装成功
sysctl net.ipv4.tcp_congestion_control
# 得到如下结果表示安装成功
net.ipv4.tcp_congestion_control = bbr
```

【魔改 BBR】

只有 centos 和 debain 版

```bash
# centos 版
wget --no-check-certificate https://raw.githubusercontent.com/tcp-nanqinlang/general/master/General/CentOS/bash/tcp_nanqinlang-1.3.2.sh
bash tcp_nanqinlang-1.3.2.sh

# debain 版
wget --no-check-certificate https://github.com/tcp-nanqinlang/general/releases/download/3.4.2.1/tcp_nanqinlang-fool-1.3.0.sh
bash tcp_nanqinlang-fool-1.3.0.sh

# 选择 1 安装内核，重启

# 运行 选择 2 安装并开启算法
bash tcp_nanqinlang-1.3.2.sh
# 选择 2 安装并开启算法
```

【BBRPlus（BBR v2.0）】

Github 项目地址：https://github.com/cx9208/bbrplus

一键脚本（仅CentOS）

```bash
yum -y install wget && wget "https://github.com/cx9208/bbrplus/raw/master/ok_bbrplus_centos.sh" && chmod +x ok_bbrplus_centos.sh && ./ok_bbrplus_centos.sh
```

等待安装完成，重启，重启之后，按照以下步骤检查是否成功：

执行 uname -r，显示 4.14.129-bbrplus 则切换内核成功

执行 lsmod | grep bbr，显示有 bbrplus 则开启成功
