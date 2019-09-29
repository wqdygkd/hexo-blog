切换标签离开当前页面时改变title提示
```js
    document.addEventListener('visibilitychange', function () {
    if (document.visibilityState == 'hidden') {
        normal_title = document.title;
        document.title = '你有正在进行的操作哦！';
    } else document.title = normal_title;
});
```
