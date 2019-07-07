

## npm 使用

### 解决 npm 包无法下载

 electron sass 

进入 `~/.npmrc`，增加如下内容

```
registry=https://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
electron_mirror=http://npm.taobao.org/mirrors/electron/
```



淘宝 npm 镜像 https://npm.taobao.org/



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
npm update
# 更新全局安装的包
npm update -g # 更新全部
npm update -g| --global <pkg> # 更新指定包

# 删除本地包
npm uninstall <pkg>
npm uninstall --save <pkg> # 从 `package.json` 文件中删除依赖

# 卸载全局安装的包
npm uninstall -g <pkg>

# 打开官网
npm docs|home [<pkg>]
# 打开源码仓库页面
npm repo [<pkg>]

# 创建 package.json 文件
npm init
# 创建默认 package.json 文件
npm init --yes or -y


```



### npm 修改源

* 进入~/.npmrc 增加 `registry=https://registry.npm.taobao.org`

* 通过命令 `npm config set registry http://registry.cnpmjs.org`

* 临时使用指定源下载 `npm install jquery --registry=https://registry.npm.taobao.org`

* 使用 nrm 管理源



### npm 配置文件

```bash
# .npmrc 配置文件位置（~/.npmrc）
npm config list

# npm 缓存目录，默认 C:\Users\<username>\AppData\Roaming\npm-cache
npm config get cache

# 删除 npm 缓存
npm cache clean --force

# npm 全局 node 包位置
npm config get prefix
# 或者
npm root -g

# 修改 npm 全局文件位置及缓存文件位置
npm config set prefix "<new_path>"
npm config set cache "<new_path>"
```



### 版本号

使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码

语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

- 如果只是修复bug，需要更新Z位
- 如果是新增了功能，但是向下兼容，需要更新Y位
- 如果有大变动，向下不兼容，需要更新X位



### nrm 使用

nrm ls 查看配置列表，带*号即为当前使用的配置

nrm use 源的别名：切换源

nrm add 别名 地址 ： 添加源

nrm test 别名 ： 测速

nrm del 别名 ：删除源





