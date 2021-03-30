---
title: vue-awesome-swiper 设置 loop：true不会自动滚动的问题
tags: []
id: '1002'
categories:
  - - web前端
date: 2020-01-20 13:11:58
---

vue-awesome-swiper: 基于 Swiper4、适用于 Vue 的轮播组件，支持服务端渲染和单页应用

github地址：https://github.com/surmon-china/vue-awesome-swiper

官网：https://github.surmon.me/vue-awesome-swiper/


问题：

设置loop：true， autoplay：2000 不会自动滚动

解决
在 swiper 上添加 `v-if="swiperSlides.length>0"`

```js
<swiper v-if="swiperSlides.length>0" :options="swiperOption" ref="mySwiper">
```
