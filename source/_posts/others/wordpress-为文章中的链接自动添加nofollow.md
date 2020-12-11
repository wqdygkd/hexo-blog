---
title: 如何为 WordPress 文章中的链接自动添加 nofollow
tags: []
id: '554'
categories:
  - - wordpress
date: 2020-02-18 15:50:28
---

在 SEO 的角度，我们不宜在网站中设置过多的外链，防止搜索引擎蜘蛛在爬虫你的网站时跳出到其他网站。因此，了解并为外链加上 nofollow 链接是非常有必要的（除非这些外链与你的网站有利益关系，比如是你的其他网站又或者是合作伙伴的网站）。

### 什么是 nofollow 链接

Nofollow 链接是带有 rel ="nofollow" HTML 标记的链接。 nofollow 标签可帮助搜索引擎了解要忽略目标链接，并且不会将网页（放置 nofollow 链接）的 PageRank 传递给此类链接。

以下链接类型应该设置为 nofollow 链接：返利链接，赞助商链接，广告链接，社交媒体链接，不可信/不可靠网站内容链接

### 如何建立 Nofollow 链接

将下面的代码添加到主题的 `functions.php` 文件即可：

如果不想直接修改 `functions.php` 文件，可以使用 [Code Snippets 插件](https://wqdy.top/671.html)

```php
// 文章外部链接加上nofollow
add_filter( 'the_content', 'nf_url_parse');
function nf_url_parse( $content ) {

  $regexp = "<a\s[^>]*href=(\"??)([^\" >]*?)\\1[^>]*>";
  if(preg_match_all("/$regexp/siU", $content, $matches, PREG_SET_ORDER)) {
    if( !empty($matches) ) {

      $srcUrl = get_option('siteurl');
      for ($i=0; $i < count($matches); $i++)
      {

        $tag = $matches[$i][0];
        $tag2 = $matches[$i][0];
        $url = $matches[$i][0];

        $noFollow = '';

        // $pattern = '/target\s*=\s*"\s*_blank\s*"/';
        // preg_match($pattern, $tag2, $match, PREG_OFFSET_CAPTURE);
        // if( count($match) < 1 )
        //   $noFollow .= ' target="_blank" ';

        $pattern = '/rel\s*=\s*"\s*[n|d]ofollow\s*"/';
        preg_match($pattern, $tag2, $match, PREG_OFFSET_CAPTURE);
        if( count($match) < 1 )
          $noFollow .= ' rel="nofollow" ';

        $pos = strpos($url,$srcUrl);
        if ($pos === false) {
          $tag = rtrim ($tag,'>');
          $tag .= $noFollow.'>';
          $content = str_replace($tag2,$tag,$content);
        }
      }
    }
  }

  $content = str_replace(']]>', ']]>', $content);
  return $content;

}
```

### 检查 nofollow 链接是否生效

**使用浏览器的 `检查` 功能查看 nofollow 链接**

使用浏览器打开页面，移动鼠标光标至你想要检查的链接上方。

右击鼠标按钮，选择 `检查` 选项 （以 Chrome 为例，不同浏览器选项叫法不太一样）

代码查看窗口将在浏览器的底部/右侧打开。你可以通过查看 HTML 代码查看链接是否添加了 rel="nofollow"。

**使用 Chrome 扩展组件（插件）检查页面 nofollow 链接**

下载名为[NoFollow](https://chrome.google.com/webstore/detail/nofollow/dfogidghaigoomjdeacndafapdijmiid?hl=en)的 Chrome 扩展组件，安装该插件后重新加载页面，该网页上的所有 nofollow 链接都将会高亮突出显示。
