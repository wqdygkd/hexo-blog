---
title: vps 安装 emby 并挂载 google drive，打造媒体服务中心
tags:
  - emby
  - Google Drive
id: '1582'
categories:
  - - uncategorized
date: 2020-05-27
---

vps 安装 emby/jellyfin 并挂载 google drive，打造媒体服务中心

### 挂载 Googledrive

### Emby Server for Linux 安装

### Emby Server for Docker 安装

#### 安装 docker

#### 安装 Emby Media Server

```bash
docker pull emby/embyserver:latest
docker run -d \
    --volume /path/to/programdata:/config \ # This is mandatory
    --volume /path/to/share1:/mnt/share1 \ # To mount a first share
    --volume /path/to/share2:/mnt/share2 \ # To mount a second share
    --device /dev/dri:/dev/dri \ # To mount all render nodes for VAAPI/NVDEC/NVENC
    --runtime=nvidia \ # To expose your NVIDIA GPU
    --publish 8096:8096 \ # To expose the HTTP port
    --publish 8920:8920 \ # To expose the HTTPS port
    --env UID=1000 \ # The UID to run emby as (default: 2)
    --env GID=100 \ # The GID to run emby as (default 2)
    --env GIDLIST=100 \ # A comma-separated list of additional GIDs to run emby as (default: 2)
    emby/embyserver:latest
```

或使用 docker-compose 安装

`docker-compose.yml` 模板

```yml
version: '3'
services:
  emby:
    image: emby/embyserver:latest
    ports:
      - 8096:8096
      - 8920:8920
    volumes:
      - "/home/gdrive:/mnt/share"
      - "./config:/config"
    environment:
      - UID=1000
      - GID=100
      - GIDLIST=100
    devices:
      - /dev/dri:/dev/dri
```

升级

```bash
docker pull emby/embyserver:latest
```


### 安装 jellyfin

https://github.com/jellyfin/jellyfin

https://jellyfin.org/docs/general/administration/installing.html

```bash
docker pull jellyfin/jellyfin

docker volume create jellyfin-config
docker volume create jellyfin-cache

docker run -d \
 --volume jellyfin-config:/config \
 --volume jellyfin-cache:/cache \
 --volume /path/to/media:/media \
 --user 1000:1000 \
 --net=host \
 --restart=unless-stopped \
 jellyfin/jellyfin
```

```
docker run -d \
 --volume jellyfin-config:/config \
 --volume jellyfin-cache:/cache \
 --volume /home/gdrive:/media \
 --user 1000:1000 \
 --net=host \
 --restart=unless-stopped \
 jellyfin/jellyfin

```

