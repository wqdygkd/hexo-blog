---
title: 使用七牛cdn
tags: []
id: '725'
categories:
  - - uncategorized
---

编辑主题文件 `/js/loader.js` 文件，修改 url

```diff
tbquire.config({
+ baseUrl: window.cdnurl ? window.cdnurl : jsui.uri + '/js',
- baseUrl: jsui.uri + '/js',
```

//七牛镜像存储 if ( !is\_admin() ) { add\_action('wp\_loaded','c7sky\_ob\_start'); function c7sky\_ob\_start() { ob\_start('c7sky\_qiniu\_cdn\_replace'); } function c7sky\_qiniu\_cdn\_replace($html){ $local\_host = '[https://wqdy.top](https://wqdy.top)'; //博客域名 $qiniu\_host = '[https://static.cuilongjin.top](https://static.cuilongjin.top)'; //七牛域名 $cdn\_exts = 'jscsspngjpgjpeggifico'; //扩展名（使用分隔） $cdn\_dirs = 'wp-contentwp-includes'; //目录（使用分隔） $cdn\_dirs = str\_replace('-', '-', $cdn\_dirs); if ($cdn\_dirs) { $regex = '/' . str\_replace('/', '\\/', $local\_host) . '\\/((' . $cdn\_dirs . ')\\/\[^\\s\\?\\\\'\\"\\;>\\<\]{1,}.(' . $cdn\_exts . '))(\[\\"\\\\'\\s\\?\]{1})/'; $html = preg\_replace($regex, $qiniu\_host . '/$1$4', $html); } else { $regex = '/' . str\_replace('/', '\\/', $local\_host) . '\\/(\[^\\s\\?\\\\'\\"\\;>\\<\]{1,}.(' . $cdn\_exts . '))(\[\\"\\\\'\\s\\?\]{1})/'; $html = preg\_replace($regex, $qiniu\_host . '/$1$3', $html); } return $html; } }

add\_action( 'wp\_head', function () { ?>

window.cdnurl = 'https://static.cuilongjin.top'

<?php } );