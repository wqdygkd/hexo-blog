---
title: 
data: 2019/07/10 11;30
---





注册账号 https://www.google.com/adsense/start/



获取代码

```
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-9068539038073295",
    enable_page_level_ads: true
  });
</script>
```



将网站关联到AdSense



在主题配置文件中添加广告控制开关

```
# 添加 Google AdSense
google_adsense: true
```

主题文件夹下找到 /layout/_partial/head.swig 里添加代码：

```swig
{% if theme.google_adsense %}
	// Adsense 账户中复制下来的代码
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-9068539038073295",
      enable_page_level_ads: true
    });
  </script>
  
{% endif %}

```



重新部署网站

等待审核，审核成功会向你发送邮件，