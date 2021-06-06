---
title: 微信小程序 canvas touchmove 事件实现手写签名并保存到相册
tags: []
id: '969'
categories:
  - 前端
date: 2020-03-18 10:57:43
---

>2020-03-19
真机调试报错 `r.Canvas is not a constructor`
原因：canvas 2d 和 webgl 暂不支持真机调试，请直接使用真机预览，真机预览模式下使用 vConsole 调试

基础代码(使用 Canvas 2D 接口)

```js
Component({
  data: {
    ctx: '',
    image: ''
  },
  methods: {
    onLoad: function(options) {},
    onReady: function() {
      const query = wx.createSelectorQuery()
      query
        .select('#sign')
        .fields({ node: true, size: true })
        .exec(res => {
          console.log(res)
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          console.log(ctx)

          const dpr = wx.getSystemInfoSync().pixelRatio
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale(dpr, dpr)

          ctx.lineWidth = 4 //线条的宽度
          ctx.strokeStyle = '#333' //线条的颜色
          ctx.lineCap = 'round' //定义线条开头和结尾处的形状
          ctx.lineJoin = 'bevel' // 线条与线条之间的连接方式，该属性有三个属性值：miter（默认值，尖角），bevel（衔接），round（圆角）。
          this.setData({
            ctx: ctx
          })
        })
    }
  }
})
```

实现手写效果

使用 catchtouchmove 绑定，默认会阻止页面跟着滑动

```html
<canvas type="2d" id="sign" bindtouchstart="bindtouchstartHandler" catchtouchmove="catchtouchmoveHandler"></canvas>
```

```js
bindtouchstartHandler(e) {
  if (e.type != 'touchstart') return false
  let ctx = this.data.ctx
  //开始本次绘画
  ctx.beginPath()
  //画笔起始点
  ctx.moveTo(e.touches[0].x, e.touches[0].y)
},
catchtouchmoveHandler(e) {
  let left = e.currentTarget.offsetLeft
  let top = e.currentTarget.offsetTop
  let pageX = e.touches[0].pageX
  let pageY = e.touches[0].pageY

  let ctx = this.data.ctx
  //根据鼠标路径绘画
  ctx.lineTo(pageX - left, pageY - top)
  //立即渲染
  ctx.stroke()
}
```

使用 `bindtouchmove`，需要单独处理页面跟着滚动的问题

给 canvas 绑定 bindtouchmove="touchmoveHandler" 然后绑定空的 catchtouchmove 事件`catchtouchmove="preventTouchmove"` 或者直接 `catchtouchmove="ture"`

```html
<canvas type="2d" id="sign" bindtouchstart="bindtouchstartHandler" bindtouchmove="bindtouchmoveHandler" catchtouchmove="preventTouchmove"></canvas>
```

```js
bindtouchstartHandler(e) {
  if (e.type != 'touchstart') return false
  let ctx = this.data.ctx
  //开始本次绘画
  ctx.beginPath()
  //画笔起始点
  ctx.moveTo(e.touches[0].x, e.touches[0].y)
},

// bind绑定的事件
bindtouchmoveHandler (e) {
  let ctx = this.data.ctx
  //根据鼠标路径绘画
  ctx.lineTo(e.touches[0].x, e.touches[0].y)
  //立即渲染
  ctx.stroke()
},
preventTouchmove () {}
```

保存到相册

wx.canvasToTempFilePath(Object object, Object this)
https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html

```js
 // 把当前画布指定区域的内容导出生成指定大小的图片。 canvas2d不需要使用draw方法
canvasToTempFilePath() {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    query
      .select('#sign')
      .fields({ node: true, size: true })
      .exec(res => {
        // console.log(res)
        const canvas = res[0].node
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          fileType: 'jpg',
          canvas: canvas,
          success(res) {
            console.log(res.tempFilePath) // 文件临时地址 可以保存到相册或上传
            resolve(res.tempFilePath)
          }
        })
      })
  })
},

// 保存本地
saveToAlbum() {
  this.canvasToTempFilePath().then(file => {
    wx.getSetting({
      success(res) {
        // 如果没有则获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: file,
                success() {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail() {}
          })
        } else {
          // 有授权直接保存
          wx.saveImageToPhotosAlbum({
            filePath: file,
            success() {
              wx.showToast({
                title: '保存成功'
              })
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  })
}
```
