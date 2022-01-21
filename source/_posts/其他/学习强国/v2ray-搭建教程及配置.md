---
title: v2ray 搭建配置教程
tags: []
id: 226
categories:
  - 教程
date: 2019-10-08
updated: 2021-09-05
---

## 相关链接

[v2ray 用户手册](https://v2fly.org) [github](https://github.com/v2fly/v2fly-github-io)
[V2Ray 白话文指南](https://guide.v2fly.org/) [github](https://github.com/v2fly/v2ray-step-by-step/tree/transifex/zh_CN)
[在线配置生成](https://intmainreturn0.com/v2ray-config-gen/)
[v2ray web面板 v2-ui](https://github.com/sprov065/v2-ui)
[SSPanel-Uim](https://github.com/Anankke/SSPanel-Uim) 节点管理面板/用户管理系统
[使用宝塔部署 SSPanel 魔改版](https://blog.anank.ke/w/SSPanel_with_DROP_DATABASE_BT)

## 安装
### 一键脚本安装

```bash
bash <(curl -s -L https://git.io/v2ray.sh)
```

安装完成后，输入 v2ray 即可管理 V2Ray

管理命令

```bash
v2ray info # 查看 V2Ray 配置信息
v2ray config # 修改 V2Ray 配置
v2ray link # 生成 V2Ray 配置文件链接
v2ray infolink # 生成 V2Ray 配置信息链接
v2ray qr # 生成 V2Ray 配置二维码链接
v2ray ss # 修改 Shadowsocks 配置
v2ray ssinfo # 查看 Shadowsocks 配置信息
v2ray ssqr # 生成 Shadowsocks 配置二维码链接
v2ray status # 查看 V2Ray 运行状态
v2ray start # 启动 V2Ray
v2ray stop # 停止 V2Ray
v2ray restart # 重启 V2Ray
v2ray log # 查看 V2Ray 运行日志
v2ray update # 更新 V2Ray
v2ray update.sh # 更新 V2Ray 管理脚本
v2ray uninstall # 卸载 V2Ray
```

### 官方脚本

[官方脚本](https://v2ray.com/chapter_00/install.html)

```bash
# 安装
bash <(curl -L -s https://install.direct/go.sh)

# 安装完成后记住 PORT UUID，忘记也没关系可以使用下面命令查看

# 启动
systemctl start v2ray

# 查看端口 Port
cat /etc/v2ray/config.json | grep port

# 查看 id (UUID)
cat /etc/v2ray/config.json | grep id
```

### 卸载

如果脚本不支持卸载，可使用以下方法手动卸载

其中 systemd 和 sysv 二选一，取决于你的系统

```bash
#停用并卸载服务(systemd)
systemctl stop v2ray
systemctl disable v2ray

#停用并卸载服务(sysv)
service v2ray stop
update-rc.d -f v2ray remove

# 删除文件
# 配置文件
rm -rf /etc/v2ray/*
# 程序
rm -rf /usr/bin/v2ray/*
# 日志
rm -rf /var/log/v2ray/*
# systemd 启动项
rm -rf /lib/systemd/system/v2ray.service
# sysv 启动项
rm -rf /etc/init.d/v2ray
```

### Nginx + WebSocket + TLS

参考：https://guide.v2fly.org/advanced/wss_and_web.html

V2Ray 脚本可直接使用 Caddy 配置 WebSocket + TLS 传输协议，但是如果想在 vps 上同时使用 nginx 跑一个小博客，那么会导致 caddy 和 nginx 监听端口时发生冲突，这显然不是我们想要的

所以就要将 TLS 部分放到 nginx 程序里面去实现

#### 首先使用官方脚本安装好服务端程序

#### 申请 SSL 证书

> 如果使用宝塔面板，可以通过面板一键生成 ssl 证书，快速配置 `nginx+ssl`

申请免费 SSL 证书参考[这里](https://wqdy.top/1909.html)

#### nginx 配置

> 如果使用宝塔面板，可以通过面板一键生成 ssl 证书，快速配置 `nginx+ssl`

```conf
server {
  listen 443 ssl;
  listen [::]:443 ssl;
  server_name           aaa.com; # 域名

  # 配置ssl
  ssl_certificate       /etc/letsencrypt/aaa.com.crt; # 证书
  ssl_certificate_key   /etc/letsencrypt/aaa.com.key; # 密钥
  ssl_session_timeout 1d;
  ssl_session_cache shared:MozSSL:10m;
  ssl_session_tickets off;
  ssl_protocols         TLSv1.2 TLSv1.3;
  ssl_ciphers           ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
  ssl_prefer_server_ciphers off;
  #

  location /ray { # 与 V2Ray 服务端配置中的 path 保持一致
    if ($http_upgrade != "websocket") { # WebSocket协商失败时返回404
      return 404;
    }
    proxy_redirect off;
    proxy_pass http://127.0.0.1:2333; # 假设 WebSocket 监听在环回地址的 2333 端口上
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    # Show real IP in v2ray access.log
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

#### v2ray 服务端配置

/etc/v2ray/config.json

```json
{
  "inbounds": [
    {
      "port": 2333, // WebSocket 监听端口
      "listen": "127.0.0.1", // 只监听 127.0.0.1，避免除本机外的机器探测到开放了 22445 端口
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx",
            "alterId": 32
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "/ray"
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}
```

#### 客户端配置

```json
{
  "inbounds": [
    {
      "port": 1080,
      "listen": "127.0.0.1",
      "protocol": "socks",
      "sniffing": {
        "enabled": true,
        "destOverride": ["http", "tls"]
      },
      "settings": {
        "auth": "noauth",
        "udp": false
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "vmess",
      "settings": {
        "vnext": [
          {
            "address": "aaa.com", // nginx server_name
            "port": 443,
            "users": [
              {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx", // 同服务端配合
                "alterId": 32 // 同服务端配合
              }
            ]
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "wsSettings": {
          "path": "/ray" // 与 V2Ray 服务端配置中的 path 保持一致
        }
      }
    }
  ]
}
```

### Nginx+vmess+ws+tls/ http2 over tls 一键安装脚本

https://github.com/wulabing/V2Ray_ws-tls_bash_onekey

证书签发错误的原因是签发服务器已经不认默认的邮箱名:@example.com,

```diff
- curl https://get.acme.sh | sh
+ curl https://get.acme.sh | sh -s email=admin@youremail.com
```
添加-s 参数, 把你的邮箱放进去

另外如果脚本全部正常跑完, 还是不能用的,请用这个网站 https://www.matools.com/port 检查下你的端口是不是已经被封了

## v2ray 配置好后无法连接解决办法

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

# v2ray 测试配置文件是否正确
/usr/bin/v2ray/v2ray --test --config /etc/v2ray/config.json
```

## 客户端

客户端可以参考[这里](https://wqdy.top/228.html#客户端)
