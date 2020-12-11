---
title: wordpress 插件 Code Snippets - 无需修改 functions.php 文件向站点添加自定义代码
tags: []
id: '671'
categories:
  - - wordpress
date: 2020-03-01 16:03:48
---

### 插件介绍

Code Snippets 是一款可以简单、干净、安全添加 php 代码到你网站的插件，就跟直接写入 functions.php 文件里面的效果一样。

> 使用 Code Snippets 添加代码还有一个优点就是添加的代码不会因为你主题文件升级而丢失，而直接写入 functions.php 文件里面升级会被覆盖，还需要手动备份一次。

直接在后台搜索该插件安装即可

### 使用示例

#### 添加 php 代码

直接新建一个 snippets 将 php 代码站填进去即可

#### 添加 css 代码

```php
add_action( 'wp_head', function () { ?>
<style>

	/* write your CSS code here */

</style>
<?php } );
```

#### 添加 js 代码
默认示例添加 js 代码使用的是 `wp_head` 函数，这里推荐使用 `wp_footer`，你可以根据 js 作用自行选择

```php
// 在底部添加js代码，
add_action( 'wp_footer', function () { ?>
<script>

	/* write your JavaScript code here */

</script>
<?php } );

```
