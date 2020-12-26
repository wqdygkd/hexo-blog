---
title: docker-compose 安装v2ray
tags:
  - docker
  - v2ray
id: '1890'
categories:
  - - 教程
date: 2020-07-13
---



安装 docker-compose

如果你想要通过 docker-compose 统一管理你的 Docker container，这里也可以安装一下

```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.26.2/run.sh > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

可以运行一下 docker-compose version 来检测一下是否成功。

命令

以下命令需要在 docker-compose.yml 所在目录下执行。
```
部署 v2ray: docker-compose up -d
启动 v2ray: docker-compose start v2ray
停止 v2ray: docker-compose stop v2ray
重启 v2ray: docker-compose restart v2ray
删除 v2ray: docker stop v2ray && docker rm v2ray
更新 v2ray: docker-compose pull && docker-compose up -d


main: failed to create server > v2ray.com/core/app/log: failed to initialize access logger > open /var/log/v2ray/access.log: no such file or directory
```
创建配置文件

创建一个名为 `docker-compose.yml` 的配置文件，输入如下内容。
```yml
version: '3'
services:
  v2ray:
    image: v2fly/v2fly-core
    container_name: v2ray
    restart: always
    command: v2ray -config=/etc/v2ray/config.json
    ports:
      - '44222:44222'
      #- "127.0.0.1:8889:8889"
    volumes:
      - ./config:/etc/v2ray
      #- /etc/v2ray/v2ray.crt:/etc/v2ray/v2ray.crt
      #- /etc/v2ray/v2ray.key:/etc/v2ray/v2ray.key
```
请将`./v2ray` 替换为你创建的文件夹，或将该文件夹放置在 `docker-compose.yml` 同一目录下。

配置文件生成

https://veekxt.com/utils/v2ray_gen

`config.json`

```json
{
  "log": {
    "access": "/var/log/v2ray/access.log",
    "error": "/var/log/v2ray/error.log",
    "loglevel": "warning"
  },
  "dns": {},
  "stats": {},
  "inbounds": [
    {
      "port": 44222,
      "protocol": "vmess",
      "settings": {
        "clients": [
          {
            "id": "07e45087-76cc-4aaa-9ad8-1ade76fe9b79",
            "alterId": 32
          }
        ]
      },
      "tag": "in-0",
      "streamSettings": {
        "network": "ws",
        "security": "none",
        "wsSettings": {
          "path": "/ws"
        }
      },
      "listen": "127.0.0.1"
    }
  ],
  "outbounds": [
    {
      "tag": "direct",
      "protocol": "freedom",
      "settings": {}
    },
    {
      "tag": "blocked",
      "protocol": "blackhole",
      "settings": {}
    }
  ],
  "routing": {
    "domainStrategy": "AsIs",
    "rules": [
      {
        "type": "field",
        "ip": ["geoip:private"],
        "outboundTag": "blocked"
      }
    ]
  },
  "policy": {},
  "reverse": {},
  "transport": {}
}
```
