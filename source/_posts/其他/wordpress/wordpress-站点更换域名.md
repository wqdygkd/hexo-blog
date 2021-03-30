---
title: wordpress 站点更换域名
tags:
  - wordpress
id: '386'
categories:
  - - wordpress
date: 2020-01-02 11:16:18
---

假设旧域名是a.com，新域名为b.com，修改数据库 sql 如下
```sql
UPDATE wp_options SET option_value = REPLACE(option_value, 'http://a.com', 'http://b.com') WHERE option_name = 'home' OR option_name = 'siteurl';

UPDATE wp_posts SET post_content = REPLACE (post_content, 'http://a.com', 'http://b.com');

UPDATE wp_postmeta SET meta_value = REPLACE (meta_value, 'http://a.com','http://b.com');

UPDATE wp_comments SET comment_content = REPLACE (comment_content, 'http://a.com', 'http://b.com');

UPDATE wp_comments SET comment_author_url = REPLACE (comment_author_url, 'http://a.com', 'http://b.com');

UPDATE wp_posts SET guid = REPLACE (guid, 'http://a.com', 'http://b.com') WHERE post_type = 'attachment';
```
