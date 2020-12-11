---
title: 用 tMM 刮削影片信息，让 KODI、Jellyfin、PLEX、使用本地媒体电影墙！
tags:
  - jellyfin
  - plex
id: '1469'
categories:
  - - NAS
date: 2020-05-20 23:09:12
---

当使用 pt 或者各种 bt 网站，下载了很多电影以后，使用 NAS 上的 plex 或者 jellyfin 刮削不出来海报怎么办？

而今天就将推荐大家使用这款 tinyMediaManager 软件，该软件功能非常强大，可以刮削电影、电影系列、电视剧等，还可以重建nfo文件和批量重名文件、文件夹。支持Win/Mac/Linux。通过他自动匹配家里的电影资源库，让自己的，不论 KODI，还是 jellyfin，还是 emby、plex 都能用上完美的电影墙！

## windows 下使用

### 下载和安装 tinyMediaManager

下载地址 https://www.tinymediamanager.org/download/

如果提示需要 java 环境，下载安装即可

### 使用

打开软件

当提示设置影片档案文件夹时，可以先不添加，直接下一步

当提示元数据刮削的时候，选择 `themoviedb.org`，不管是电影和电视剧都选他即可

打开设置，添加电影和电视剧目录，其他默认

设置好了以后，点击更新

全选已添加的影片信息，点击右键，搜索并刮削所选电影 - 自动匹配：会自动下载封面和影片信息

其中有可能遇到需要您手动搜索的影片，手动搜索一下中文名字即可

当影片完全搜索不出来的时候，也可以到豆瓣电影里面搜索一下这个影片，记住它的 imdb 链接的后面一串数字，比如：tt7286456

直接搜索这个序列号，也是可以获取影片资料的

电视剧的搜索方式和电影的搜索方式是一模一样的，而且电视剧会将每一集都进行信息整理和分类

全部更新完毕后，可以看到影片的文件夹里观看，下载了 nfo 影片信息，海报封面图，logo 等

## linux 下使用

使用docker安装

https://hub.docker.com/r/romancin/tinymediamanager

```bash
docker pull romancin/tinymediamanager

docker run -d --name=tinymediamanager \
-v /share/Container/tinymediamanager/config:/config \
-v /home/gdrive:/media \
-e GROUP_ID=0 -e USER_ID=0 -e TZ=Europe/Madrid \
-p 5800:5800 \
-p 5900:5900 \
romancin/tinymediamanager:latest
```

浏览以 `http://your-host-ip:5800` 即可访问 TinyMediaManager GUI

解决中文无法正常显示的问题

添加 ENABLE_CJK_FONT=1 环境变量

```bash
docker run -d --name=tinymediamanager \
-v /share/Container/tinymediamanager/config:/config \
-v /home/gdrive:/media \
-e GROUP_ID=0 -e USER_ID=0 -e TZ=Europe/Madrid -e ENABLE_CJK_FONT=1 \
-p 5800:5800 \
-p 5900:5900 \
romancin/tinymediamanager:latest
```

### 使用 Jellyfin 加载 tinyMediaManager 整理的影片

只需要设置 Jellyfin 媒体库，取消掉所有的刮削器即可（一定要取消掉，否则依然会无法显示影片信息，甚至连影片都可能不会出现在影视墙上）
