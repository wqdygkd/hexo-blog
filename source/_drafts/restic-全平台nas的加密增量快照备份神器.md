---
title: restic-全平台nas的加密增量快照备份神器
tags: []
id: '1994'
categories:
  - - uncategorized
---

自从使用了nas以来，一直都希望在Linux平台找到一个安全高效，易用的备份工具，前前后后用了Rclone，Duplicati，Syncthing，Borgbackup等，但上面的工具均有一些问题不能满足我的需求，例如rclone虽然作为一个同步工具很好用，但作为加密备份工具，它的设置比较麻烦，而且不支持快照，Duplicati有个方便的GUI界面，docker安装也相当省事，可惜稳定性捉急，我上传一百多G的电子书到OneDrive一直失败，Syncthing作为多台主机间的同步工具很好用，但作为备份工具无法加密备份，而且必须要求另一台机器也安装Syncthing，目前是作为我在nas、PC和Android手机间的同步工具。Borgbackup则是拓展性插，和rclone兼容性也很差，试了下无法连接到rclone挂载的文件。 总结一下我的需求，差不多就是这几点： 1.支持多种协议和网盘，最起码得支持OneDrive和GoogleDrive。 2.支持加密备份：我不希望自己的私人数据直接上传到网盘，尤其是照片。 3.稳定高效，操作简单。 4.支持Linux。 5.增量备份、最好支持快照系统。 在找了一圈后，我发现了Restic这个全平台的备份神器，刚好能满足上面的这些需求，而且在我的Linux系统nas上运行了近一个月，相当稳定。 官方所总结的restic特点便是：方便、快速、可靠、安全、高效、开源。

[https://cloud.tencent.com/developer/article/1530989](https://cloud.tencent.com/developer/article/1530989)

[https://ikfou.com/archives/287.html](https://ikfou.com/archives/287.html)