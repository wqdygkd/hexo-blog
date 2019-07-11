---
title: vue-cli3.0 内存溢出 JavaScript heap out of memory
data: 2019/07/11
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



nodejs 内存限制，通过添加启动参数可以解决

vue-cli2：

```
npm run dev 和 npm run build 直接在前面加上--max_old_space_size=4096
```

vue-cli3：

```
npx --max_old_space_size=4096 vue-cli-service serve
```

或

```
npm i increase-memory-limit cross-env
scripts 中添加指令 "fix-memory-limit": "cross-env LIMIT=4096 increase-memory-limit"
npm run fix-memory-limit
npm run serve
```





最后将 lintOnsave: false 解决了

https://github.com/vuejs/vue-cli/issues/1453 

