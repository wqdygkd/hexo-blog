---
title: Window 10下终端美化
tags:
  - zsh
  - oh-my-zsh
  - Fluent Terminal
  - Windows Terminal
  - PowerShell
id: 2017
date: 2020-11-01
---

WSL(Ubuntu)/MSYS2/Cygwin/PowerShell7
Windows Terminal/Fluent Terminal

1. Fluent Terminal & PowerShell 7+ & oh-my-posh & posh-git
[Fluent Terminal](https://github.com/felixse/FluentTerminal/releases)
[PowerShell](https://github.com/PowerShell/PowerShell/releases)

https://zhuanlan.zhihu.com/p/137595941
https://zhuanlan.zhihu.com/p/137251716

2. MSYS2 + Windows Terminal

下载 [MSYS2](https://www.msys2.org/)

配置

安装zsh
```bash
pacman -S zsh
```

由于msys2 指定 MSYSCON 为 defterm 时默认是执行bash.exe， 我们简单地把 C:\msys64\msys2_shell.cmd 大概第5行的bash改成zsh即可：
```
set "LOGINSHELL=zsh"
```

配置到Windows Terminal


在settings.json文件中加入MSYS2的参数

```json
{
    "guid": "{1c4de342-38b7-51cf-b940-2309a097f589}", // 唯一的标识，改成和其他的已有终端不一样
    "hidden": false,
    "name": "MSYS2",
    "acrylicOpacity": 0, // 透明度
    "closeOnExit": true, // 关闭的时候退出命令终端
    "colorScheme": "Konsolas", // 样式配置
    "commandline": "C:\\msys64\\msys2_shell.cmd -defterm -no-start -here -use-full-path  -mingw64", // 重点就是要用这个脚本启动，以及他的参数
    "cursorColor": "#FFFFFF", // 光标颜色
    "cursorShape": "bar", // 光标形状
    "fontFace": "Fira Code", // 字体配置，选择你电脑上已安装的字体
    "fontSize": 11, // 终端字体大小
    "historySize": 9001, // 终端窗口记忆大小
    "icon": "C:\\msys64\\msys2.ico" // git 的图
}
```

commandline命令解释
-mingw64 告诉 MSYS2 这个启动脚本，我们要启动的是mingw64, 不是mingw32, 也不是默认的msys2.

-defterm 表示要启动的是bash,当然前面我们已经通过hacking方法让它默认变成了zsh了。

-no-start 表示不通过start命令来启动（因为这地弹出一个新的黑框框窗口,而我们的目的是要在Windows Terminal里跑的)

-use-full-path 或 set MSYS2_PATH_TYPE=inherit 表示,我们在mingw64下面的时候, PATH环境变量的值继承自windows系统的环境变量。

-here 就是set CHERE_INVOKING=1的意思。


安装 oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 如果无法安装，使用下面这种方式
sh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ohmyzsh/ohmyzsh@master/tools/install.sh)"
```


