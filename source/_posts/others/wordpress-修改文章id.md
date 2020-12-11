---
title: wordpress 修改文章id
tags:
  - wordpress
id: '1737'
categories:
  - - wordpress
date: 2020-06-16 16:43:32
---

```sql
update wp_posts set id = 430 where id = 404;
update wp_term_relationships set object_id = 430 where object_id = 404;
update wp_postmeta set post_id = 430 where post_id = 404;
update wp_comments set comment_post_ID = 430 where comment_post_ID = 404;
```
