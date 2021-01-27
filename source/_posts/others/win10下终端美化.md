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

## Fluent Terminal & PowerShell 7+ & oh-my-posh & posh-git
[Fluent Terminal](https://github.com/felixse/FluentTerminal/releases)
[PowerShell](https://github.com/PowerShell/PowerShell/releases)

https://zhuanlan.zhihu.com/p/137595941
https://zhuanlan.zhihu.com/p/137251716

## MSYS2 + Windows Terminal

[MSYS2](https://www.msys2.org/)
[Windows Terminal](https://github.com/microsoft/terminal/releases)

### 配置

#### 安装 zsh

打开 MSYS2，

```bash
pacman -Syu
pacman -S zsh
```

由于 msys2 指定 MSYSCON 为 defterm 时默认是执行bash.exe， 我们把 C:\msys64\msys2_shell.cmd 大概第5行的bash 改成 zsh 即可：

```cmd
set "LOGINSHELL=zsh"
```

#### 安装 oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 如果无法安装，使用下面这种方式
sh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ohmyzsh/ohmyzsh@master/tools/install.sh)"
```

#### 安装 Fira Code 字体

[Fira Code](https://github.com/tonsky/FiraCode/releases)

#### 配置到 Windows Terminal

在 settings.json 文件中加入MSYS2的配置

```json
"profiles":
{
  "defaults":
  {
    // Put settings here that you want to apply to all profiles.
  },
  "list":
  [
    {
      "guid": "{1c4de342-38b7-51cf-b940-2309a097f589}", // 唯一的标识，改成和其他的已有终端不一样
      "hidden": false,
      "name": "MSYS2",
      "acrylicOpacity": 0, // 透明度
      "closeOnExit": true, // 关闭的时候退出命令终端
      "colorScheme": "Homebrew", // 样式配置
      "commandline": "C:\\msys64\\msys2_shell.cmd -defterm -no-start -here -use-full-path  -mingw64", // 重点就是要用这个脚本启动，以及他的参数
      "startingDirectory": "~",
      "cursorColor": "#FFFFFF", // 光标颜色
      "cursorShape": "bar", // 光标形状
      "fontFace": "Fira Code", // 字体配置，选择你电脑上已安装的字体
      "fontSize": 11, // 终端字体大小
      "historySize": 9001, // 终端窗口记忆大小
      "icon": "C:\\msys64\\msys2.ico" // git 的图
    }
  ]
},

// Add custom color schemes to this array.
// To learn more about color schemes, visit https://aka.ms/terminal-color-schemes
"schemes": [
  {
    "name": "Homebrew",
    "black": "#000000",
    "red": "#FC5275",
    "green": "#00a600",
    "yellow": "#999900",
    "blue": "#6666e9",
    "purple": "#b200b2",
    "cyan": "#00a6b2",
    "white": "#bfbfbf",
    "brightBlack": "#666666",
    "brightRed": "#e50000",
    "brightGreen": "#00d900",
    "brightYellow": "#e5e500",
    "brightBlue": "#0000ff",
    "brightPurple": "#e500e5",
    "brightCyan": "#00e5e5",
    "brightWhite": "#e5e5e5",
    "background": "#283033",
    "foreground": "#00ff00"
  }
]
```

#### 安装 oh-my-zsh 主题

[主题列表](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)

推荐两款主题

[pure主题](https://github.com/sindresorhus/pure/)
[agnoster](https://github.com/agnoster/agnoster-zsh-theme)

#### 安装插件

```bash
cd ~/.oh-my-zsh/plugins
git clone https://github.com/zsh-users/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
```

启用插件

```bash
# 编辑~/.zshrc
vim ~/.zshrc
# 在plugins后括号里添加安装的插件名字
plugins=( git
          zsh-autosuggestions
          zsh-syntax-highlighting
        )
# 最后刷新
source ~/.zshrc
```
