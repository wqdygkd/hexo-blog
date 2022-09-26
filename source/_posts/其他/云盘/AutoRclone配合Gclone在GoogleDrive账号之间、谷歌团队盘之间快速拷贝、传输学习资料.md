---
title: AutoRclone 配合 Gclone 在 Google Drive 账号之间、谷歌团队盘之间快速拷贝、传输学习资料
tags:
  - AutoRclone
  - Gclone
  - Google Drive
id: '1472'
categories:
  - - 教程
date: 2020-05-23 19:00:56
---

### 将实现的功能

从本地服务器传输到 Google Team Drive
从他人分享的链接拷贝到 Google Team Drive
从一个 Google Team Drive 传输到另一个 Google Team Drive
以上都不受 750G 流量限制

如果没有团队盘，可以参考[这里](https://wqdy.top/1207.html)自助申请

本文以 ubuntu 为例，当然直接在本地 Windows 上也是可以的

### 安装 Python3

```bash
apt-get update
apt-get install git python3 python3-pip -y
```

> 若出现如下问题
>
> Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-build-bx50pf21/progress/
> You are using pip version 8.1.1, however version 20.1.1 is available.
> You should consider upgrading via the 'pip install --upgrade pip' command.
>
>
> 解决：更新 pip3
>
> `pip3 install --upgrade pip`
>

### 安装 AutoRclone

```bash
git clone https://github.com/xyou365/AutoRclone && cd AutoRclone && pip3 install -r requirements.txt
```

### 生成 Service Accounts

打开链接：https://developers.google.com/drive/api/v3/quickstart/python

登陆 google 账号，点击 `Enable the Drive API`，在弹出的页面中勾选 yes ，点击 NEXT，

稍等片刻，继续点击 CREATE，出现如下页面表示成功

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102201708.png)

点击 `DOWNLOAD CLIENT CONFIGUTATION` 按钮，下载 `credentials.json` 文件，然后将下载的 `credentials.json` 放到 AutoRclone 目录下

如果你用的是 Xshell 可以使用 rz 来上传文件

```bash
apt install lrzsz -y
rz # 回车会打开窗口，选择文件上传即可
rz 文件 # 下载文件
```

之后分三种情况

1、之前没有创建过项目

直接运行：

```bash
python3 gen_sa_accounts.py --quick-setup 5
```

以上命令含义：创建 6 个项目（项目0到项目5），开启相关的服务，创建 600 个 service accounts，将 600 个 service accounts 的授权文件下载到 accounts 文件夹下面

2、已有 N 个项目，需要创建新的

```bash
python3 gen_sa_accounts.py --quick-setup 2 --new-only
```

以上命令含义：额外创建 2 个项目（项目 N+1 到项目 N+2），开启相关的服务，创建 200 个 service accounts（2 个项目，每个项目 100 个），将 200 个 service accounts 的授权文件下载到 accounts 文件夹下面

3、使用已有项目，不创建新的

```bash
python3 gen_sa_accounts.py --quick-setup -1
```

注意以上命令会覆盖掉已有的 service accounts

我这里是第一种情况，运行 `python3 gen_sa_accounts.py --quick-setup 1`，创建两个项目

> 出现如下报错
>
> `/usr/local/lib/python3.5/dist-packages/requests/__init__.py:91: RequestsDependencyWarning: urllib3 (1.13.1) or chardet (3.0.4) doesn't match a supported version!`
>
> 解决方法，安装 requests 模块
>
> `sudo pip3 install requests`

出现如下图

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102201740.png)

打开链接，并登陆你的 Google 账号（提示不安全，不用管，一路允许）

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102201805.png)

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102201823.png)

得到授权代码

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102201844.png)

复制生成的 code 到终端，回车

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102201900.png)

如上图所示，显示`Press Enter to retry`, 原因是谷歌账号未开启 Service Usage API，复制提供的链接地址，到浏览器打开，开启 Service Usage API 服务

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102201955.png)

启用成功后回车，等待完成

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102202016.png)

接着，你就会发现你的 AutoRclone 文件下面的 accounts 文件夹下会有很多的 json 文件。

### 将 service accounts 加入 Google Groups

> 可以直接将 service accounts 加入到Team Drive
> `python3 add_to_team_drive.py -d SharedTeamDriveSrcID`
> 为了便于管理 service accounts，我们创建 Google Group，将 Google Group 邮箱添加到 Team Drive

我们这一步需要将刚刚生成的数以百计的 Service Accounts 添加到 Google Group 中

#### 创建 Google Group

打开链接：https://groups.google.com/ ，创建群组：

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102202037.png)

#### 批量提取 Service Accounts

> 如果是 GSuite Admin 账号，可以使用如下方式直接添加进群组
> 1. 将生成的json文件保存到 credentials 文件夹中
> 2. 在管理控制台中为您的组织创建组。创建群组后，您将拥有一个例如的地址sa@yourdomain.com
> 3. 运行 `python3 add_to_google_group.py -g sa@yourdomain.com`

对于普通账号，生成 Service Accounts 后，直接运行以下命令：

```bash
cat ~/AutoRclone/accounts/*.json | grep "client_email" | awk '{print $2}'| tr -d ',"' | sed 'N;N;N;N;N;N;N;N;N;/^$/d;G' > ~/email.txt
```

运行后，会自动提取 Service Accounts 邮箱账户，并保存到 ~/email.txt 文件中，同时还很贴心地每 10 个邮箱账户就隔开一行，方便复制。

#### 添加到 Google Group

将 email.txt 文件下载到本地

回到 Group 页面，右上角 管理成员：

左侧 直接添加成员，将 Service Accounts 邮箱复制粘贴 10 个，点击 添加：
(注意每次只能添加 10 个，每 24 小时只能添加 100 个)

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102202108.png)

重复以上步骤，将 100 个邮箱添加进去

#### 将 Google Group 邮箱添加到 Team Drive

点击关于，找到群组邮箱：

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102202125.png)

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102202138.png)

复制下来，添加到 Google Team Drive 成员中

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102202159.png)

添加完成后，基本就完成所有设置了

### 如何使用

首先将 service accounts 加入到目标 Team Drive

```bash
cd ~/AutoRclone
# 将以下 SharedTeamDriveDstID 替换为你团队盘 ID
python3 add_to_team_drive.py -d SharedTeamDriveDstID
```

> 查看团队盘 ID：
>
> 打开你的团队盘，查看浏览器上的链接，比如：
>
> https://drive.google.com/drive/u/2/folders/0AICYh4X7BkjVUk9PVA
>
> 以上链接中，0AICYh4X7BkjVUk9PVA 就是 ID

回车后，再次回车：

![](https://cdn.jsdelivr.net/gh/wqdygkd/my-script@img/img/20210102202221.png)

#### 直接使用

先安装 rclone

rclone 安装教程可以参考 https://wqdy.top/1243.html

- Linux 环境

```bash
curl https://rclone.org/install.sh | sudo bash
```

- Windows 环境

直接去 [rclone 官网](https://rclone.org/)下载 rclone，然后最好将 rclone.exe 所在目录加入系统环境变量

如若将共享链接（https://drive.google.com/drive/u/2/folders/10zOvIf8yBmIuZgBfC3rcDKWHIlODZjXF）里的文件保存到自己的 Team Drive 中的 myfolder 文件夹中

则命令为

```bash
python3 rclone_sa_magic.py -s 10zOvIf8yBmIuZgBfC3rcDKWHIlODZjXF -d 0AICYh4X7BkjVUk9PVA -dp myfolder -b 1 -e 600
```

详细的使用命令可以看这里：https://github.com/xyou365/AutoRclone#step-5-start-your-task

#### 配合 Gclone 使用

gclone 其实就是 rclone 的加强版，为 Google Drive 操作增加自动切换账户和命令行根目录 id 操作支持，其他功能与原版 rclone 相同

##### 安装 gclone

```bash
bash <(wget -qO- https://git.io/gclone.sh)
```

你可以选择将 gclone 重命名为 rclone，方便使用：cp /usr/bin/gclone /usr/bin/rclone

以下内容都是以没有重命名为例，如果你进行了重命名，将以下命令中出现的 gclone 改为 rclone

##### 配置 gclone

首先需要先记下 /root/AutoRclone/accounts/ 中的其中一个文件：

```bash
ls /root/AutoRclone/accounts
```

回车后会显示很多 .json 后缀的文件名，复制其中一个文件名，记下文件路径，比如：

`/root/AutoRclone/accounts/0120894537c1c99c605fe240141af661b44d0c22.json`

然后进行 gclone 的配置

gclone 在使用上跟 rclone 是一致的，配置过程也几乎一样，可以参考 https://rclone.org/drive/

运行以下命令进行配置：

```bash
gclone config
```

配置过程中，需要注意的是，当出现 service_account_file 选项时，填入以上记下的 .json 文件

当出现 service_account_file_path 时，填入 /root/AutoRclone/accounts/

记住配置的 name：gdrive

之后就配置完成了

##### 使用 gclone 复制文件

作者 Github 提供的文档：https://github.com/donwa/gclone/blob/master/README_zh.md

复制共享链接文件到团队盘

```bash
gclone copy gdrive:{目录id} gdrive:{目录id} --drive-server-side-across-configs -v
```

以上命令中:

gdrive 是你配置 gclone 时设置的 name

目录 id 是共享链接中链接中的最后部分，比如：https://drive.google.com/drive/u/2/folders/1gVAP22Ug5fz0pSe4THZV10078UbNaTob，1gVAP22Ug5fz0pSe4THZV10078UbNaTob 就是目录 id

--drive-server-side-across-configs 用于谷歌盘之间传输时使用，不走服务器流量，传输速度也更快

-v 用于查看传输过程的 ERROR，NOTICE 和 INFO 消息

>  日志级别
> -q - 仅生成 ERROR 消息。
> -v - 生成 ERROR，NOTICE 和 INFO 消息，推荐此项。
> -vv - 生成 ERROR，NOTICE，INFO和 DEBUG 消息。
> --log-level LEVEL - 标志控制日志级别。
>
> 输出日志到文件
> 使用 --log-file=FILE 将 Error，Info 和 Debug 消息以及标准错误重定向到 FILE，这里的 FILE 是你指定的日志文件路径。

命令使用示例：

```bash
gclone copy gdrive:{18SukoSc0ni0nyU779w82eoo_deLKfbZR} gdrive:{1j4z3UH1thdNB8dOhTUgb0uRHxQaDYL1T} --drive-server-side-across-configs -v
```

目标位置除了使用 id 外，也可以直接使用目录，比如：

```bash
gclone copy gdrive:{18SukoSc0ni0nyU779w82eoo_deLKfbZR} gdrive:movie/电影合集 --drive-server-side-across-configs -v
```

传输本地文件到团队盘

```bash
gclone copy /root/Downloads/xxx gdrive:movie/电影合集 -v
```

### 常见报错

* 报错 `Failed to copy: failed to make directory: googleapi: Error 404: File not found: 1n-Ya6sagIrGskenJIzWcmKE1ATjxeqYx., notFound`

有可能是源日流量 10T 被榨干了


* 报错 `googleapi: Error 403: The file limit for this shared drive has been exceeded., teamDriveFileLimitExceeded`

团队盘有限制 40w 文件/文件夹，回收站中的文件也计算在 40w 之内，可以新增团队盘，或删除小文件并删除回收站

谷歌云端硬盘 API 不公开清空回收站的方法，但它有一个删除方法可以永久删除文件，而不经过回收站

```
https://developers.google.com/drive/v2/reference/files/delete
```
