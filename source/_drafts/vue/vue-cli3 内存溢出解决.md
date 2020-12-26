---
title: vue-cli3.0 内存溢出 JavaScript heap out of memory
categories:
  - [vue]
date: 2019/07/11
updated: 2019/08/01
---

错误内容：

```
<--- JS stacktrace --->

==== JS stack trace =========================================

    0: ExitFrame [pc: 000002861B95C5C1]
Security context: 0x002fdeb1e6e9 <JSObject>
    1: DoJoin(aka DoJoin) [0000002FDEB05E91] [native array.js:~87] [pc=000002861C436409](this=0x0037aae826f1 <undefined>,l=0x01420be65761 <JSArray[2]>,m=2,A=0x0037aae828c9 <true>,w=0x0375f51b46d9 <String[1]\: \n>,v=0x0037aae829a1 <false>)
    2: Join(aka Join) [0000002FDEB05EE1] [native array.js:~112] [pc=000002861BC4F978](this=0x0037aae826f1 <undefined>,l...

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

百度出的原因及解决方案基本都是：

nodejs 内存限制，通过添加启动参数可以解决

vue-cli2：

```bash
npm run dev 和 npm run build 直接在前面加上--max_old_space_size=4096
```

vue-cli3：

```bash
npx --max_old_space_size=4096 vue-cli-service serve
```

或

```bash
npm i increase-memory-limit cross-env
scripts 中添加指令 "fix-memory-limit": "cross-env LIMIT=4096 increase-memory-limit"
npm run fix-memory-limit
npm run serve
```

<span class="red">但是通过以上设置并没有解决问题，最后将 lintOnsave: false 解决了</span>

由此分析 lintOnsave 为 true 时 ，npm run serve|build 时会启用 eslint-loader 进行代码检查，某些插件可能无法进行代码检查并产生了递归，导致内存溢出，因为该项目使用了 Ueditor 插件，之后将 Ueditor 插件加入 eslintignore 并将 lintOnsave 恢复成 true，项目依然能够正常运行

参考链接: https://github.com/vuejs/vue-cli/issues/1453
