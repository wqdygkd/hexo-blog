---
title: '使用 Fiddler 向指定页面中注入 js 或修改页面内容, 本地文件/目录响应请求'
tags:
  - fiddler
  - 调试
id: '433'
categories:
  - - web前端
date: 2020-01-13 17:42:46
---

## 修改线上页面内容

有时候调试网页，需要在第三方页面中注入点 js 或修改一些代码，来进行自己的测试，可以使用 FiddlerScript 修改页面内容

使用方法如下

打开 fiddler 选择右边的 `FiddlerScript` 选项卡, 或者从菜单 - `Rules(规则)` - `Customize Rules(自定义规则)` 打开

点击 `Go to(转到)` - 选择 `OnBeforeResponse` 添加如下代码

```js
static function OnBeforeResponse(oSession: Session) {
  // ...
  // 判断如果是百度或是请求url中包含 baidu.com 的响应就在head前面添加一个 js 弹窗
  if (oSession.HostnameIs('www.baidu.com') || oSession.uriContains('baidu.com') && oSession.oResponse.headers.ExistsAndContains('Content-Type','text/html')){

        // 解码响应内容
        oSession.utilDecodeResponse()
        // 替换内容
        oSession.utilReplaceInResponse('</head>','<script>alert('哈哈');</script></head>')
  }
}
```

如果要替换的内容比较多或比较复杂，可以使用正则替换，替换方式如下

```js
// 解码响应内容
oSession.utilDecodeResponse()
var oBody = System.Text.Encoding.UTF8.GetString(oSession.responseBodyBytes)
// 使用正则进行替换
var oRegEx = /<\/head>/gi
oBody = oBody.replace(oRegEx, '<script>alert(1);</script></head>')
//设置新的响应内容
oSession.utilSetResponseBody(oBody)
```

最后点击左上角的 `Save Script(保存)` 即可

## 线上请求映射到本地开发环境

1. 指定一个本地文件来代替线上请求的文件，编辑 FiddlerScript 添加如下代码

```js
static function OnBeforeResponse(oSession: Session) {
  // 如果请求url中包含nav.js 就用 D:/nav.js 来响应
  if (oSession.uriContains('nav.js')) {
    oSession['x-replywithfile'] ='D:/nav.js'
  }
}
```

除了编辑 FiddlerScript，也可以选择在右侧打开 `AutoResponder(自动回复器)` 选项卡 ，添加规则并`启用规则`，效果相同

2. 本地目录响应

原理同响应单个文件，只是封装了方法批量替换

```js
static function OnBeforeResponse(oSession: Session) {
  if (m_Hide304s && oSession.responseCode == 304) {
      oSession['ui-hide'] = 'true'
  }

  var domain:String='http://online.com/static/'
  // 本地目录 注意使用 '/' 代替 '\'
  var folder:String='D:/static/'
  AutoResponseFolder(oSession, domain, folder)
}

static function AutoResponseFolder (oSession: Session, domain:String, folder:String) {
  // 获取当前对话的完整URL
  var fullUrl:String = oSession.fullUrl
  if (fullUrl.StartsWith(domain)) {
    var localPath:String = fullUrl.replace(domain, folder)
    // 设置延迟
    // oSession['response-trickle-delay'] = 1000
    oSession['x-replywithfile'] = localPath
    // FiddlerObject.log(localPath)
  }
}
```

3. 替换整个线上环境为本地开发环境

在 `AutoResponder(自动回复器)` 选项卡中，
添加如下规则：`regex:(?insx)http://online.com\/(?<name>.+)$` => `http://localhost/${name}`

将所有 `http://online.com` 上的请求替换成本地 `localhost`

4. 使用 Stave 插件批量映射

下载地址：https://code.google.com/archive/p/stave/downloads
