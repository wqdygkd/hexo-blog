---
title: WordPress 博客绑定多个域名，并实现多个域名独立访问
tags:
  - wordpress
  - 域名
id: '1331'
categories:
  - - wordpress
date: 2020-04-26 15:09:02
---

WordPress 博客默认是不能实现多个域名独立访问的，即使我们绑定了多个域名，访问时也会自动跳转到安装站点时默认的域名

我们只需修改站点根目录下的 `wp-config.php` 文件，添加如下代码：

```php
define('WP_SITEURL', 'https://' . $_SERVER['HTTP_HOST']);
define('WP_HOME', 'https://' . $_SERVER['HTTP_HOST']);
```

即可
