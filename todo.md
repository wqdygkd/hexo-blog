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
