---
title: 【学习贴】v2ray
date: 2019-10-08
---

### 脚本 1

```bash
bash <(curl -s -L https://git.io/v2ray.sh)
bash <(curl -s -L https://git.io/v2ray.sh)
```

安装完成后，输入 v2ray 即可管理 V2Ray
快速管理

```bash
v2ray info 查看 V2Ray 配置信息
v2ray config 修改 V2Ray 配置
v2ray link 生成 V2Ray 配置文件链接
v2ray infolink 生成 V2Ray 配置信息链接
v2ray qr 生成 V2Ray 配置二维码链接
v2ray ss 修改 Shadowsocks 配置
v2ray ssinfo 查看 Shadowsocks 配置信息
v2ray ssqr 生成 Shadowsocks 配置二维码链接
v2ray status 查看 V2Ray 运行状态
v2ray start 启动 V2Ray
v2ray stop 停止 V2Ray
v2ray restart 重启 V2Ray
v2ray log 查看 V2Ray 运行日志
v2ray update 更新 V2Ray
v2ray update.sh 更新 V2Ray 管理脚本
v2ray uninstall 卸载 V2Ray
```

### 脚本 2

https://yuan.ga/v2ray-build-guide-for-novices/

```bash
# 安装
bash <(curl -L -s https://install.direct/go.sh)
# 记住
PORT:
UUID:
# 启动
systemctl start v2ray
# 查看端口 Port
cat /etc/v2ray/config.json | grep port
# 查看 id (UUID)
cat /etc/v2ray/config.json | grep id
```

v2ray 配置好后无法连接解决办法

```bash
# 检查端口占用情况
yum install net-tools
netstat -apn | grep v2ray

# 发现v2ray并没有监听我们的公网IP，只监听了一个IPV6：
# tcp6       0      0 :::40682                :::*                    LISTEN      19553/v2ray
# unix  3      [ ]         STREAM     CONNECTED     80938    19553/v2ray

# 修改配置文件添加 listen 字段

# v2ray默认配置文件在/etc/v2ray/conf.json
"inbound": {
  "listen":"12.34.56.78",
}

# v2ray测试配置文件是否正确
/usr/bin/v2ray/v2ray --test --config /etc/v2ray/config.json
```
