---
title: echarts 柱状图基本配置
tags:
  - echarts
id: '1145'
categories:
  - 前端
date: 2020-01-20 00:00:21
---

```js
monthOptions: {
  color: ['#FFD058'], // 设置柱的颜色 会被 series itemStyle color 覆盖
  xAxis: [
    {
      data: ['报备组数', '来访组数', '大定套数', '草签套数', '正签套数'], // x轴
      axisLabel: {
        inside: false, // 在外部显示
        textStyle: { // 设置样式
          color: 'rgba(255,255,255,0.5)',
          fontSize: 15,
          fontFamily: 'PingFang-SC-Regular,PingFang-SC'
        }
      },
      axisTick: { show: false }, // x轴线上的分割点
      axisLine: { show: false }// x轴线
    }
  ],
  yAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      formatter: function () { return '' } // 去掉y轴显示数字
    },
    splitLine: { show: false } // 水平线
  },
  grid: { // 间距
    left: '10%',
    right: '10%',
    bottom: '15%',
    top: '15%',
    containLabel: true
  },
  series: [
    { // 用于显示阴影
      type: 'bar',
      itemStyle: {
        color: 'rgba(255,255,255,0.08)'
      },
      barGap: '-100%',
      // barCategoryGap: '25%',
      barWidth: '15%',
      data: [1, 1, 1, 1, 1]
      // animation: false
    },
    { // 正常数据
      name: '',
      type: 'bar',
      barWidth: '15%',
      data: [],
      itemStyle: { // 上方显示数值
        normal: {
          label: {
            formatter: function (val) {
              return formate(val.value)
            },
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: '#FFD058',
              fontSize: 15,
              fontFamily: 'PingFang-SC-Regular,PingFang-SC'
            }
          }
        }
      }
    }
  ],
  animationDuration: 2000
}
```
