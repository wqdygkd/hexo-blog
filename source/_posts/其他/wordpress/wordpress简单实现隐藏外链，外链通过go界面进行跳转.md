---
title: WordPress简单实现隐藏外链，外链通过go界面进行跳转
tags:
  - wordpress
id: '1833'
categories:
  - - wordpress
date: 2020-07-03 15:43:03
---

网站外链跳转时通过 go 界面进行对 seo 比较友好，既美观又可以避免权重的流失。

简单的实现

1. 在 wordpress 的根目录下，新建一个 go.php 文件，在 go.php 里面输入以下代码

```php
<?php
$t_url = preg_replace('/^url=(.*)$/i','$1',$_SERVER["QUERY_STRING"]);
if(!empty($t_url)) {
  preg_match('/(http|https):\/\//',$t_url,$matches);
	if($matches){
    $url=$t_url;
    $title='页面正在安全跳转中,请稍候';
	} else {
    preg_match('/\./i',$t_url,$matche);
    if($matche){
      $url='http://'.$t_url;
      $title='页面正在安全跳转中,请稍候';
    } else {
      $url='//wqdy.top/';
      $title='参数错误，正在返回首页';
    }
	}
} else {
  $title='参数缺失，正在返回首页';
  $url='//wqdy.top/';
}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="1;url='<?php echo $url;?>';">
<title><?php echo $title;?></title>
<style>
body {background:#000}
.loading {
	-webkit-animation:fadein 2s;
	-moz-animation:fadein 2s;
	-o-animation:fadein 2s;
	animation:fadein 2s}
@-moz-keyframes fadein {from {opacity:0}
to {opacity:1}}
@-webkit-keyframes fadein {from {opacity:0}
to {opacity:1}}
@-o-keyframes fadein {from {opacity:0}
to {opacity:1}}
@keyframes fadein {from {opacity:0}
to {opacity:1}}
.spinner-wrapper {
	position:absolute;
	top:0;
	left:0;
	z-index:300;
	height:100%;
	min-width:100%;
	min-height:100%;
	background:#3498db}
.spinner-text {
	position:absolute;
	top:50%;
	left:50%;
	margin-left:-200px;
	margin-top: 2px;
	color:#fff;
	letter-spacing:1px;
	font-weight:700;
	font-size:36px;
	font-family:Arial}
.spinner {
	position:absolute;
	top:50%;
	left:50%;
	display:block;
	margin-left:-270px;
	width:1px;
	height:1px;
	border:25px solid rgba(100,100,100,0.2);
	-webkit-border-radius:50px;
	-moz-border-radius:50px;
	border-radius:50px;
	border-left-color:transparent;
	border-right-color:transparent;
	-webkit-animation:spin 1.5s infinite;
	-moz-animation:spin 1.5s infinite;
	animation:spin 1.5s infinite}
@-webkit-keyframes spin {0%,100% {-webkit-transform:rotate(0deg) scale(1)}
50% {-webkit-transform:rotate(720deg) scale(0.6)}}
@-moz-keyframes spin {0%,100% {-moz-transform:rotate(0deg) scale(1)}
50% {-moz-transform:rotate(720deg) scale(0.6)}}
@-o-keyframes spin {0%,100% {-o-transform:rotate(0deg) scale(1)}
50% {-o-transform:rotate(720deg) scale(0.6)}}
@keyframes spin {0%,100% {transform:rotate(0deg) scale(1)}
50% {transform:rotate(720deg) scale(0.6)}}
</style>
</head>
<body>
<div class="loading">
  <div class="spinner-wrapper">
    <span class="spinner-text">页面正在安全跳转中,请稍候</span>
    <span class="spinner"></span>
  </div>
</div>
</body>
</html>
```

则外链跳转形式为： `{本站地址}/go.php?{外链地址}`

2. 给外部链接加上 go 跳转，在主题目录下的 functions.php 中添加如下代码

```php
add_filter('the_content','the_content_nofollow',999);
function the_content_nofollow($content) {
  preg_match_all('/<a(.*?)href="(.*?)"(.*?)>/',$content,$matches);
  if($matches){
    foreach($matches[2] as $val){
      if(strpos($val,'://')!==false && strpos($val,home_url())===false && !preg_match('/\.(jpg|jepg|png|ico|bmp|gif|tiff)/i',$val)){
        $content=str_replace("href=\"$val\"", "href=\"".home_url()."/go.php?url=$val\" ",$content);
      }
    }
  }
  return $content;
}
```
