---
title: 【技术贴】配置 web 服务器
date: 2019-07-09
---


# Apache安装

## centos


```bash
# yum install httpd  （centos之下，Apache的名字叫httpd，和Apache的主程序 httpd.exe 同名）
```

### 打开并测试Apache

* 先确保，云服务器的80端口，是允许外网访问的。

* 开启Apache服务

```bash
service httpd start
# 查看状态
service httpd status
```

* 测试Apache是否正常运行

浏览器输入：  外网IP:80，如果能正常显示 Apache 的内置主页，则说明Apache服务已正常开启。


### 修改Apache的配置文件

主配置文件 `/etc/httpd/conf/httpd.conf`

修改如下键值兼容php

> 键：DirectoryIndex
> 值：index.html index.php



**默认站点主目录**：/var/www/html/



https://www.cnblogs.com/smbin/p/6946210.html





### **安装证书**

1) 安装ssl模块

```
# yum install mod_ssl -y
```

Ps：安装完成后，会在/etc/httpd/conf.d/下生成一个ssl.conf配置文件。

建一个目录用来放ssl证书文件

```
# mkdir /etc/httpd/ssl/
```

编辑ssl配置文件

```
# vim /etc/httpd/conf.d/ssl.conf
```

修改以下几行，去掉前面的“#”注释；

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

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

## **CentOS**下安装：

```
yum -y install nginx
```

主站点目录/usr/share/nginx/html



**配置Nginx：**

Nginx的配置文件默认位置为：`/etc/nginx/nginx.conf`

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

自定义Nginx站点配置文件存放目录

```
/etc/nginx/conf.d/
```



默认站点目录/usr/share/nginx/html



安装php

```
yum install php php-fpm
```



配置php.ini

/etc/php.ini

```
cgi.fix_pathinfo=1
```



配置php-fpm

/etc/php-fpm.d/www.conf

user = nginx

group = nginx



chkconfig php-fpm on    #设置php-fpm自启动

service nginx restart   #重新启动nginx

service php-fpm start   #启动php-fpm



sudo iptables -I INPUT -p tcp -m tcp --dport 80 -j ACCEPT

sudo iptables -I INPUT -p tcp -m tcp --dport 443 -j ACCEPT

 iptables -L -n



/usr/sbin/nginx

查询nginx进程

ps -ef | grep nginx



```
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



```
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



## ubuntu下安装

安装nginx

```bash
sudo apt-get install nginx
```

Ubuntu 安装之后的文件结构大致为：

- 所有的配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下
- 程序文件在/usr/sbin/nginx
- 日志文件在/var/log/nginx
- 并已经在/etc/init.d/下创建了启动脚本nginx
- 服务器配置文件在/etc/nginx/sites-available/
- 默认主站点目录 /var/www/html，（有的可能在/var/www）, 请参考/etc/nginx/sites-available里的配置



安装php

```bash
apt-get install php
```





配置php.ini  /etc/php/7.2/cli/

```
cgi.fix_pathinfo=1
```

配置php-fpm



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







## arch 下安装nginx

```
pacman -S nginx
```

启动Nginx服务,运行以下命令:

```
# systemctl start nginx
```

### 要Nginx服务开机时启动,运行以下命令:

```
# systemctl enable nginx
```

默认页面是:

```
/usr/share/nginx/html/index.html
```

### 配置

你可以修改在 **/etc/nginx/** 目录中的文件来更改配置 **./etc/nginx/nginx.conf** 是主配置文件