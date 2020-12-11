---
title: Linux screen 命令——多重视窗管理程序
tags:
  - linux
  - screen
id: '1887'
categories:
  - - 教程
date: 2020-07-12 20:47:14
---

Screen 是一个全屏窗口管理器。

## 安装

```bash
apt install screen
# 或
yum install screen
```
## 使用

```bash
screen -S <name> # 新建一个作业名为 name 的窗口，(标注 screen 窗口)
screen -ls # 显示目前所有的 screen 作业
screen -d <name> # 将指定的 screen 作业离线
screen -h <行数> # 指定视窗的缓冲区行数
screen -r <name> # 恢复指定的 screen 作业
screen -d -r <name> # 离线当前作业并回到 name 这个作业

# 当需要运行脚本、执行程序时，在命令前添加 screen 即可

ctrl + A + D # 将当前 screen detach 到后台

screen -X -S <name> quit # 删除指定 screen
```

进入一个 screen session 后，可能你开始跑一些程序，这时不能在命令行输入任何东西，可以使用快捷键 ctrl + A + D 将当前 screen detach 到后台

### 使用问题

问题：linux 在进入 screen 模式下之后，发现是无法在终端使用鼠标滚轮进行上下翻页拉动的，无法查看上面的终端输出内容了

解决办法

进入回滚模式（可以操作鼠标滚轮上下翻页）：先按`Ctrl+a`键，然后释放，然后再按[键即可进入翻页模式。
切换回之前模式：`Ctrl+c`


## ubuntu 下源码编译安装 screen 最新版

下载地址：http://ftp.gnu.org/gnu/screen/

```bash
# 下载
wget -c https://ftp.gnu.org/gnu/screen/screen-4.8.0.tar.gz

# 解压
tar -xzvf screen-4.8.0.tar.gz
cd screen-4.8.0

# 安装依赖
apt install gcc g++ make make-guile

# 编译
mkdir build && cd build
../configure

# 安装
make && make install

验证一下
screen -h

```

问题：

如果报错：`checking whether the C compiler works... no`

```bash
# 安装 g++
apt install g++
```

如果报错，信息如：`configure: error: !!! no tgetent - no screen`

需要先安装 ncurses 下载地址 https://ftp.gnu.org/gnu/ncurses

```bash
# 下载依赖包ncurses
wget -c https://ftp.gnu.org/gnu/ncurses/ncurses-6.2.tar.gz

# 解压安装
tar -xzvf ncurses-6.2.tar.gz
cd ncurses-6.2
mkdir build && cd build
../configure
make && sudo make install
```


