---
title: yarn workspace 使用
id: '2027'
categories:
  - 前端
date: 2021-07-04
---

添加 yarn workspace 配置
```json
{
  "private": true, // 项目根目录下的private必须设置成true，否则workspace不会被启用
  "workspaces": [ // 指定需要管理的模块
    "packages/*"
  ]
}
```

给根项目安装依赖

```bash
yarn add -W -D typescript
```

给 package 安装包

```bash
yarn workspace package1 add vue
```

运行项目

```bash
yarn workspace package1 run serve
```
