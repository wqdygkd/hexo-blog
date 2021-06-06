---
title: 将 html 内容转换成图片总结 html2canvas与dom-to-image
tags:
  - canvas
  - html
id: '355'
categories:
  - 前端
date: 2019-12-17 11:16:27
---

### html2canvas

[html2canvas](https://github.com/niklasvh/html2canvas)

基本使用

```bash
npm install html2canvas
```

```js
import html2canvas from 'html2canvas'
```

```js
// 语法
// html2canvas(element, options)

html2canvas(document.body).then(function(canvas) {
  // document.body.appendChild(canvas)
  let dataURL = canvas.toDataURL('image/png') // dataURL 为 base64 图片
  // var img = new Image()
  // img.src = dataURL
  // document.body.appendChild(img)
})
```

常用配置使用示例

```js
var options = {
  dpi: 192,
  scale: 2, // 放大
  // logging: true, //日志开关，便于查看html2canvas的内部执行流程
  useCORS: true // 开启跨域配置, (跨域图片，转换的时候会将跨域图片识别为空白,因此需要开启此选项)
}
html2canvas(document.querySelector('#app'), options).then(canvas => {
  document.body.appendChild(canvas)
})
```

html2canvas 生成图片模糊问题

1. html2canvas 第二个参数配置 `scale` 和 `dpi`, [参考](https://github.com/niklasvh/html2canvas/pull/1087)
2. 如果要生成的 dom 中有背景图片，将背景图片换成 div 包裹 img 标签形式，不要通过css设置成background

### dom-to-image

[dom-to-image](https://github.com/tsayen/dom-to-image)

基本使用

```bash
npm install dom-to-image
```

```js
/* in ES 6 */
import domtoimage from 'dom-to-image'
/* in ES 5 */
var domtoimage = require('dom-to-image')
```

```js
var node = document.getElementById('my-node')

domtoimage
  .toPng(node)
  .then(function(dataUrl) {
    var img = new Image()
    img.src = dataUrl
    document.body.appendChild(img)
  })
  .catch(function(error) {
    console.error('oops, something went wrong!', error)
  })
```

将 base64 转换成 file 对象用于上传到服务器

```js
b64ToFile(dataurl)  {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
  }
  let file =  new File([u8arr], 'filename.png', {type:mime})
}
```
