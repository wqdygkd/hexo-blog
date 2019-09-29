---
title: vue 项目加载第 3 方 js 优化
categories:
  - [vue]
date: 2019/08/06
---

### vue 项目加载第 3 方 js 优化

> 这里的第 3 方组件大多不能通过 npm 或其他模块安装的组件(地图 sdk)，所以不能直接用 vue 里的异步组件

在 index.html 里引入的第三方组件，有很多在首屏上根本用不到，严重拖慢的网页的加载速度造成长时间的白屏

可以根据需要动态插入 js

定义插入 js 到 document 的方法

```js
//! loadjs.js
const loadjsAsync = function(url) {
  return new Promise((resolve, reject) => {
    let scriptHasLoad = document.querySelector('script[src="' + url + '"]')
    if (scriptHasLoad) {
      resolve()
      return false
    }

    let script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
    script.onerror = err => {
      reject(err)
    }
  })
}
export default loadjsAsync
```

使用

```js
// 引入加载js方法
import loadjsAsync from '../assets/js/loadjs'

beforeCreate () {
  // 引入第三方 js
  loadjsAsync('static/ueditor/ueditor.all.min.js').then(() => {
    this.editor = UE.delEditor('editor')
    this.editor = UE.getEditor('editor', this.config)
  }).catch((err) => {
    console.log(err)
  })
}
```

动态导入
动态导入返回请求模块的模块名称空间对象的promise 。因此，可以配合使用async/await。
```js
element.addEventListener('click', async() => {
  const module = await import(`./api-scripts/button-click.js`);
  module.clickEvent();
})
```
