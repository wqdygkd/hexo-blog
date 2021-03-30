---
title: Ubuntu 下关于 Transmission daemon 的安装与配置
tags: []
id: '1449'
categories:
  - - 教程
date: 2020-05-19 20:46:55
---

### 介绍

Transmission 是一个强大的 BitTorrent 开源客户端，[官方网站](https://www.transmissionbt.com/)上提供了多个版本可以下载，包括：Mac、GTK+、QT、web 版本。

Transmission 支持 DHT、Magnet Link、uTP 以及 PEX 等特性。尤其是支持 Magnet Link 磁力链接下载十分重要，因为目前网上很多资源都是采用这种方式来分享的，而不是传统的.torrent 文件

在 Ubuntu 的发行版中，Transmission 软件包下面包含多个套件，这些套件的名字很容易搞混淆，它们分别是：

- transmission-gtk: GTK+界面的 Transmission BT 客户端。
- transmission-qt: QT 界面的 Transmission BT 客户端。
- transmission-cli: 命令行界面的 Transmission BT 客户端，与 QT、GTK+版本功能一样，是命令行下一个完备的 BT 客户端。
- transmission-daemon: 是一个 Transmission 的后台守护程序，本身不具备操作指令，只能通过 Web 客户端或者 transmission-remote-cli 来进行控制。这个程序特别适合安装在服务器上或者嵌入式系统中，以及一些没有显示器的设备上。
- transmission-remote-cli: 用来控制 transmission-daemon 的命令套件，本身不具备下载 BT 的功能，只能够配合 daemon 使用。

这些套件不必都安装上，根据我的需求，只需要安装 transmission-daemon 即可

### Transmission 的安装

打开终端，输入以下命令安装：

```bash
sudo apt-get update
sudo apt-get install transmission-daemon
```

安装过程中会顺带把 transmission-cli 也安装上，安装完毕后系统会多出如下一些命令行工具

- transmission-cli： 独立的命令行客户端。
- transmission-create： 用来建立.torrent 种子文件的命令行工具。
- transmission-daemon： 后台守护程序。
- transmission-edit： 用来修改.torrent 种子文件的 announce URL。
- transmission-remote： 控制 daemon 的程序。
- transmission-show：查看.torrent 文件的信息。

安装好后，Transmission-daemon 有一些默认设置([参考链接](https://trac.transmissionbt.com/wiki/UnixServer/Debian))。

默认配置目录清单

启动初始化脚本 /etc/init.d/transmission-daemon
基本配置文件 /etc/default/transmission-daemon
详细配置文件目录 /var/lib/transmsision-daemon/info/settings.json
下载存储目录 /var/lib/transmission-daemon/downloads

settings.json： 主要的配置文件，设置 daemon 的各项参数，包括 RPC 的用户名密码配置。它实际上是一个符号链接，指向的原始文件是/etc/transmission-daemon/settings.json。里面的参数解释可以参考官网的配置说明。
torrents/： 用户存放.torrent 种子文件的目录,凡是添加到下载任务的种子，都存放在这里。.torrent 的命名包含,种子文件本身的名字和种子的 SHA1 HASH 值。
resume/： 存放了.resume 文件，.resume 文件包含了一个种子的信息，例如该文件哪些部分被下载了，下载的数据存储的位置等等。
blocklists/： 存储被屏蔽的 peer 的地址。
dht.dat： 存储 DHT 节点信息。

如果使用另外一个用户来运行 transmission-daemon 的话，会在该用户的目录下，创建一个.config/transmission-daemon 的文件夹，配置目录 https://github.com/transmission/transmission/wiki/Configuration-Files

### 运行

```bash
# 启动
sudo service transmission-daemon start

# 停止
sudo service transmission-daemon stop
```

### Transmission 的配置

配置主要是通过修改/var/lib/transmission-daemon/info/settings.json 文件中的参数来实现的。
注意：在编辑 Transmission 的配置文件的时候，需要先关闭 daemon 进程，否则编辑的参数将会被恢复到原来的状态。

#### 配置 RPC

最关键的就是要配置 RPC，因为无论是 Web 界面还是 CLI 都是通过 RPC 协议和 daemon 来进行交互的。

打开文件/var/lib/transmission-daemon/info/settings.json，修改配置参数如下：

```json
{
  "rpc-authentication-required": true,
  "rpc-bind-address": "0.0.0.0",
  "rpc-enabled": true,
  "rpc-host-whitelist": "", // rpc 主机白名单
  "rpc-host-whitelist-enabled": true, //rpc 主机白名单是否开启，若需要任意主机都能访问，建议false
  "rpc-password": "123456",
  "rpc-port": 9091,
  "rpc-url": "/transmission/",
  "rpc-username": "transmission",
  "rpc-whitelist": "*", // rpc 主机白名单
  "rpc-whitelist-enabled": true //rpc 主机白名单是否开启，若需要任意主机都能访问，建议false
}
```

我将用户名设置为了 transmission，密码设置为了 123456，whitelist 设置成了”\*”，表示任何 IP 都可以通过 RPC 协议访问这个 daemon。需要注意的是 password 设置成了明文。当启动 daemon 之后，daemon 会自动检测密码设置。如果发现密码配置被修改了，daemon 会自动计算修改后的密码的 HASH 值，并用这个 HASH 值替换掉配置文件中的明文密码，这样会更安全。

输入`service transmission-daemon start`启动程序后，打开 settings.json，会看到 rpc-password 一项被改为了 HASH 值。

```json
{
  "rpc-password": "{5f4bd5498bddd9aa2ad8f4d475dcebe23e9d8c8bsorspnUE"
}
```

settings.json 里面还有很多参数可以配置，包括上传/下载速度的限制、DHT 的配置、端口设置等等，详细的参数解释可以参考[官网的配置说明](https://trac.transmissionbt.com/wiki/EditConfigFiles)

### 使用 Web 界面控制 Transmission daemon

经过上述配置后，我们就可以通过 Web 界面来访问和控制 Transmission daemon 了。在浏览器里面输入以下地址

```
http://127.0.0.1:9091/transmission/web/

```

浏览器提示你输入刚才配置的用户名和密码，就可以成功登陆 Web 管理界面。界面和桌面版的 GUI 程序有点像，操作起来很方便。

### 其他问题

在本机使用 `http://<your.server.ip.addr>:9091/transmission/web/` 访问出现 403:Forbidden 解决
修改配置

```json
{
  "rpc-whitelist": "127.0.0.1",
  "rpc-whitelist-enabled": true
}
```

将 `rpc-whitelist`设置为 `"*"`或将 `rpc-whitelist-enabled` 设置为 `false`

在局域网其他机器上使用 `http://<your.server.ip.addr>:9091/transmission/web/` 访问时无法访问解决
修改配置

```json
{
  "rpc-host-whitelist": "", // rpc 主机白名单
  "rpc-host-whitelist-enabled": true //rpc 主机白名单是否开启，若需要任意主机都能访问，建议false
}
```

将 `rpc-host-whitelist`设置为 `"*"`或将 `rpc-host-whitelist-enabled` 设置为 `false`

原始界面，没有汉化，也比较简单，可以使用 [transmission-web-control](https://github.com/ronggang/transmission-web-control) 加强 Transmission Web 的操作能力

```bash
wget -N  https://github.com/ronggang/transmission-web-control/raw/master/release/install-tr-control-cn.sh
bash install-tr-control-cn.sh
```

安装完成之后刷新浏览器即可看到新的 ui，如果没有看到可能是浏览器缓存，ctrl + f5 强制刷新一下，如果还是没有看到，
可以尝试使用 root 用户运行

或尝试使用

```bash
bash install-tr-control-cn.sh /usr/share/transmission
```

/usr/share/transmission 为 Transmission Web 所在目录
