---
title: npm 包管理工具的使用
tags:
  - nodejs
  - npm
id: '427'
categories:
  - - web前端
date: 2019-07-03 22:32:09
---

### 解决某些 npm 包无法下载的问题

如 electron sass

修改 `~/.npmrc`，或当前项目下的`.npmrc` 文件（如果没有可以新建）增加如下内容

```
registry=https://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
electron_mirror=http://npm.taobao.org/mirrors/electron/
chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver
```

淘宝 npm 镜像 https://npm.taobao.org/

[npm 官网](https://npmjs.com)
[npm 文档](https://docs.npmjs.com/)
[npm 中文文档](https://www.npmjs.cn/)

### npm 基本命令

```bash
# 更新 npm
npm -v|--version
npm install npm@latest -g

# nvm : npm Version Manager

# 搜索包
npm search <pkg>

# 安装包
npm install [<@scope>/]<pkg> # [<@scope>/] 安装限定范围的包
npm install [<@scope>/]<pkg>@<tag>
npm install [<@scope>/]<pkg>@<version>
npm install [<@scope>/]<pkg>@<version range>
npm install <folder>
npm install <tarball file>  # .tar, .tar.gz, or .tgz
npm install <tarball url>
npm install <github usename>/<guthub project>
npm install <git:// url>

npm install <pkg> -S|--save # 安装到 dependencies
npm install <pkg> -D|--save-dev # 安装到 devDependencies

# 安装全局包
npm install -g <pkg>

# 更新包
npm outdated # 检查可以更新的模块
npm update # 更新全部本地包
# 更新全局安装的包
npm update -g # 更新全部
npm update -g| --global <pkg> # 更新指定包

# 更新方式 1
# 手动修改 package.json 中依赖包版本，之后执行
npm install --force

# 更新方式 2 使用第三方插件：
npm install -g npm-check-updates
ncu # 查看可更新包
ncu -u # 更新 package.json
npm install # 升级到最新版本

# 删除本地包
npm uninstall <pkg>
npm uninstall --save <pkg> # 从 `package.json` 文件中删除依赖

# 卸载全局安装的包
npm uninstall -g <pkg>

# 打开官网
npm docs|home [<pkg>]
# 打开源码仓库页面
npm repo [<pkg>]

# 初始化一个项目，创建一个 package.json 文件，项目名不能为中文
npm init
# 创建默认 package.json 文件 快速的初始化一个项目，会使用文件夹名称作为项目名
npm init --yes or -y
```

简写

```bash
npm install  可简写成 npm i

npm uninstall 可简写成 npm uni
```

### npm 修改源

**修改全局配置**

- 进入~/.npmrc 增加 `registry=https://registry.npm.taobao.org`
- 通过命令 `npm config set registry http://registry.cnpmjs.org`


**修改当前项目的 npm 源**

在 `package.json` 同级目录下创建 `.npmrc` 文件，增加 `registry=https://registry.npm.taobao.org`


**临时使用指定源下载** `npm install jquery --registry=https://registry.npm.taobao.org`

**使用 nrm 管理源**

### npm 配置文件

```bash
# .npmrc 配置文件位置（~/.npmrc）
npm config list

# npm 缓存目录，默认 C:\Users\<username>\AppData\Roaming\npm-cache
npm config get cache

# 删除 npm 缓存：注意：如果网速慢的话，会导致下载失败。 再重新下载之前，建议使用该命令，清除刚才下载的缓存，否则有可能一直无法下载成功
npm cache clean --force | -f

# npm 全局 node 包位置：  默认在 C:\Users\用户名\AppData\Roaming\npm目录下
npm config get prefix
# 或者
npm root -g

# 修改 npm 全局文件位置及缓存文件位置
npm config set prefix "<new_path>"
npm config set cache "<new_path>"
```

### 版本号

使用 NPM 下载和发布代码时都会接触到版本号。NPM 使用语义版本号来管理代码

语义版本号分为 X.Y.Z 三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

- 如果只是修复 bug，需要更新 Z 位
- 如果是新增了功能，但是向下兼容，需要更新 Y 位
- 如果有大变动，向下不兼容，需要更新 X 位

### nrm 使用

nrm：npm registry manager（npm 仓库地址管理工具）

```bash
# 查看配置列表，带 `*` 号即为当前使用的配置
nrm ls

# 切换源
nrm use 源的别名

# 添加源
nrm add 别名 地址

# 测速
nrm test 别名

# 删除源
nrm del 别名
```

### 查看项目安装了那些包

```bash
npm list --depth=0 [--dev | --production]
npm list --depth=0
```

–depth 表示深度，我们使用的模块会有依赖，深度为零的时候，不会显示依赖模块

### 查看全局安装的包

```bash
npm list --depth=0 --global
```

### package.json 文件

package.json 文件，包（项目）描述文件，用来管理组织一个包（项目），它是一个纯 JSON 格式的

- 作用：描述当前项目（包）的信息，描述当前包（项目）的依赖项
- 如何生成：`npm init`或者`npm init -y`
- 作用
  - 作为一个标准的包，必须要有`package.json`文件进行描述
  - 一个项目的 node_modules 目录通常都会很大，不用拷贝 node_modules 目录，可以通过 package.json 文件配合`npm install` 直接安装项目所有的依赖项
- 描述内容

```json
{
  "name": "myproject", // 描述了包的名字，不能有中文
  "version": "1.0.0",
  "description": "", // 包的描述信息
  "main": "index.js", // 入口文件
  "scripts": {
    // 配置一些脚本
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], // 关键字（方便搜索）
  "author": "", // 作者信息
  "license": "ISC", // 许可证，开源协议
  "dependencies": {
    // 项目依赖
    "bootstrap": "^3.3.7",
    "jquery": "^3.3.1"
  }
}
```

**注意：一个合法的 package.json，必须要有 name 和 version 两个属性**
