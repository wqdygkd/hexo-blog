---
title: 安装 rclone 并挂载 Google drive
tags:
  - Google Drive
id: '1243'
categories:
  - - 教程
date: 2020-04-22 00:00:05
---

### 安装 rclone 并挂载 Googledrive

### 安装 rclone

Linux 环境

```bash
curl https://rclone.org/install.sh | sudo bash
```

Windows 环境

直接去 rclone 官网下载 rclone，最好将 rclone.exe 所在目录加入系统环境变量

### 配置 rclone

> 详细配置参考 https://rclone.org/drive/

```bash
rclone config
```

```
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n # 新建
name> gdrive # 名称，后面要用到
Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / 1Fichier
   \ "fichier"
 2 / Alias for an existing remote
   \ "alias"
 3 / Amazon Drive
   \ "amazon cloud drive"
 4 / Amazon S3 Compliant Storage Provider (AWS, Alibaba, Ceph, Digital Ocean, Dreamhost, IBM COS, Minio, etc)
   \ "s3"
 5 / Backblaze B2
   \ "b2"
 6 / Box
   \ "box"
 7 / Cache a remote
   \ "cache"
 8 / Citrix Sharefile
   \ "sharefile"
 9 / Dropbox
   \ "dropbox"
10 / Encrypt/Decrypt a remote
   \ "crypt"
11 / FTP Connection
   \ "ftp"
12 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
13 / Google Drive
   \ "drive"
14 / Google Photos
   \ "google photos"
15 / Hubic
   \ "hubic"
16 / In memory object storage system.
   \ "memory"
17 / JottaCloud
   \ "jottacloud"
18 / Koofr
   \ "koofr"
19 / Local Disk
   \ "local"
20 / Mail.ru Cloud
   \ "mailru"
21 / Mega
   \ "mega"
22 / Microsoft Azure Blob Storage
   \ "azureblob"
23 / Microsoft OneDrive
   \ "onedrive"
24 / OpenDrive
   \ "opendrive"
25 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
26 / Pcloud
   \ "pcloud"
27 / Put.io
   \ "putio"
28 / QingCloud Object Storage
   \ "qingstor"
29 / SSH/SFTP Connection
   \ "sftp"
30 / Sugarsync
   \ "sugarsync"
31 / Transparently chunk/split large files
   \ "chunker"
32 / Union merges the contents of several remotes
   \ "union"
33 / Webdav
   \ "webdav"
34 / Yandex Disk
   \ "yandex"
35 / http Connection
   \ "http"
36 / premiumize.me
   \ "premiumizeme"
Storage> 13 # 选择 13 google drive
** See help for drive backend at: https://rclone.org/drive/ **

Google Application Client Id
Setting your own is recommended.
See https://rclone.org/drive/#making-your-own-client-id for how to create your own.
If you leave this blank, it will use an internal key which is low performance.
Enter a string value. Press Enter for the default ("").
client_id> # 默认
Google Application Client Secret
Setting your own is recommended.
Enter a string value. Press Enter for the default ("").
client_secret> # 默认
Scope that rclone should use when requesting access from drive.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / Full access all files, excluding Application Data Folder.
   \ "drive"
 2 / Read-only access to file metadata and file contents.
   \ "drive.readonly"
   / Access to files created by rclone only.
 3 | These are visible in the drive website.
   | File authorization is revoked when the user deauthorizes the app.
   \ "drive.file"
   / Allows read and write access to the Application Data folder.
 4 | This is not visible in the drive website.
   \ "drive.appfolder"
   / Allows read-only access to file metadata but
 5 | does not allow any access to read or download file content.
   \ "drive.metadata.readonly"
scope> 1 # 选1，所有权限
ID of the root folder
Leave blank normally.

Fill in to access "Computers" folders (see docs), or for rclone to use
a non root folder as its starting point.

Note that if this is blank, the first time rclone runs it will fill it
in with the ID of the root folder.

Enter a string value. Press Enter for the default ("").
root_folder_id> # 默认
Service Account Credentials JSON file path
Leave blank normally.
Needed only if you want use SA instead of interactive login.
Enter a string value. Press Enter for the default ("").
service_account_file> # 默认
Edit advanced config? (y/n)
y) Yes
n) No (default)
y/n> # 默认
Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes (default)
n) No
y/n> n # 如果在远程服务器上配置，记得选 n，否则可能无法正常授权
If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth
Log in and authorize rclone for access
Waiting for code...
Got code
Configure this as a team drive?
y) Yes
n) No
y/n> n
--------------------
[remote]
client_id =
client_secret =
scope = drive
root_folder_id =
service_account_file =
token = {"access_token":"XXX","token_type":"Bearer","refresh_token":"XXX","expiry":"2014-03-16T13:57:58.955387075Z"}
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
Current remotes:
Name                 Type
====                 ====
gdrive               drive

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```

**注意：**如果在远程 linux 安装，有些配置(涉及 oauth2 的配置)需要使用浏览器授权，可以使用一下方法配置

> 参考：https://rclone.org/remote_setup/

```
Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> n # 这里选择 n，授权链接会变成如下样式，而不再是 http://127.0.0.1
Please go to the following link: https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=202264815644.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&state=J17j_xVz3tAQmV3sMO0xxw
Log in and authorize rclone for access
Enter verification code> # 打开链接登陆授权，将code粘贴到这里
```

### 挂载

```bash
mkdir -p /home/gdrive
#gdrive 为上面配置的 name
#/home/gdrive 为挂载到本地的目录
/usr/bin/rclone mount gdrive: /home/gdrive \
 --umask 0000 \
 --default-permissions \
 --allow-non-empty \
 --allow-other \
 --buffer-size 32M \
 --dir-cache-time 12h \
 --vfs-read-chunk-size 64M \
 --vfs-read-chunk-size-limit 1G &
```

> 报错
> Fatal error: failed to mount FUSE fs: fusermount: exec: "fusermount": executable file not found in \$PATH
> 解决：安装 fuse
> `apt-get install fuse -y`

### 查看挂载

```bash
df -h
Filesystem      Size  Used Avail Use% Mounted on
gdrive:         1.0P     0  1.0P   0% /home/gdrive
```

自动挂载

```service
cat > /etc/systemd/system/rclone.service <<EOF
[Unit]
Description=Rclone
AssertPathIsDirectory=LocalFolder
After=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/rclone mount emby: /home/gdrive \
 --umask 0000 \
 --default-permissions \
 --allow-non-empty \
 --allow-other \
 --buffer-size 32M \
 --dir-cache-time 12h \
 --vfs-read-chunk-size 64M \
 --vfs-read-chunk-size-limit 1G
ExecStop=/bin/fusermount -u LocalFolder
Restart=on-abort
User=root

[Install]
WantedBy=default.target
EOF
```

启动

```bash
systemctl start rclone
```

开启启动

```bash
systemctl enable rclone
```
