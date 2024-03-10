

### git pull

```bash
# 获取远程仓库的更新，并且与本地的分支进行合并
git pull <远程仓库名> <远程分支名>:<本地分支名>

# 如果远程分支是与当前分支合并，则冒号后面的部分可以省略
git pull origin next 等同于 git fetch origin && git merge origin/next

# 远程主机删除了某个分支，默认情况下，git pull 不会在拉取远程分支的时候，删除对应的本地分支
# 加上参数 -p 就会在本地删除远程已经删除的分支
$ git pull -p
# 等同于下面的命令
$ git fetch --prune origin
$ git fetch -p

# 合并 pull 两个不同的项目出现 fatal: refusing to merge unrelated histories
git pull origin master ----allow-unrelated-histories
```

### git push

```bash
git push <远程仓库名> <本地分支名>:<远程分支名>

# 第一次推送分支时，加上 -u 参数，git 会把本地分支和远程分支关联起来，在以后的推送或者拉取时就可以简化命令
git push -u origin master

# 如果没有本地分支，表示删除远程分支
git push origin :master
# 等同于
$ git push origin --delete master

# 以强制覆盖的方式推送修改后的 repo （重新上传 repo）（不指定分支即所有分支）
git push origin --force --all
```

### git clone

```bash
git clone git@github.com:cuilongjin/仓库名.git [指定文件夹]

# 默认远程主机为 origin ， -o 指定主机名
git clone --o origin1 git@github.com:cuilongjin/仓库名.git
```

Git 支持多种协议，包括 https，但通过 ssh 支持的原生 git 协议速度最快

从远程库 clone 时，默认情况下，只能看到本地的 master 分支
要在 dev 分支上开发，就必须创建远程 origin 的 dev 分支到本地，于是用这个命令创建本地 dev 分支

```bash
git checkout -b dev origin/dev

# 指定本地 dev 分支与远程 origin/dev 分支的链接
git branch --set-upstream dev origin/dev
```

克隆指定分支

```bash
# git clone -b|--branch 分支名或tag名 仓库地址
```

### git fetch

```bash
# 将某个远程仓库的更新，全部取回本地。默认取回所有分支（branch）的更新
git fetch <远程仓库>

# 取回特定分支的更新
git fetch <远程仓库> <分支名>
```

git fetch 和 git pull 区别

- git pull 获取远程仓库的更新，并且与本地的分支进行合并

- git fetch 所取回的更新，在本地主机上要用 "远程仓库/分支名" 的形式读取，即不会与本地分支合并


### git merge

合并分支

```bash
# 将 feature-A 合并到 master 上
# 首先切换到 master 分支，然后执行
git merge [--squash] [--no-ff] -m "描述" feature-A
--squash # 只是将<branch>中的修改内容迁移过来，而不保留其中的commit历史
--no-ff # 创建合并提交，为了在历史记录中明确记录下本次分支合并
```

### git stash

```bash
# 把当前工作现场“储藏”起来
git stash

# 查看存储的工作现场
git stash list
```

恢复工作现场

```bash
# 恢复工作现场，stash 内容并不删除
git stash apply

# 删除 stash 内容
git stash drop

# 恢复的同时把 stash 内容也删了
git stash pop
```

恢复指定的 stash，用命令：`git stash apply stash@{0}`

[廖雪峰 Git 教程创建与合并分支](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840038939c291467cc7c747b1810aab2fb8863508000)

[廖雪峰 Git 教程分支管理策略](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758410364457b9e3d821f4244beb0fd69c61a185ae0000)

[廖雪峰 Git 教程 Bug 分支](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000)

### git tag

- 创建标签

```bash
# 首先切换到需要打标签的分支上
# 默认标签是打在最新提交的 commit 上的
git tag v1.0

# 对指定某一次提交打标签
git tag v1.0 <commit id>

# 创建带有说明的标签，用 -a 指定标签名，-m 指定说明文字
git tag -a v1.0 -m "version1.0 released" <commit id>

# 通过 -s 用私钥签名一个标签(需配置gpg密钥对)
git tag -s v1.0 -m "signed version1.0 released" <commit id>
```

- 查看标签

```bash
# 查看所有标签
git tag
v1.0

# 查看所有标签信息
git show

# 查看 v1.0 标签信息
git show v1.0
commit id:xxx
Author:xxx
Date:xxx
```

- 推送标签到远程

```bash
# 推送 v1.0 标签到远程
git push origin v1.0

# 推送全部尚未推送的本地标签到远程
git push origin --tags
```

- 删除标签

```bash
# 删除本地标签 v1.0
git tag -d v1.0
# 删除远程标签 v1.0
git push origin :refs/tags/v1.0
或 git push origin --delete tag v1.0
```

## git 仓库分离

将一个 git 仓库里的一部分文件转出作为一个独立的仓库并保留提交记录 commit log

```
# 这就是那个大仓库 big-project
git clone git@github.com:**/big-project.git
cd big-project
# 把所有 `source/page` 目录下的相关提交整理为一个新的分支 page
git subtree split -P source/page -b page
# 另建一个新目录并初始化为 git 仓库
mkdir ../page
cd ../page
git init
# 拉取旧仓库的 page 分支到当前的 master 分支
git pull ../big-project page
```

## 快速克隆大项目

克隆单个分支

```bash
git clone --branch <branch_name> <remote-address>
```

只克隆最新的提交记录

```bash
git clone <remote-address> --depth 1
```

-- depth 代表克隆的深度，--depth 1 代表只克隆最新一次提交记录以及这次提交之后的最新内容，不克隆历史提交，所造成的影响就是不能查看历史提交记录

克隆单个分支的最新一次提交

```
git clone --branch <branch_name> <remote-address> --depth 1
```

## git 修改提交历史

修改最后一条 commit

```bash
git commit --amend
```

修改多条 commit

```bash
git rebase -i HEAD~3 修改最近三次提交
git rebase -i --root 修改所有提交

git rebase -i  [startpoint]  [endpoint] 指定了一个编辑区间（不包含[startpoint]），如果不指定[endpoint]，则该区间的终点默认是当前分支 HEAD 所指向的 commit

# edit 模式下
git commit --amend --author="author <email>" # 修改提交人信息
git commit --amend  --date="commit_time" # 修改时间 时间格式 Sat, 24 Dec 2016 18:12:09 +0800
```

Commands

**p**, pick = use commit: 直接使用 commit 不做任何修改，其中 p 是 pick 的缩写，以下雷同

**r**, reword = use commit, but edit the commit message: 使用 commit，修改 commit 注释

**e**, edit = use commit, but stop for amending :使用 commit，但是遇到此命令时会停止合并，可以修改提交信息

**s**, squash = use commit, but meld into previous commit: 使用 commit，但是会合并到前一个 commit 中，默认保留所有的 commit 注释，并变为可以修改状态

**f**, fixup = like "squash", but discard this commit's log message：和 squash 类似，但是会抛弃 commit 的 log 信息

**x**, exec = run command (the rest of the line) using shell：使用 shell 运行命令

**d**, drop = remove commit：丢弃 commit，（并删除该提交所做的修改）

<https://www.jianshu.com/p/67f20d19605a>

## git filter-branch

彻底删除不需要的文件

```bash
# 删除 ./node_modules 目录
git filter-branch -f --prune-empty --index-filter "git rm --cached --ignore-unmatch -fr ./node_modules" -- --all
```

修改提交用户名

```bash
git filter-branch -f --env-filter "GIT_AUTHOR_NAME=your new author name" -- --all
```

修改提交邮箱

```bash
git filter-branch -f --env-filter "GIT_AUTHOR_EMAIL=your new author email" -- --all
```

## other

### git add .`的时候遇到`warning: LF will be replaced by CRLF in ......`

```bash
git config core.autocrlf
git config --global core.autocrlf false

# true：添加文件到git仓库时，git将其视为文本文件。他将把crlf变成lf
# false：line-endings将不做转换操作。文本文件保持原来的样子
# input：把crlf转成lf，当有人Check代码时还是lf方式。因此在window操作系统下，不要使用这个设置

# CRLF (carriagereturnlinefeed)：表示句尾使用回车换行两个字符(即Windows编程时使用"\r\n"换行)
# LF(line feed)：表示句尾只使用换行(Unix Style)
# CR：表示只使用回车
```

### Git 永久删除文件(包括历史记录)

https://help.github.com/articles/removing-sensitive-data-from-a-repository/

```bash
# 在仓库的根目录执行
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch 文件路径' --prune-empty --tag-name-filter cat -- --all
# 文件路径相对于git仓库根目录
# 删除文件夹 添加 -r 命令

# 以强制覆盖的方式推送修改后的 repo （不指定分支即所有分支）（重新上传 repo）
git push origin --force --all

# 强制推送 tags
git push origin --force --tags

# 清理和回收空间
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
```

重新[绑定](https://git-scm.com/book/en/Git-Branching-Rebasing)，而不是合并创建的旧（受污染）存储库历史记录中的任何分支

- git 修改已提交的某一次的邮箱和用户信息

```bash
git filter-branch -f --env-filter \
"GIT_AUTHOR_NAME='Newname'; GIT_AUTHOR_EMAIL='newemail'; \
GIT_COMMITTER_NAME='committed-name'; GIT_COMMITTER_EMAIL='committed-email';" HEAD
```

### fork 的项目( A )与原项目 (B) 保持同步

```bash
# 将 A 克隆到本地做中转

# 添加 B 远程仓库地址并拉取
git remote add update <B 远程仓库地址>
git fetch update master:updated

# 合并并解决冲突
git merge updated

# 也可以直接合并远程分支
git merge update/master
```

### 远程分支删除以后，本地显示仍然存在的解决办法

```bash
# 显示所有分支：
git branch -a

# 命令查看远程分支和本地分支的对应关系
git remote show origin

# 会看到
refs/remotes/origin/<branch> stale (use 'git remote prune' to remove)

# 执行下面命令同步删除
git remote prune origin
或者
git fetch -p
```
