---
title: 群辉利用 VMM 虚拟机安装 LEDE 旁路由，实现软路由超强功能
tags: []
id: '1957'
categories:
  - - uncategorized
---

我的设备 DS218+(单网口)

## 下载镜像

[Koolshare LEDE x64 固件下载](https://firmware.koolshare.cn/LEDE_X64_fw867/虚拟机转盘或PE下写盘专用/)

下载结尾 `squashfs-combined.vmdk` 的文件

## 下载并配置 VMM

去群辉套件中心下载安装 Virtual Machine Manager（简称 VMM），并启用。

打开 VMM，点击 `存储 => 新增`，创建用于安装和存储虚拟机的硬盘。

点击 `映像 => 硬盘映像 => 新增 => 从计算机`，上传刚才下载的 vmdk 文件

点击 `虚拟机 => 新增右侧小三角 => 导入 => 从硬盘映像导入 =>选择刚才的存储空间=> 配置虚拟机规格`

相关文章 [http://wp.naspro.cc/?p=1567](http://wp.naspro.cc/?p=1567) [https://www.luyouwang.net/1577.html](https://www.luyouwang.net/1577.html)

无法联网解决 [https://www.cnblogs.com/vastiny/p/3900204.html](https://www.cnblogs.com/vastiny/p/3900204.html)

科学上网插件 [https://github.com/hq450/fancyss\_history\_package/tree/master/fancyss\_X64](https://github.com/hq450/fancyss_history_package/tree/master/fancyss_X64)

广告过滤插件 AdGuardHome [https://github.com/AdguardTeam/AdGuardHome/releases/tag/v0.103.3](https://github.com/AdguardTeam/AdGuardHome/releases/tag/v0.103.3)

广告过滤 koolproxyR [https://github.com/user1121114685/koolproxyR](https://github.com/user1121114685/koolproxyR)

如果提示检测到离线安装包名有非法关键词，开启路由器的SSH功能，登录并输入以下命令后，再进行离线安装。

```
sed -i 's/\tdetect_package/\t# detect_package/g' /koolshare/scripts/ks_tar_install.sh
```