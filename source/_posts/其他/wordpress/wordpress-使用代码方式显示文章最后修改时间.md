---
title: 使用代码方式显示 WordPress 文章最后修改时间
tags: []
id: '690'
categories:
  - - wordpress
date: 2020-03-01 17:19:48
---

对于偏技术性的文章，用户更在意文章的更新时间而非发表时间

将如下代码添加到主题函数 function.php 文件中，如果你不会的话，推荐使用这个插件：[Code Snippets](https://wqdy.top/671.html)

```php
function wp_last_updated_date( $content ) {
  $time = get_the_time('U');
  $modified_time = get_the_modified_time('U');
  $custom_content = '';
  if ($modified_time >= $time + 86400) {
    $updated_time = get_the_modified_time('Y-m-d H:i:s');
    $custom_content .= '<p class="last-updated" style="color: #999;font-size: 12px;">文章最后更新于'. $updated_time .'，如果失效请留言</p>';
  }

  $custom_content .= $content;
  return $custom_content;
}
add_filter( 'the_content', 'wp_last_updated_date' );
```
