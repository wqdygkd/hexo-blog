---
title: web 中媒体资源自动播放问题
tags: []
id: '1276'
categories:
  - 前端
date: 2020-04-23 18:40:33
---

### 问题

媒体资源 添加 autoplay 在移动端不会生效

通过监听 scroll 事件 手动调用 play 方法会报如下错误：Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.

ios 端报如下错误：Uncaught (in promise) NotAllowedError:The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.

### 自动播放政策

Chrome 浏览器的自动播放政策在 2018 年 4 月更改：

- 始终允许静音自动播放。
- 用户已与页面进行了交互（单击，点击等）。

详细政策不一一列举了，访问 `https://goo.gl/xX8pDD` 查看详情

### Web 开发人员的最佳做法

重点：永远不要假设视频会播放，并且在视频未实际播放时也不要显示暂停按钮。

您应该始终查看 play 函数返回的 Promise，看它是否被拒绝：

```js
var promise = document.querySelector('video').play()
if (promise !== undefined) {
  promise
    .then((_) => {
      // Autoplay started!
    })
    .catch((error) => {
      // Autoplay was prevented.
      // Show a "Play" button so that user can start playback.
    })
}
```

使用静音的自动播放功能，并让他们选择取消静音

```html
<video id="video" muted autoplay></video>
```
