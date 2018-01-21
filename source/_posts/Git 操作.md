---
title: Git 操作
date: 2017-10-08
updated: 2018-01-20
tags: Git
---

# Git核心概念

* **`WorkSpace`**：  
工作区，即从仓库中checkout出来的，需要通过Git进行版本控制的目录和文件，可以简单的理解为在电脑里真实看到的文件；

* **`Stage(Index)`**：  
暂存区，或者叫做待提交更新区；在提交进入Repository之前，可以把所有的更新放在暂存区, 用 `git add` 的文件都在这里；

* **`Repository(Remote/Local)`**：  
仓库，一个存放在远端／本地的版本库，用 `git commit` 提交的文件就到Local Repository,用 `git push` 提交的文件就到Remote Repository；

* **`.git`**：存放Git管理信息的目录，初始化仓库的时候会自动创建。

>![](../../../../images/img/git.jpg)

# Git 初始设置

## 设置用户名和邮箱地址

首先来设置使用 Git 时的用户名和邮箱地址，名字请用英文输入。

```bash
git config --global user.name "your_name"
git config --global user.email "your_email@example.com"
```

这个命令，会在“ ~/.gitconfig”中以如下形式输出设置文件。

```bash
[user]
name = your_name
email = your_email@example.com
```

>1. 想更改这些信息时，可以直接编辑这个设置文件。
2. git config命令的 `--global` 参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

## 设置 SSH Key

GitHub 上连接已有仓库时的认证，是通过使用了 SSH 的公开密钥认证方式进行的。现在我们来创建公开密钥认证所需的 SSH Key，并将其添加至 GitHub。  

运行下面的命令

```bash
ssh-keygen -t rsa -C "your_email@example.com"
Generating public/private rsa key pair.
Enter file in which to save the key(/Users/your_user_directory/.ssh/id_rsa):按回车键
Enter passphrase (empty for no passphrase):输入密码
Enter same passphrase again:再次输入密码
```

输入密码后会出现以下结果。

```bash
Your identification has been saved in /Users/your_user_directory/.ssh/id_rsa.
Your public key has been saved in /Users/your_user_directory/.ssh/id_rsa.pub.
The key fingerprint is:SHA256:hbn1zPihlVDe/Y2FvzzZU8l+AOSlVRlaOmro/nTQDGg cui3155@gmail.com(fingerprint值+your_email@example.com)
The key's randomart image is:
+---[RSA 2048]----+
|            o o++|
|         o.= =++ |
|        oE+.=+o o|
|        .+.*=oo++|
|        S..+Booo=|
|        . .+..o.=|
|         ..... Bo|
|        . . .   +|
|         ...     |
+----[SHA256]-----+
```

`id_rsa` 文件是私有密钥，`id_rsa.pub` 是公开密钥。

## 添加公开密钥

在 GitHub 中添加公开密钥，今后就可以用私有密钥进行认证了。
点击右上角的账户设定按钮（Account Settings），选择 SSH Keys 菜单。点击 AddSSH Key 之后，在 Title 中输入适当的密钥名称。Key 部分请粘贴 id_rsa.pub 文件里的内容。

`id_rsa.pub` 的内容可以用如下方法查看。

```bash
cat ~/.ssh/id_rsa.pub
ssh-rsa公开密钥的内容your_email@example.com
```

完成以上设置后，就可以用手中的私人密钥与 GitHub 进行认证和
通信了。

```bash
ssh -T git@github.com
The authenticity of host 'github.com (192.30.255.113)' can't be established.
RSA key fingerprint is (fingerprint值).
Are you sure you want to continue connecting (yes/no)?输入yes
Warning: Permanently added 'github.com,192.30.255.113' (RSA) to the list of known hosts.
Enter passphrase for key '/c/Users/C.DESKTOP-3S4APJ4/.ssh/id_rsa':
```

出现如下结果即为成功。

```bash
Hi cuilongjin! You've successfully authenticated, but GitHub does not provide shell access.
```

## 提高命令输出的可读性
将 `color.ui` 设置为 `auto` 可以让命令的输出拥有更高的可
读性。

```
$ git config --global color.ui true
```

`~/.gitconfig` 中会增加下面一行。

```
[color]
ui = true
```

这样一来，各种命令的输出就会变得更容易分辨。

## 设置头像
通过 Gravatar服务

## 忽略特殊文件

>忽略文件的原则是：

>* 忽略操作系统自动生成的文件，比如缩略图等；
>* 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
>* 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

在Git工作区的根目录下创建一个特殊的.gitignore文件，然后把要忽略的文件名填进去，把 `.gitignore` 也提交到Git，Git就会自动忽略这些文件。
检验.gitignore的标准是git status命令是不是说working directory clean

GitHub已经为我们准备了各种配置文件[https://github.com/github/gitignore](https://github.com/github/gitignore)

* 强制添加被.gitignore忽略的文件

```bash
git add -f <file>			"强制添加被.gitignore忽略的文件"

git check-ignore -v <file>		"检查哪个规则忽略了此文件,以便修订规则"
.gitignore:x:xxx.xx    xxxxxx
```

## 配置别名

```bash
git config --global alias.st status		"配置st别名表示status"

git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.br branch
git config --global alias.unstage 'reset HEAD'
git config --global alias.last 'log -1'

git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

* 配置文件  
每个仓库的Git配置文件都放在.git/config文件中,可以直接修改此文件，
`$ cat .git/config` 查看配置文件

## 搭建Git服务器

[搭建Git服务器](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137583770360579bc4b458f044ce7afed3df579123eca000)

# Git 基本操作

## git init -- 初始化仓库

```bash
mkdir git_learn
cd git_learn
git init
```

如果初始化成功，执行了 `git init` 命令的目录下就会生成 `.git`  目录。这个 `.git` 目录里存储着管理当前目录内容所需的仓库数据。
> * `mkdir git_learn` 命令创建git_learn空文件夹
* `pwd` 命令用于显示当前目录

## git add -- 向暂存区中添加文件

```bash
git add README.md
```

## git commit -- 保存仓库的历史记录

```bash
git commit -m "First commit"
```

-m参数后的 `"First commit"` 称作提交信息，是对这个提交的概述,如果想要记述得更加详细，请不加 `-m` ，直接执行 `git commit` 命令,执行后编辑器就会启动。
在编辑器中记述提交信息的格式如下:  
	第一行：用一行文字简述提交的更改内容  
	第二行：空行  
	第三行以后：记述更改的原因和详细内容  

## git status -- 查看仓库的状态

```bash
touch README.md		"建立 README.md 文件作为管理对象"
git status
```

`git status` 命令可以让我们时刻掌握仓库当前的状态,但不能看到具体修改了什么内容，需要用 `git diff` 这个命令来查看具体修改内容。

## git diff -- 查看更改前后的差别

* 查看当前工作树和最新add之间（暂存区）的差别（difference）

```bash
git diff
```

	1. 显示最新add之后到当前工作树所做的修改；
	2. 如果尚未用 `git add` 命令向暂存区添加任何东西，则程序只会显示工作树与最新提交状态之间的差别；
	3. “+”号标出的是新添加的行，被删除的行则用“-”号标出。
	4. git diff -- README.md  查看README.md文件的修改

* 查看工作树和最新提交的差别

```bash
git diff HEAD
```

>HEAD 是指向当前分支中最新一次提交的指针

## git log--查看提交日志

```bash
git log
commit 9f129bae19b2c82fb4e98cde5890e52a6c546922
Author: cuilongjin <cuilongjin@gmail.com>
Date:   Sun Oct 8 22:08:39 2017 +0900
    First commit

git log --pretty=oneline
//只显示提交信息的第一行  
git log 目录名或文件名
//显示指定目录、文件的日志

git log -p 文件名
//显示文件的改动（q键退出命令）
```

## git reset -- 版本回退

```
git reset -h			"查看帮助"
--mixed		"默认"		"reset HEAD and index"
--soft				"reset only HEAD"
--hard  			"reset HEAD, index and working tree"
--merge 			"reset HEAD, index and working tree"
--keep 				"reset HEAD but keep local changes"
```

>1. `HEAD` 表示当前版本，上一个版本就是 `HEAD^` ，上上一个版本就是 `HEAD^^` ，当然往上100个版本写100个^比较容易数不过来，所以写成 `HEAD~100` 。
2. 使用 `commit_id` 回退 , `git reflog` 用来记录你的每一次命令和 `commit_id`

```bash
git reset --soft HEAD^ 

git reset --hard commit_id

git reset HEAD [file]
```

## git checkout --file -- 丢弃工作区的修改

```bash
git checkout -- README.md
```

把README.md文件在 `工作区的修改全部撤销` ，**用版本库里的版本替换工作区的版本**

这里有两种情况：  

1. 一种是README.md自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

2. 一种是README.md已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次git commit或git add时的状态，可用于**撤销文件修改或恢复误删文件**

## git remote -- 添加远程库

```bash
git remote add origin git@github.com:cuilongjin/git_test.git
```

添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。

查看远程库的信息：

```bash
git remote -v
origin  git@github.com:cuilongjin/git_test.git (fetch)
origin  git@github.com:cuilongjin/git_test.git (push)
```

上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。

删除已有的GitHub远程库：

```bash
git remote rm origin
```

## git push -- 推送到远程

```bash
git push -u origin master
```

> 第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

> 之后，只要本地作了提交，就可以通过命令： `$ git push origin master` 把本地master分支的最新修改推送至GitHub

>remote: error: GH007: Your push would publish a private email address.  
解决方法——http://github.com/settings/emails 把Keep my email address private这一项去掉勾选即可。

如果推送失败，则因为远程分支比你的本地更新，需要先用git pull抓取远程的新提交

## git clone -- 克隆远程库

```bash
git clone git@github.com:cuilongjin/仓库名.git
```

Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快

从远程库clone时，默认情况下，只能看到本地的master分支。
要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是用这个命令创建本地dev分支

```bash
git checkout -b dev origin/dev

$ git branch --set-upstream dev origin/dev	"指定本地dev分支与远程origin/dev分支的链接"
```

# Git 分支管理

## git branch -- 显示分支一览表

```bash
git branch
* master
```

master 分支左侧标有 `“*”`（星号），表示这是我们当前所在的分支

-a 参数可以查看远程分支(远程分支会用红色表示出来)

* git checkout -b 创建、切换分支

```bash
git checkout -b feature-A
```

创建名为 feature-A 的分支  
连续执行下面两条命令也能收到同样效果

```bash
git branch feature-A		"创建 feature-A 分支"
git checkout feature-A		"将当前分支切换为 feature-A 分支"

git checkout -			"切换回上一个分支"
```

* git merge ——合并分支

首先切换到 master 分支，然后执行

```bash
git merge --no-ff -m "描述" feature-A
```

为了在历史记录中明确记录下本次分支合并，我们需要创建合并提交。因此，在合并时加上 `--no-ff` 参数。

* git branch -d 删除分支

```bash
git branch -d feature-A		"删除本地feature-A分支"

git branch -D feature-A		"强行删除本地feature-A分支"

git push origin :hexo		"删除远程hexo分支"
```

## git stash -- 存储工作现场

```bash
git stash			"把当前工作现场“储藏”起来"
git stash list			"查看存储的工作现场"
```

恢复工作现场

```bash
git stash apply		"恢复工作现场，stash内容并不删除"
git stash drop		"删除stash内容"
git stash pop		"恢复的同时把stash内容也删了""
```

恢复指定的stash，用命令：`git stash apply stash@{0}`

[廖雪峰_Git教程_创建与合并分支](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840038939c291467cc7c747b1810aab2fb8863508000)

[廖雪峰_Git教程_分支管理策略](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758410364457b9e3d821f4244beb0fd69c61a185ae0000)

[廖雪峰_Git教程_Bug分支](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000)


# Git 标签管理

## 创建标签

```bash
首先切换到需要打标签的分支上
git tag v1.0			"默认标签是打在最新提交的commit上的"

git tag v1.0 <commit id>	"对指定某一次提交打标签"

git tag -a v1.0 -m "version1.0 released" <commit id>			"创建带有说明的标签，用-a指定标签名，-m指定说明文字"

git tag -s v1.0 -m "signed version1.0 released" <commit id	"通过-s用私钥签名一个标签(需配置gpg密钥对)"
```

## 查看标签

```bash
git tag			"查看所有标签"
v1.0

git show		"查看所有标签信息"

git show v1.0		"查看v1.0标签信息"
commit id:xxx
Author:xxx
Date:xxx
```

## 推送标签到远程

```bash
git push origin v1.0		"推送v1.0标签到远程"

git push origin --tags		"推送全部尚未推送的本地标签到远程"
```

## 删除标签

```bash
git tag -d v1.0				"删除本地标签v1.0"

git push origin :refs/tags/v1.0		"删除远程标签v1.0"
```
