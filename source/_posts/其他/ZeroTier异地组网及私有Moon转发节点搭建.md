---
title: ZeroTier 异地组网及私有 Moon 转发节点搭建
tags:
  - zerotier
id: 819
date: 2020-03-07
---

支持 Windows、macOS、Linux、IOS、Android、Synology、QNAP、Western Digital MyCloud NAS等

## 使用官方根节点

1、创建账号

https://my.zerotier.com

2、创建网络

进入 https://my.zerotier.com/network 点击 Create 创建网络，点击进入已创建的网络 此时可以看到 Network ID，后续添加设备都会需要这个 ID

Access Control，默认是Certificate (Private Network)，选择此模式表示每次在添加新的主机时，需要手动勾选是否允许连接，如果选择None (Public Network)模式，表示加入网络后自动分配IP并允许连接，从安全性来说建议使用默认选项Certificate (Private Network)，方便性来看None (Public Network)更方便，不用每次加入网络后手动勾选。

好了，一个中转的ZeroTier就配置完成了，接下来只需要在其他设备安装所对应的客户端，然后加入到这个网络中就可以了。

## 搭建私有节点（moon）

> 搭建私有节点是为了解决根节点在国外,速度慢, 且不稳定

### 安装

```bash
curl -s https://install.zerotier.com/ | sudo bash

# 安装成功后
# *** Success! You are ZeroTier address [ b32fxxxxxx ].
```

### 配置 Moon

```bash
cd /var/lib/zerotier-one

# 生成 moon.json 配置文件
zerotier-idtool initmoon identity.public >> moon.json

# 编辑 moon.json 配置文件，修改 stableEndpoints
vim moon.json

"stableEndpoints": ["你服务器公网ip/9993"]

# 生成 .moon 文件 私有网络的 zerotier 标志性文件
zerotier-idtool genmoon moon.json
# 此命令会生成一个签名文件在当前目录下，文件名如 000000b32fxxxxxx.moon （b32fxxxxxx 为 ZeroTier address)

# 移动文件
# 将生成的 000000b32fxxxxxx.moon 移动到 moons.d 目录
mkdir moons.d
mv 000000b32fxxxxxx.moon moons.d

# 重启 zerotier-one 服务
systemctl restart zerotier-one

# 加入虚拟网络
# zerotier-cli join af415e486f26xxxx //  af415e486f26xxxx 为在 zerotier 官网创建的网络
```


将内网机器连接上 moon 节点

执行命令

```bash
# windows 在 C:\ProgramData\ZeroTier\One 目录下执行
zerotier-cli orbit 000000b32fxxxxxx 000000b32fxxxxxx # moon 服务器的ID值 输入2遍
```

 查看是否连接
```bash
# 在其他机子执行以下命令是否显示该 moon 节点
# 或在 moon 服务器上执行命令否显示 LEAF 节点
zerotier-cli listpeers

200 listpeers <ztaddr> <path> <latency> <version> <role>
200 listpeers xxxxxxxxxx xx.xx.xx.xx/4532;1037;853 183 1.6.4 LEAF
200 listpeers xxxxxxxxxx xx.xx.xx.xx/9993;19869;4337 0 - PLANET
200 listpeers xxxxxxxxxx xx.xx.xx.xx/9993;4337;4167 170 - PLANET
200 listpeers xxxxxxxxxx xx.xx.xx.xx/9993;363;4274 63 - PLANET
200 listpeers xxxxxxxxxx xx.xx.xx.xx/9993;19508;4192 145 - PLANET
```

## Dockerfile

https://docs.docker.com/engine/reference/builder/

https://github.com/zerotier/ZeroTierOne/tree/master/ext/installfiles/linux/zerotier-containerized

```bash
docker build . -t zerotier
```
