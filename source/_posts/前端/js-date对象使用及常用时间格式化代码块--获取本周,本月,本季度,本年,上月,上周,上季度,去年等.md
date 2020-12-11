---
title: 'Date对象使用及常用的时间格式化代码块--获取本周,本月,本季度,本年,上月,上周,上季度,去年等'
tags:
  - js
id: '249'
categories:
  - - web前端
date: 2019-12-10 16:16:04
---

## Date 对象

## 整理一些时间格式化的方法


1.

```js
/**
 * 时间格式化
 * @param {date} timeStamp 要格式化的时间对象
 * @return {string} 2019年10月31日 16:22
 */

function format_date(timeStamp) {
  let date = new Date(timeStamp)
  return date.getFullYear() + '年' + prefix_zero(date.getMonth() + 1) + '月' + prefix_zero(date.getDate()) + '日 ' + prefix_zero(date.getHours()) + ':' + prefix_zero(date.getMinutes())
}
```

```js
/**
 * 数字格式化
 * @param {number} num 要格式化的数值
 * @return {string} 把小于10的数值前面加上0
 */
function prefix_zero(num) {
  return num >= 10 ? num : '0' + num
}
```

2.

```js
/**
 * 昨天的字符串格式时间
 * @return {string} 返回当前时间 - 1天
 */
function getYesterday() {
  var d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toLocaleString()
}
```

3.

```js
/**
 * 明天的字符串格式时间
 * @return {string} 返回当前时间 + 1天
 */
const getTomorrow = () => {
  let d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toLocalString()
}
```

4.

```js
/**
 * 获得本周的开始日期
 * @param {number} start 不传默认一周以周日开始 1 表示以周一开始
 * @return {date} timeStamp 时间戳
 */
function getWeekDate(start = 0) {
  let d = new Date('2019-12-15')
  let D = d.getDate()
  if (start == 0) {
    return d.setDate(D - d.getDay())
  } else {
    let W = d.getDay() || 6
    return d.setDate(D - W + 1)
  }
}
```

5.

```js
/**
 * 获得最近一周时间段
 * @return {date[]}
 */
function getLastWeek() {
  let d = new Date()
  let D = d.getDate()
  d.setDate(D - 7)
  return [d, new Date()]
}
```

6.

```js
/**
 * 获得某月的天数
 * @param {number} year 年
 * @param {number} month 月 从 0 开始
 * @return {number} 某月的天数, 不传参数为当月天数
 */
function getMonthDays(year, month) {
  let d = new Date()
  year = year || d.getFullYear()
  month = month || d.getMonth()
  var monthStart = new Date(year, month, 1)
  var monthEnd = new Date(year, month + 1, 1)
  var days = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
  return days
}
```

7.

```js
/**
 * 获得本月的开始或结束日期
 * @param {number} isEnd 不传默认本周的开端日期 1 本周的结束日期
 * @return {date} timeStamp 时间戳
 */
function getMonthDate(isEnd = 0) {
  let d = new Date()
  d.setDate(1)
  if (isEnd) {
    d.setDate(d.getDate() + getMonthDays() - 1)
    return d
  }
  return d
}
```

8.

```js
/**
 * 倒计时时间格式化
 * @param {date} timeStamp 要格式化的时间对象
 * @return {string}
 * 若时间大于1天 返回 n天n小时n分钟
 * 若时间小于1天，大于1小时 返回 n小时n分钟n秒
 * 若时间小于1小时，大于1分钟 返回 n分钟n秒
 * 若时间小于1分钟 返回 n秒
 */
function format_time(timeStamp) {
  let day = Math.floor(timeStamp / (24 * 3600 * 1000))
  let leave1 = timeStamp % (24 * 3600 * 1000)
  let hours = Math.floor(leave1 / (3600 * 1000))
  let leave2 = leave1 % (3600 * 1000)
  let minutes = Math.floor(leave2 / (60 * 1000))
  let leave3 = leave2 % (60 * 1000)
  let seconds = Math.floor(leave3 / 1000)
  if (day) return day + '天' + hours + '小时' + minutes + '分'
  if (hours) return hours + '小时' + minutes + '分' + seconds + '秒'
  if (minutes) return minutes + '分' + seconds + '秒'
  if (seconds) return seconds + '秒'
  return '时间到！'
}
```


## dayjs 库

轻量的处理时间和日期的 JavaScript 库

参考文档 [github 中文文档](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)

在本页面打开控制台即可体验 dayjs 的 api

<script src="https://unpkg.com/dayjs"></script>

使用 dayjs 获取本周,上周,本月,上月,本季度,上季度,本年,去年时间

```js
// let date = dayjs('2020-01-16')
let date = dayjs()
let day = date.day() // 1 星期
let currentWeekStart
let currentWeekEnd

// 本周
if (day > 0) {
  currentWeekStart = date.startOf('week').add(1, 'day')
} else {
  currentWeekStart = date.startOf('week').subtract(6, 'day')
}
currentWeekEnd = currentWeekStart.add(6, 'day')

// 上周
let lastWeekStart = currentWeekStart.subtract(7, 'day')
let lastWeekEnd = currentWeekStart.subtract(1, 'day')

// 本月 上月
let currentMonthStart = date.date(1)
let lastMonthStart = date.subtract(1, 'month').date(1)
let nextMonthStart = date.add(1, 'month').date(1)
let currentMonthEnd = nextMonthStart.subtract(1, 'day')
let lastMonthEnd = currentMonthStart.subtract(1, 'day')

// 本季度,上季度

// 本年 去年
let currentYearStart = date.month(0).date(1)
let currentYearEnd = date.month(11).date(31)
let lastYear = date.subtract(1, 'year')
let lastYearStart = date.subtract(1, 'year').month(0).date(1)
let lastYearEnd = lastYearStart.month(11).date(31)

let computedDate = {
  currentWeekStart: currentWeekStart.format('YYYY-MM-DD'),
  currentWeekEnd: currentWeekEnd.format('YYYY-MM-DD'),
  lastWeekStart: lastWeekStart.format('YYYY-MM-DD'),
  lastWeekEnd: lastWeekEnd.format('YYYY-MM-DD'),
  currentMonthStart: currentMonthStart.format('YYYY-MM-DD'),
  currentMonthEnd: currentMonthEnd.format('YYYY-MM-DD'),
  lastMonthStart: lastMonthStart.format('YYYY-MM-DD'),
  lastMonthEnd: lastMonthEnd.format('YYYY-MM-DD'),
  currentYearStart: currentYearStart.format('YYYY-MM-DD'),
  currentYearEnd: currentYearEnd.format('YYYY-MM-DD'),
  lastYearStart: lastYearStart.format('YYYY-MM-DD'),
  lastYearEnd: lastYearEnd.format('YYYY-MM-DD')
}
console.log(computedDate)
```
