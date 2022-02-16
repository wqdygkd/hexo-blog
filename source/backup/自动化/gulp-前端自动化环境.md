---
title: gulp 前端自动化环境
tags:
  - 前端自动化
id: '422'
categories:
  - 前端
date: 2018-12-12 22:28:56
---

# 前端自动化环境

实现一些简单的功能：

```
1. 版本控制
2. 编译SASS
3. 检查JS
4. 图片合并
5. 压缩CSS
6. 压缩JS
...
```

这些都是每个 Web 项目在构建、开发阶段需要做的事情。前端自动化构建环境可以把这些重复工作一次配置，多次重复执行，极大的提高开发效率。

构建工具： Gulp、Grunt、Webpack、...

## gulp 环境

Gulp 是基于 Node.js 的，需要要安装 Node.js

### 安装 # 4.0 版本

```bash
# 检查 node 环境
$ node -v

# 全局安装 gulp
$ npm install -g gulp
$ gulp -v  #4.0

# 切换到你的在项目根文件夹下，运行
$ npm install gulp

# 安装 gulp 功能插件依赖包
$ npm install gulp-less gulp-sass gulp-concat gulp-connect gulp-rename
```

### 配置

新建 `gulpfile.js` 配置文件放在项目根目录下

```javascript
// gulp3.x 配置不能直接在 4.0 上使用
// gulp4.0 配置内容

// 引入 gulp
const gulp = require('gulp')
// 引入组件
const less = require('gulp-less')
const fileinclude = require('gulp-file-include')
const connect = require('gulp-connect')

// 启动 serve
function serve() {
  connect.server({
    root: './',
    port: '8888',
    // 启用https
    // https: true,
    livereload: true
  })
}

// 编译 less
function compileLess() {
  return (
    gulp
      // '!./**' 忽略文件
      .src(['./less/*.less', '!./less/_*.less'])
      .pipe(less())
      .pipe(gulp.dest('./public/css'))
  )
}

// html 刷新
function refreshHtml() {
  return gulp.src('./*.html').pipe(connect.reload())
}

// 引入外部 html 文件
function compileHtml() {
  return gulp
    .src(['./*.html', '!./_*.html'])
    .pipe(
      fileinclude({
        prefix: '@@'
      })
    )
    .pipe(gulp.dest('./public'))
}
// 在 html 中使用 `@@include('_header-aside.html')` 引入公共 html 结构

// 监听文件变化
function watch() {
  gulp.watch(['./less'], compileLess)
  gulp.watch(['./image'], compileImg)
  gulp.watch(['./js'], compileJs)
  gulp.watch(['./*.html'], compileHtml)
  gulp.watch(['./public'], refreshHtml)
}

// 默认任务，执行 gulp 会自动执行的任务
gulp.task('default', gulp.parallel(serve, watch))

// 复制 lib 文件夹
function copyLib() {
  return gulp.src('./lib/**/*').pipe(gulp.dest('./dest/lib'))
}

// 清空 dest 文件夹
function clean() {
  return del(['./dest'])
}
```

### 运行 gulp 任务

```bash
# 执行定义的 default 任务
# $ gulp default
$ gulp

# 单独运行 sass 任务
$ gulp less
```

`!./**` 忽略文件

`gulp.parallel()` –并行运行任务

`gulp.series()` –运行任务序列

### 插件

```
其他 gulp 插件参考
gulp-imagemin: 		压缩图片
gulp-minify-css: 	压缩css
gulp-uglify:      压缩js
gulp-concat:    	合并文件
gulp-rename:  		重命名文件
gulp-htmlmin: 		压缩html
gulp-clean:      	清空文件夹
del:              删除文件
```

gulp-connect 启动服务本机可以打开，局域网下手机打不开解决办法

```js
connect.server({
  host: '0.0.0.0'
  或
  host: '::'
})
```

在 gulp 3.x 版本中报错会暂停监听需重新开启任务，4.0 修复了此问题

https://www.tuicool.com/articles/nAzqiaN
