---
title: vue - 插件和 vue.use(plugin)
date: 2019/08/12
---

[vue 官方文档-插件](https://cn.vuejs.org/v2/guide/plugins.html)

Vue.use() 用于安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入

该方法需要在调用 new Vue() 之前被调用

当 install 方法被同一个插件多次调用，插件将只会被安装一次

Vue.use 方法内部实现

```js
/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list, start) {
  start = start || 0
  var i = list.length - start
  var ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
```

```js
function initUse(Vue) {
  Vue.use = function(plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      // 插件将只会被安装一次
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1) // 将参数转换成数组
    args.unshift(this) // 将 vue对象添加进参数
    if (typeof plugin.install === 'function') {
      // 传入一个对象，对象中包含install方法
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // 传入的plugin是一个函数,会被作为 install 方法
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

可以看出，该方法就是调用了插件的 install 方法，如果插件没有 install 方法，直接通过 Vue.prototype 添加插件即可，如果有 install 方法，可以通过 Vue.use() 添加

```js
// 创建一个简单的插件 say.js
var install = function(Vue) {
  if (install.installed) return // 如果已经注册过了，就跳过
  install.installed = true

  Object.defineProperties(Vue.prototype, {
    $say: {
      value: function() {
        console.log('I am a plugin')
      }
    }
  })
}
module.exports = install
```

vue 插件库 [awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries)
