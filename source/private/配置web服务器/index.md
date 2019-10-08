---
title: 【技术贴】配置 web 服务器
date: 2019-07-09
---

# Apache 安装

## centos

```bash
# yum install httpd  （centos之下，Apache的名字叫httpd，和Apache的主程序 httpd.exe 同名）
```

### 打开并测试 Apache

- 先确保，云服务器的 80 端口，是允许外网访问的。

- 开启 Apache 服务

```bash
service httpd start
# 查看状态
service httpd status
```

- 测试 Apache 是否正常运行

浏览器输入： 外网 IP:80，如果能正常显示 Apache 的内置主页，则说明 Apache 服务已正常开启。

### 修改 Apache 的配置文件

主配置文件 `/etc/httpd/conf/httpd.conf`

修改如下键值兼容 php

> 键：DirectoryIndex
> 值：index.html index.php

**默认站点主目录**：/var/www/html/

https://www.cnblogs.com/smbin/p/6946210.html

### **安装证书**

1. 安装 ssl 模块

```
# yum install mod_ssl -y
```

Ps：安装完成后，会在/etc/httpd/conf.d/下生成一个 ssl.conf 配置文件。

建一个目录用来放 ssl 证书文件

```
# mkdir /etc/httpd/ssl/
```

编辑 ssl 配置文件

```
# vim /etc/httpd/conf.d/ssl.conf
```

修改以下几行，去掉前面的“#”注释；

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](<javascript:void(0);>)

```
<VirtualHost>
#网页文件路径
DocumentRoot "/var/www/html"
#改为自己的域名
ServerName cuilongjin.top:80
#启用SSL功能
SSLEngine on
#填写证书文件路径
SSLCertificateFile   /etc/httpd/ssl/cert-1541656252121_cuilongjin.top.key
#填写私钥文件路径
SSLCertificateKeyFile   /etc/httpd/ssl/cert-1541656252121_cuilongjin.top.key
#填写证书链文件路径
SSLCertificateChainFile   /etc/httpd/ssl/cert-1541656252121_cuilongjin.top_chain.crt
</VirtualHost>
```

重启服务器

```
# service httpd restart
```

# Nginx 的安装与配置

## **CentOS** 下安装：

通过安装包安装

```bash
# 安装所需环境
yum install gcc-c++
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel

# 官网下载 nginx https://nginx.org/
yum install wget
wget -c https://nginx.org/download/nginx-1.17.1.tar.gz
# 解压
tar -zxvf nginx-1.17.1.tar.gz
cd nginx-1.17.1

# 配置
./configure

# 编译安装
make
make install

# 查找安装路径：
whereis nginx

# 启动、停止 重启 nginx
cd /usr/local/nginx/sbin/
./nginx # 启动
./nginx -s stop # 此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程
./nginx -s quit # 此方式停止步骤是待nginx进程处理任务完毕进行停止
./nginx -s quit && ./nginx # 重启 nginx

# 重新加载配置文件
# 配置文件 nginx.conf 修改后，要想让配置生效需要重启 nginx，使用 -s reload 不用先停止 nginx 再启动即可将配置信息在 nginx 中生效，如下：
./nginx -s reload

# 查询 nginx 进程
ps aux|grep nginx

# 开机自启动
在 rc.local 增加启动代码
vi /etc/rc.local
# 增加一行 /usr/local/nginx/sbin/nginx
# 设置执行权限
chmod 755 rc.local

# 添加 nginx 为系统服务

```

centos 下，yum 源不提供 nginx 的安装，可以通过切换 yum 源的方法获取安装

```
yum -y install nginx
```

主站点目录/usr/share/nginx/html

**配置 Nginx：**

Nginx 的配置文件默认位置为：`/etc/nginx/nginx.conf`

```
server {
  listen       80; #监听80端口，接收http请求
  server_name  localhost; #就是网站地址
  root         /usr/share/nginx/html; # 准备存放代码工程的路径
  #路由到网站根目录www.example.com时候的处理
  location / {
    index index.php index.html index.htm;
  }

  #当请求网站下php文件的时候，反向代理到php-fpm
  location ~ \.php$ {
    include fastcgi.conf; #加载nginx的fastcgi模块
    fastcgi_intercept_errors on;
    fastcgi_pass   127.0.0.1:9000; #nginx fastcgi进程监听的IP地址和端口
  }
}
```

自定义 Nginx 站点配置文件存放目录

```
/etc/nginx/conf.d/
```

默认站点目录/usr/share/nginx/html

安装 php

```
yum install php php-fpm
```

配置 php.ini

/etc/php.ini

```
cgi.fix_pathinfo=1
```

配置 php-fpm

/etc/php-fpm.d/www.conf

user = nginx

group = nginx

chkconfig php-fpm on #设置 php-fpm 自启动

service nginx restart #重新启动 nginx

service php-fpm start #启动 php-fpm

sudo iptables -I INPUT -p tcp -m tcp --dport 80 -j ACCEPT

sudo iptables -I INPUT -p tcp -m tcp --dport 443 -j ACCEPT

iptables -L -n

/usr/sbin/nginx

查询 nginx 进程

ps -ef | grep nginx

nginx 配置

```
#
# HTTPS server configuration
#

server {
  listen       443 ssl http2 default_server;
  listen       [::]:443 ssl;
  server_name  _;
  root         /usr/share/nginx/html;

  ssl_certificate ssl/cuilongjin.top.pem;
  ssl_certificate_key ssl/cuilongjin.top.key;
  ssl_session_cache shared:SSL:1m;
  ssl_session_timeout  10m;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  # Load configuration files for the default server block.
  include /etc/nginx/default.d/*.conf;

  location / {
  }
    location ~ \.php$ {
      root html;
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_index index.php;
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      include fastcgi_params;
    }

  error_page 404 /404.html;
    location = /40x.html {
  }

  error_page 500 502 503 504 /50x.html;
    location = /50x.html {
  }
}
```

```conf
#
# The default server
#

server {
  listen       80 default_server;
  listen       [::]:80 default_server;
  server_name  _;
  root         /usr/share/nginx/html;

  # Load configuration files for the default server block.
  include /etc/nginx/default.d/*.conf;

  location / {
  }
  location ~ \.php$ {
    root html;
    fastcgi_pass 127.0.0.1:9000;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
  }

  error_page 404 /404.html;
    location = /40x.html {
  }

  error_page 500 502 503 504 /50x.html;
    location = /50x.html {
  }
}
```

## ubuntu 下安装

安装 nginx

```bash
sudo apt-get install nginx
```

Ubuntu 安装之后的文件结构大致为：

- 所有的配置文件都在/etc/nginx 下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available 下
- 程序文件在/usr/sbin/nginx
- 日志文件在/var/log/nginx
- 并已经在/etc/init.d/下创建了启动脚本 nginx
- 服务器配置文件在/etc/nginx/sites-available/
- 默认主站点目录 /var/www/html，（有的可能在/var/www）, 请参考/etc/nginx/sites-available 里的配置

安装 php

```bash
apt-get install php
```

配置 php.ini /etc/php/7.2/cli/

```
cgi.fix_pathinfo=1
```

配置 php-fpm

启动 nginx

```bash
/etc/init.d/nginx restart
/etc/init.d/nginx stop
/etc/init.d/nginx start
```

删除 nginx

```bash
sudo apt-get --purge remove nginx
# –-purge 包括配置文件
```

## arch 下安装 nginx

```
pacman -S nginx
```

启动 Nginx 服务,运行以下命令:

```
# systemctl start nginx
```

### 要 Nginx 服务开机时启动,运行以下命令:

```
# systemctl enable nginx
```

默认页面是:

```
/usr/share/nginx/html/index.html
```

### 配置

你可以修改在 **/etc/nginx/** 目录中的文件来更改配置 **./etc/nginx/nginx.conf** 是主配置文件
