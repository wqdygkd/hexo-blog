---
title: Window 10 下终端配置与美化
tags:
  - zsh
  - oh-my-zsh
  - Fluent Terminal
  - Windows Terminal
  - PowerShell
id: 2017
date: 2020-11-01
---

[WSL](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10) / [MSYS2](https://www.msys2.org/) / [Cygwin](http://www.cygwin.com/) / [PowerShell7](https://github.com/PowerShell/PowerShell/releases)

[Fluent Terminal](https://github.com/felixse/FluentTerminal/releases) / [Windows Terminal](https://github.com/microsoft/terminal/releases)

## WSL 配置 zsh

wsl 下 git clone 报错：GnuTLS recv error (-110): The TLS connection was non-properly terminated.

### 安装 zsh

```bash
apt install -y zsh
```

### 安装 oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 如果无法安装，使用下面这种方式
sh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ohmyzsh/ohmyzsh@master/tools/install.sh)"
```

### 配置插件

插件列表 https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins

[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
[zsh-proxy](https://github.com/SukkaW/zsh-proxy)

```bash
# 安装 zsh-syntax-highlighting 插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 安装 zsh-autosuggestions 插件
git clone https://github.com/zsh-users/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/sukkaw/zsh-proxy.git ~/.oh-my-zsh/custom/plugins/zsh-proxy

# 安装 zsh-proxy 插件
git clone https://github.com/sukkaw/zsh-proxy.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-proxy
```

修改 ~/.zshrc，在 plugins 中添加 zsh-syntax-highlighting

```bash
# 编辑 ~/.zshrc
vim ~/.zshrc

# 在 plugins 后括号里添加安装的插件名字
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)

# 刷新下配置
source ~/.zshrc
```

[zsh-proxy](https://github.com/SukkaW/zsh-proxy)

### 主题

[主题列表](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)

推荐两款主题

[pure主题](https://github.com/sindresorhus/pure/)
[agnoster](https://github.com/agnoster/agnoster-zsh-theme)

## PowerShell 7+ 配置 oh-my-posh & posh-git

https://zhuanlan.zhihu.com/p/137595941
https://zhuanlan.zhihu.com/p/137251716

#### 安装 Fira Code 字体

[Fira Code](https://github.com/tonsky/FiraCode/releases)
