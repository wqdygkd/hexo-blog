---
title: dux主题修改记录
tags:
  - wordpress
id: '504'
categories:
  - - wordpress
date: 2020-02-12 11:35:20
---

## 给网站添加语言

打开 `theme/dux/header.php` 文件，修改如下内容

```diff
<!DOCTYPE HTML>
-<html>
+<html lang="zh">
```


## 修改面包屑导航位置

打开 `theme/dux/single.php` 文件，修改如下内容

```diff
<?php get_header(); ?>
-<?php if( _hui('breadcrumbs_single_s') ){ ?>
- <div class="breadcrumbs">
-  <div class="container"><?php echo hui_breadcrumbs() ?></div>
- </div>
-<?php } ?>
<section class="container">
+ <?php if( _hui('breadcrumbs_single_s') ){ ?>
+  <div class="breadcrumbs">
+   <div class="container"><?php echo hui_breadcrumbs() ?></div>
+  </div>
+ <?php } ?>
 <div class="content-wrap">
 <div class="content">
```

添加自定义样式

```css
/* 面包屑导航 */
.breadcrumbs {
	box-shadow: none;
	background: none;
	margin-bottom: 0;
}
```
