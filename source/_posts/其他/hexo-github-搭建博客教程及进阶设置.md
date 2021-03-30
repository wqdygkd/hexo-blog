---
title: Hexo+Github 搭建博客教程及进阶设置
tags:
  - github
  - hexo
id: '423'
categories:
  -  教程
date: 2017-12-22 22:29:32
---

[Hexo 文档](https://hexo.io/zh-cn/docs/index.html)

# 配置环境

## 安装 Node

作用：用来生成静态页面的 到[Node.js 官网][1]下载相应平台的最新版本，一路安装即可。

## 安装 Git

作用：把本地的 hexo 内容提交到 github 上去。[Git 官网下载][2]

## 申请 GitHub

作用：是用来做博客的远程创库、域名、服务器之类的。 [github 账号注册][3]，[github 配置][4]

## 安装 HEXO

执行如下命令安装 hexo：

```bash
npm install hexo-cli -g
```

初始化命令：

```bash
hexo init
```

文件夹的目录如下：

```bash
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

`_config.yml` 网站配置文件

| 参数        | 描述                                                                                   |
| ----------- | -------------------------------------------------------------------------------------- |
| title       | 网站标题                                                                               |
| subtitle    | 网站副标题                                                                             |
| description | 网站描述                                                                               |
| author      | 您的名字                                                                               |
| language    | 网站使用的语言                                                                         |
| timezone    | 网站时区。Hexo 默认使用您电脑的时区。时区列表。比如说：America/New_York, Japan, 和 UTC |

> 其中，description 主要用于 SEO，告诉搜索引擎一个关于您站点的简单描述，通常建议在其中包含您网站的关键词。author 参数用于主题显示文章的作者

生成静态页面

将 md 文件放到 `source/_posts` 文件夹下执行命令：

```bash
hexo g/generate # 生成静态页面至 public 目录
# -w/--watch 参数监视文件变动
```

安装本地服务

```bash
npm install hexo-server --save
```

启动本地服务，进行文章预览调试，命令：

```bash
hexo server # 开启预览访问端口(默认端口4000，'ctrl + c'关闭server)
# --debug 参数开启调试模式 -p/--port 参数重设端口
```

浏览器输入[http://localhost:4000][5] 预览

自定义 IP

服务器默认运行在 0.0.0.0，您可以覆盖默认的 IP 设置，如下：

```bash
hexo server -i 192.168.1.1
```

# 配置 Github

## 建立 Repository

建立与你用户名对应的仓库，仓库名必须为`your_user_name.github.io`，固定写法

## 建立关联

> 打开站点配置文件`_config.yml` 翻到最下面，改成我这样子的，注意 `:` 后面要有空格

```bash
deploy:
   type: git
   repository: ssh://git@github.com/cuilongjin/cuilongjin.github.io.git
   branch: master
```

> 为了便于以后管理，可以创建备份分支，`$ git checkout -b hexo`创建 hexo 分支用于备份原始文件 所有的修改添加均在此分支下进行，并 push 到远程 hexo 分支

执行如下命令

```bash
npm install hexo-deployer-git --save
```

然后，执行配置命令：

```bash
hexo deploy # 将 .deploy 目录部署到 GitHub
```

然后再浏览器中输入`http://your_user_name.github.io/`就行了

## 部署步骤

每次部署的步骤，可按以下三步来进行。

```bash
hexo clean
hexo generate
hexo deploy
```

# 写作

执行下列命令来创建一篇新文章

```bash
hexo new [layout] <title>
```

在文章中插入指定大小的图片

```html
{% img [class names] /path/to/image [width] [height] [title text [alt text]] %}
```

Bootstrap Callout

使用方式

```
{% note class_name %} Content (md partial supported) {% endnote %}
```

其中，`class_name` 可以是以下列表中的一个值：

`default`、`primary`、`success`、`info`、`warning`、`danger`

# 主题

[NexT v5.1.x][6] [NexT v6.0.0][8] [next 主题个性化配置][12]

## 下载 NexT 主题

```bash
cd your-hexo-site
git submodule add git@github.com:cuilongjin/hexo-theme-next.git themes/next
```

## 启用主题

打开站点配置文件 `_config.yml` ， 找到 theme 字段，并将其值更改为 next

NexT 主题的目录架构

```
├── .github                #github信息
├── languages              #多语言
|   ├── _en.yml            #默认语言
|   └── zh-CN.yml          #简体中文
|   └── zh-TW.yml          #繁体中文
├── layout                 #布局，根目录下的*.swig文件是对主页，分页，存档等的控制
|   ├── _custom            #可以自定义的模板，覆盖原有模板
|   |   ├── head.swig      #文首样式
|   |   ├── header.swig    #头部样式
|   |   ├── sidebar.swig   #侧边栏样式
|   ├── _macro             #可以自定义的模板，覆盖原有模板
|   |   ├── post.swig      #文章模板
|   |   ├── reward.swig    #打赏模板
|   |   ├── sidebar.swig   #侧边栏模板
|   ├── _partial           #局部的布局
|   |   ├── head           #头部模板
|   |   ├── search         #搜索模板
|   |   ├── share          #分享模板
|   ├── _script            #局部的布局
|   ├── _third-party       #第三方模板
|   ├── _layout.swig       #主页面模板
|   ├── index.swig         #主页面模板
|   ├── page               #页面模板
|   └── tag.swig           #tag模板
├── scripts                #script源码
|   ├── tags               #tags的script源码
|   ├── marge.js           #页面模板
├── source                 #源码
|   ├── css                #css源码
|   |   ├── _common        #*.styl基础css
|   |   ├── _custom        #*.styl自定义局部css
|   |   └── _mixins        #mixins的css
|   ├── fonts              #字体
|   ├── images             #图片
|   ├── js                 #javascript源代码
|   └── lib                #引用库
├── _config.yml            #主题配置文件
└── README.md              #说明文件
```

## 在菜单上添加页面

以添加 about 页面为例，在 hexo 目录下执行：

```bash
hexo new page "about"
```

然后你会发现 source 里面多了个目录 about，里面有个 index.md。其实你也可以手动建立。 然后在主题配置文件 `_config.yml` 中找到 menu 一项，添加一行 About: /about

## 设置「阅读全文」

在首页显示文章的摘录并显示 **阅读全文** 按钮，可以通过以下方法：

1. 在文章中使用 `<!-- more -->` 手动进行截断，Hexo 提供的方式 **推荐**
2. 在文章的 [front-matter](https://hexo.io/docs/front-matter.html) 中添加 `description`，并提供文章摘录
3. 自动形成摘要，在主题配置文件 `_config.yml` ，启用`auto_excerpt`

```yml
auto_excerpt:
  enable: true
length: 150
```

默认截取的长度为 `150` 字符，可以根据需要自行设定

建议使用 `<!-- more -->`（即第一种方式），除了可以精确控制需要显示的摘录内容以外， 这种方式也可以让 Hexo 中的插件更好的识别。

## 添加 RSS

在博客根目录下执行：

```bash
npm install --save hexo-generator-feed
```

打开站点配置文件 `_config.yml` ，添加：

```yml
# Extensions
## Plugins: http://hexo.io/plugins/
plugins: hexo-generate-feed
```

打开主题配置文件 `_config.yml` ，添加：

```yml
rss: /atom.yml
```

## 添加本地搜索

安装 hexo-generator-search，执行以下命令：

```bash
npm install hexo-generator-search --save
```

打开主题配置文件 `_config.yml` ，添加：

```yml
local_search:
  enable: true
```

## 自定义样式

`themes\next\source\css\_custom\custom.styl` 文件中添加自定义样式

### 修改头像样式

```css
.site-author-image {
  border-radius: 50%;
}
```

### 更改主题背景

```css
// 背景图片相关
body {
  background-image: url(../images/background.jpg);
  height: 100%;
  width: 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  background-size: cover;
}
```

图片放入 `themes\next\source\images` 中即可

改变背景色和透明度，添加：

```css
.main-inner {
  background: #fff;
  opacity: 0.9;
}
// 文章内容的透明度
.content-wrap {
  opacity: 0.85;
}
// 侧边框的透明度设置
.sidebar {
  opacity: 0.85;
}
// 菜单栏的透明度设置
.header-inner {
  background: rgba(255, 255, 255, 0.85);
}
// 搜索框的透明度设置
.popup {
  opacity: 0.9;
}
```

### 修改 local-search 加载图标

在`blog/themes/next/layout/_third-party/search/localsearch.swig`中寻找：

```
<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
```

将其修改为：

```
<i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw margin-bottom"></i>
```

### 修改文章内链接文本样式

```css
// 文章内链接文本样式
.post-body p a {
  color: #0593d3;
  border-bottom: 1px solid #0593d3;
  &:hover {
    color: #fc6423;
    border-bottom: 1px solid #fc6423;
  }
}
```

### 自定义代码块样式

```css
code {
  color: #ff7600;
  background: #fbf7f8;
  margin: 2px;
}
// 大代码块的自定义样式
.highlight,
pre {
  margin: 5px 0;
  padding: 5px;
  border-radius: 3px;
}
```

### 修改文章底部的那个带 # 号的标签

编辑主题配置文件 `_config.yml` ，修改

```yml
tag_icon: tag
```

### 在每篇文章末尾统一添加"本文结束"标记

打开 `\themes\next\layout\_macro\post.swig` 文件，在 `post-body` 之后， `post-footer` 之前添加如下代码：

```html
<div>
  {% if not is_index and theme.passage_end_tag.enable %}
  <div style="text-align:center;color: #ccc;font-size:14px;margin-top: 20px;">-------------本文结束-------------</div>
  {% endif %}
</div>
```

然后打开主题配置文件 `_config.yml` ，在末尾添加：

```yml
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```

### 添加顶部加载条

```bash
cd themes/next
git clone https://github.com/theme-next/theme-next-pace source/lib/pace
```

修改主题配置文件 `_config.yml` 将 pace: false 改为 pace: true

自定义颜色

```less
/* 自定义进度条颜色 */
.pace {
  .pace-progress {
    background: #1e92fb; // 进度条颜色
    height: 3px;
  }
  .pace-progress-inner {
    box-shadow: 0 0 10px #1e92fb, 0 0 5px #1e92fb; // 阴影颜色
  }
  .pace-activity {
    border-top-color: #1e92fb; // 上边框颜色
    border-left-color: #1e92fb; // 左边框颜色
  }
}
```

### 浏览器切换标签离开当前页面时改变 title 提示

`themes/next/lauout/_script/vendors.swig`

```html
<script>
  let a = '? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ☕️ ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ☘️ ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ☺️ ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ☹️ ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?'
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState == 'hidden') {
      normal_title = document.title
      document.title = a.split(' ')[parseInt(Math.random() * 235)]
    } else document.title = normal_title
  })
</script>
```

### 设置首页隐藏指定文章

自定义 front-matter 的参数
例如，自定义添加一个 notshow 参数，值为 true 表示隐藏

修改主题的 `\themes\next\layout\index.swig` 文件

将

```
{% block content %}
  <section id="posts" class="posts-expand">
    {% for post in page.posts %}
      {{ post_template.render(post, true) }}
    {% endfor %}
  </section>

  {% include '_partials/pagination.swig' %}
{% endblock %
```

改成

```
{% block content %}
  <section id="posts" class="posts-expand">
    {% for post in page.posts %}
      {% if post.notshow != true %}
        {{ post_template.render(post, true) }}
      {% endif %}
    {% endfor %}
  </section>

  {% include '_partials/pagination.swig' %}
{% endblock %}
```

## 添加评论系统

### Gitmen 评论

#### GitHub 授权接入

Gitment 是使用的 GitHub Issues 作为评论系统，在接入 Gitment 前，需要获得 GitHub 的授权，获得相应的客户端 id 和客户端私钥，以备站点使用。 [OAuth application 注册接入][9]

#### 添加 Gitment

> 如果您使用的是 Hexo 框架的 Next 主题博客，想要添加 Gitment 的时候，记得将自己的 Next 主 题更新到最新版。

打开主题配置文件 `_config.yml` 修改如下：

```yml
gitment:
  enable: true
  github_user: # MUST HAVE, Your Github ID
  github_repo: # MUST HAVE, The repo you use to store Gitment comments
  client_id: # MUST HAVE, Github client id for the Gitment
  client_secret: # EITHER this or proxy_gateway, Github access secret token for the Gitment
```

其中 lazy 的含义，是否懒加载相应评论框，如果为 true，文章底部评论是收起状态，提示显示 Gitment 评论按钮，单击展开评论框

### LiveRe 评论

注册[LiveRe][10]

打开主题配置文件 `_config.yml` 添加：

```yml
# Support for LiveRe comments system.
# You can get your uid from https://livere.com/insight/myCode (General web site)
livere_uid: your uid
```

### Hypercomments 超级评论

注册[Hypercomments][13]

打开主题配置文件 `_config.yml` 添加：

```yml
# Hypercomments
# hypercomments_id: your id
```

### valine 评论系统

## 添加分享

```bash
cd themes/next
git clone https://github.com/theme-next/theme-next-needmoreshare2 source/lib/needsharebutton
```

打开主题配置文件 `_config.yml` ，加入：

```yml
needmoreshare2:
  enable: true
  postbottom:
    enable: true
  float:
    enable: true
```

## SEO 优化

### 添加站点地图（sitemap.xml）

```bash
npm install hexo-generator-sitemap hexo-generator-baidu-sitemap
npm install hexo-generator-baidu-sitemap
```

在**站点配置文件**中添加如下代码:

```yml
sitemap:
  path: sitemap.xml
baidusitemap:
  path: baidusitemap.xml
```

配置成功后，会生成`sitemap.xml`和`baidusitemap.xml`，前者适合提交给谷歌搜素引擎，后者适合提交百度搜索引擎。

### 提交博客地址到搜索引擎

如果你不主动提交你的博客地址给各大搜索引擎，那么即使你站内优化做得再好，搜索引擎根本都不知道你的博客的存在。 所以别忘记在你创建完博客的那一刻就去提交。如果你此刻还没有提交，现在就去吧。

- Google https://www.google.com/webmasters/tools/submit-url
- 必应 https://www.bing.com/toolbox/webmaster/
- Baidu https://ziyuan.baidu.com/linksubmit/index

### Google 站长工具 和 Google Analysis

GA 是用来统计访问信息的，站长工具是用来查看网站的查询和搜索数据

注册[Google Analysis](https://analytics.google.com/)

编辑主题配置文件 `_config.yml` ， 修改字段 `google_analytics`， 值设置成你的 Google 跟踪 ID。跟踪 ID 通常是以 UA- 开头

[Google 站长工具](https://search.google.com/search-console/) 提交 sitemap

### 添加蜘蛛协议 robots.txt

robots.txt，代码如下

```txt
# hexo robots.txt
User-agent: *
Allow: /
Allow: /archives/

Disallow: /vendors/
Disallow: /js/
Disallow: /css/
Disallow: /fonts/
Disallow: /vendors/
Disallow: /fancybox/

Sitemap: https://cuilongjin.top/sitemap.xml
Sitemap: https://cuilongjin.top/baidusitemap.xml
```

把`robots.txt`放在你的`hexo`站点的`source`文件下即可

### 给出站链接添加 `nofollow` 标签

## 设置忽略文件渲染

打开站点配置文件 `_config.yml` ，修改 `skip_render` 参数的值

```yml
# 路径是相对source目录的
# 不对文件进行渲染，保持文件原有内容
skip_render:
  - "*.html"
  - "demo/**" // 排除 demo 整个目录
  - README.md
```

再次使用 hexo d 命令部署博客的时候就不会在渲染这些文件了

## 添加 google adsense

注册账号 https://www.google.com/adsense/start/

获取代码

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  ;(adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: 'ca-pub-9068539038073295',
    enable_page_level_ads: true
  })
</script>
```

将网站关联到 AdSense

在主题配置文件中添加广告控制开关

```yml
# 添加 Google AdSense
google_adsense: true
```

主题文件夹下找到 /layout/\_partial/head.swig 里添加代码：

```swig
{% if theme.google_adsense %}
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-9068539038073295",
      enable_page_level_ads: true
    })
  </script>
{% endif %}
```

重新部署网站

等待审核，审核成功会向你发送邮件

## 文章加密访问

https://github.com/MikeCoder/hexo-blog-encrypt

安装

```bash
npm install hexo-blog-encrypt
```

在 **站点配置文件** 中启用该插件:

```yml
# 文章加密 https://github.com/MikeCoder/hexo-blog-encrypt
encrypt:
  enable: true
  # 默认的提示和摘要内容
  default_abstract: 这是一篇加密文章，内容可能是个人情感宣泄或者收费技术。如果你确实想看，请与我联系
  default_message: 输入密码，查看文章
```

在需要加密的文章的头部添加上对应的字段，如 password, abstract, message

```yml
password: 该博客加密使用的密码
abstract: 该博客的摘要，会显示在博客的列表页
message: 博客查看时，密码输入框上面的描述性文字
```

存在问题

- 字数统计功能字数会显得比实际值大
- 加密文章内代码复制失效

## 添加评分系统

[https://widgetpack.com](https://widgetpack.com/) 注册

获得 id，即为左上角的数字：

主题配置文件中修改

```yml
rating:
  enable: true
  id:
```

在侧栏找到 rating 的 setting：推荐将投票方式改为 ip 投票，因为这个平台提供的账号投票基本不面向国内。

## 添加萌萌哒看板娘

https://blog.bill.moe/hexo-live2d-poster-girl/

## 添加 Hitokoto 一言功能

https://hitokoto.cn/api

## 安装 Hexo Admin

```bash
npm install hexo-admin
hexo server
```

然后打开 localhost:4000/admin/

设置登陆 admin 的用户名和密码，打开**http://localhost:4000/admin/#/auth-setup**

可以直接输入你想要的用户名和密码，把生成的文本复制到 hexo 根目录配置文件中**\_config.yml**

```yml
# hexo-admin authentification
admin:
  username: username
  password_hash: $2a$10$L.XAIqIWgTc5S1zpvV3MEu7/rH34p4Is/nq824smv8EZ3lIPCp1su
  secret: my super secret phrase
```

## 主题更新

命令：

```bash
cd themes/next
git submodule update
```

推荐你使用 [Hexo 数据文件][7]特性进行主题配置

目前，通过 pull 或下载新的 release 版本来更新 NexT 主题的体验并不平滑。当用户使用 git pull 更新 NexT 主题时经常需要解决冲突问题，而在手动下载 release 版本时也经常需要手动合并配置

现在来说，NexT 推荐用户存储部分配置在站点的 `_config.yml` 中，而另一部分在主题的 `_config.yml` 中。这一方式固然可用，但也有一些缺点

- 配置项被分裂为两部分
- 用户难以弄清何处存放配置选项

为了解决这一问题，NexT 将利用 Hexo 的数据文件特性。因为数据文件是在 Hexo 3 中被引入，所以你需要更新至 Hexo 3.0 以后的版本来使用这一特性。

如果你仍然希望使用 Hexo 2.x，你依旧可以按老的方式进行配置。NexT 仍然兼容 Hexo 2.x（但可能会出现错误）。

**带来的好处** 使用这一特性，你现在可以将你的全部配置置于同一位置 `(source/_data/next.yml）`，并且不需要修改 `next/_config.yml`。如果在新的 release 中出现了任何新的选项，那么你只需要从 `next/_config.yml` 中将他们复制到 `source/_data/next.yml` 中并设置它们的值为你想要的选项。

**如何使用这一特性** 请确认你的 Hexo 版本为 3.0 或更高。 在你站点的 `hexo/source/_data` 目录创建一个 `next.yml` 文件（如果 `_data` 目录不存在，请创建之）。 复制你站点的 `_config.yml` 和主题的 `_config.yml` 中的 NexT 配置项到 `hexo/source/_data/next.yml` 中。 使用 `--config source/_data/next.yml` 参数来启动服务器，生成或部署。 例如：`hexo clean --config source/_data/next.yml` && `hexo g --config source/_data/next.yml` 。

### 从 NexT v5.1.x 更新

<https://github.com/theme-next/hexo-theme-next/blob/master/docs/cn/UPDATE-FROM-5.1.X.md>

[1]: https://nodejs.org/
[10]: https://livere.com/
[12]: https://segmentfault.com/a/1190000009544924/
[2]: https://git-scm.com/
[3]: https://github.com/
[4]: https://cuilongjin.github.io/2017/10/08/GitHub%E4%BD%BF%E7%94%A8/
[5]: http://localhost:4000/
[6]: http://theme-next.iissnan.com/
[7]: https://github.com/theme-next/hexo-theme-next/blob/master/docs/cn/DATA-FILES.md
[8]: https://github.com/theme-next/hexo-theme-next
[9]: https://github.com/settings/applications/new/
[13]: https://www.hypercomments.com
