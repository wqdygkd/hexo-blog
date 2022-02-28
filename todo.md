2040

call apply bind 手动实现
多次bind
完整原型链

防抖 节流 深拷贝 手写Promise 任务调度 继承 排序 去重 发布订阅

keep-alive缓存页面使用$destroy后不能在次缓存 https://github.com/vuejs/vue/issues/6509

js  比较两个日期大小。格式：2018-8-12 12:30

```
const compareDate2 = (d1, d2) => {
  let date1 = new Date(Date.parse(d1))
  let date2 = new Date(Date.parse(d2))
  return date1 > date2
}

```

js 比较同一天的两个时间大小 如 11:30 和 10:00

```
以当天作为日期计算时间戳
const compareTime1 = (t1, t2) => {

  let d = new Date()
  let ft1 = d.setHours(t1.split(":")[0], t1.split(":")[1])
  let ft2 = d.setHours(t2.split(":")[0], t2.split(":")[1])
  return ft1 > ft2
}

计算当天的总秒数比较

以2001-01-01 作为日期计算
const compareTime3 = (t1, t2) => {
  // new Date('1 12:11:11') - new Date('1 12:11')
  return new Date('1 ' + t1) > new Date('1 ' + t2)
}
```


高性能渲染十万条数据（虚拟列表） https://juejin.cn/post/6844903982742110216
https://tu.lingtings.com/jd.html


js compose

gsudo - a sudo for Windows
https://github.com/gerardog/gsudo

20220225
h5 调用相机拍照后 页面刷新
在使用vant的uplaoder组件开发微信h5页面时，在特定的ios手机系统出现拍照上传导致页面刷新，目前测试的安卓手机没有出现，刷新时还没有调用上传接口，有时刷新后会跳转到第一次进来的页面。这个问题真是大坑啊，难搞哦！
https://www.cnblogs.com/12baby/p/12661335.html
https://juejin.cn/post/6844903701379809294
