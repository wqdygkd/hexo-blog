# Hexo+Github 搭建博客
---

[Hexo文档](https://hexo.io/zh-cn/docs/index.html)

# 配置环境

## 安装Node

> 作用：用来生成静态页面的 到[Node.js官网][1]下载相应平台的最新版本，一路安装即可。

## 安装Git

> 作用：把本地的hexo内容提交到github上去。[Git官网下载][2]

## 申请GitHub

> 作用：是用来做博客的远程创库、域名、服务器之类的。 [github账号注册][3]，[github配置][4]

## 安装HEXO

执行如下命令安装hexo：

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

参数          | 描述
----------- | --------------------------------------------------------------
title       | 网站标题
subtitle    | 网站副标题
description | 网站描述
author      | 您的名字
language    | 网站使用的语言
timezone    | 网站时区。Hexo 默认使用您电脑的时区。时区列表。比如说：America/New_York, Japan, 和 UTC 。

> 其中，description主要用于SEO，告诉搜索引擎一个关于您站点的简单描述，通常建议在其中包含您网站的关键词。author参数用于主题显示文章的作者。

生成静态页面

将md文件放到source_posts文件夹下执行命令：

```bash
hexo generate（hexo g 也可以）/生成静态页面至public目录
```

> -w, --watch参数监视文件变动

安装本地服务

```bash
npm install hexo-server --save
```

启动本地服务，进行文章预览调试，命令：

```bash
hexo server /开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
```

> --debug参数开启调试模式 -p, --port参数重设端口

浏览器输入[http://localhost:4000][5] 预览

自定义 IP

服务器默认运行在 0.0.0.0，您可以覆盖默认的 IP 设置，如下：

```bash
hexo server -i 192.168.1.1
```

# 配置Github

## 建立Repository

建立与你用户名对应的仓库，仓库名必须为`your_user_name.github.io`，固定写法

## 建立关联

> 打开站点配置文件`_config.yml` 翻到最下面，改成我这样子的，注意： : 后面要有空格

```bash
deploy:
   type: git
   repository: ssh://git@github.com/cuilongjin/cuilongjin.github.io.git
   branch: master
```

> 为了便于以后管理，可以创建备份分支，`$ git checkout -b hexo`创建hexo分支用于备份原始文件 所有的修改添加均在此分支下进行，并push到远程hexo分支。<br>
注意：`node_modules\mime-db\db.json` 文件会被忽略，需手动add

执行如下命令

```bash
npm install hexo-deployer-git --save
```

然后，执行配置命令：

```bash
hexo deploy  /将.deploy目录部署到GitHub
```

然后再浏览器中输入`http://your_user_name.github.io/`就行了。

## 部署步骤

每次部署的步骤，可按以下三步来进行。

```bash
hexo clean
hexo generate
hexo deploy
```

# 写作

执行下列命令来创建一篇新文章。

```bash
hexo new [layout] <title>
```

在文章中插入指定大小的图片。

```html
{% img [class names] /path/to/image [width] [height] [title text [alt text]] %}
```

# 主题

[NexT v5.1.x][6] [NexT v6.0.0][8] [next主题个性化配置][12]

## 下载 NexT 主题

```bash
cd your-hexo-site
git submodule add git@github.com:cuilongjin/hexo-theme-next.git themes/next
```

## 启用主题

打开站点配置文件 `_config.yml` ， 找到 theme 字段，并将其值更改为 next。

## 在菜单上添加页面

以添加about页面为例，在hexo目录下执行：

```bash
hexo new page "about"
```

然后你会发现source里面多了个目录about，里面有个index.md。其实你也可以手动建立。 然后在主题配置文件 `_config.yml` 中找到menu一项，添加一行About: /about。

## 设置首页不显示全文(只显示预览)

打开主题配置文件 `_config.yml` ，启用`auto_excerpt`

```bash
auto_excerpt:
  enable: true
  length: 150
```

## 添加RSS

在博客根目录下执行：

```bash
npm install --save hexo-generator-feed
```

打开站点配置文件 `_config.yml` ，添加：

```bash
# Extensions
## Plugins: http://hexo.io/plugins/
plugins: hexo-generate-feed
```

打开主题配置文件 `_config.yml` ，添加：

```bash
rss: /atom.yml
```

## 添加本地搜索

安装 hexo-generator-search，执行以下命令：

```bash
npm install hexo-generator-search --save
```

打开主题配置文件 `_config.yml` ，添加：

```bash
local_search:
  enable: true
```

## 修改头像样式

`\themes\next\source\css\_common\components\sidebar\sidebar-author.styl`
或在`themes\next\source\css_custom\custom.styl` 添加:

```css
.site-author-image {
  border-radius: 50%;
}
```

## 更改主题背景

`themes\next\source\css_custom\custom.styl` 添加:

```css
//背景图片相关
@media screen and (min-width:1200px) {

    body {
    background-image:url(/images/bg.jpg);
    background-repeat: no-repeat;
    background-attachment:fixed;
    background-position:50% 50%;
    background-size: cover
    }

    #footer a {
        color:#eee;
    }
}
```

图片放入 `themes\next\source\images` 中即可

改变背景色和透明度
添加：

```
.main-inner {
    background: #fff;
    opacity: 0.9;
}
```

## 添加评论系统

### 添加Gitmen评论

#### GitHub授权接入

Gitment是使用的GitHub Issues作为评论系统，在接入Gitment前，需要获得GitHub的授权，获得相应的客户端id和客户端私钥，以备站点使用。 [OAuth application注册接入][9]

#### 添加Gitment

> 如果您使用的是Hexo框架的Next主题博客，想要添加Gitment的时候，记得将自己的Next主题更新到最新版。

打开主题配置文件 `_config.yml` 修改如下：

```bash
gitment:
    enable: true
    github_user: # MUST HAVE, Your Github ID
    github_repo: # MUST HAVE, The repo you use to store Gitment comments
    client_id: # MUST HAVE, Github client id for the Gitment
    client_secret: # EITHER this or proxy_gateway, Github access secret token for the Gitment
```

其中lazy的含义，是否懒加载相应评论框，如果为true，文章底部评论是收起状态，提示显示 Gitment 评论按钮，单击展开评论框。

### 添加LiveRe评论

注册[LiveRe][10]

打开主题配置文件 `_config.yml` 添加：

```bash
# Support for LiveRe comments system.
# You can get your uid from https://livere.com/insight/myCode (General web site)
livere_uid: your uid
```

### 添加 Hypercomments 超级评论

注册[Hypercomments][13]

打开主题配置文件 `_config.yml` 添加：

```bash
# Hypercomments
#hypercomments_id: your id
```



valine 评论系统





## Google 分析

注册[google_analytics][11]

编辑主题配置文件 `_config.yml` ， 修改字段 google_analytics， 值设置成你的 Google 跟踪 ID。跟踪 ID 通常是以 UA- 开头。

## 修改文章内链接文本样式

修改文件 `themes\next\source\css\_common\components\post\post.styl` ，在末尾添加如下css样式，：

```css
// 文章内链接文本样式
.post-body p a{
  color: #0593d3;
  border-bottom: none;
  border-bottom: 1px solid #0593d3;
  &:hover {
    color: #fc6423;
    border-bottom: none;
    border-bottom: 1px solid #fc6423;
  }
}
```

## 修改文章底部的那个带#号的标签

修改模板 `/themes/next/layout/_macro/post.swig` ，搜索 `rel="tag">#` ，将 `#` 换成 `<i class="fa fa-tag"></i>`

## 在每篇文章末尾统一添加"本文结束"标记

在路径 `\themes\next\layout\_macro` 中新建 `passage-end-tag.swig` 文件,并添加以下内容：

```html
div>
    {% if not is_index %}
        <div style="text-align:center;color: #ccc;font-size:14px;">-------------本文结束-------------</div>
    {% endif %}
</div>
```

接着打开 `\themes\next\layout\_macro\post.swig` 文件，在 `post-body` 之后， `post-footer` 之前添加如下代码：

```html
<div>
  {% if not is_index %}
    {% include 'passage-end-tag.swig' %}
  {% endif %}
</div>
```

然后打开主题配置文件 `_config.yml` ,在末尾添加：

```yml
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```

## 添加分享

```bash
cd themes/next
git submodule add https://github.com/theme-next/theme-next-needmoreshare2 source/lib/needsharebutton
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

## 自定义代码块样式

打开 `\themes\next\source\css\_custom\custom.styl` ，加入：

```css
code {
    color: #ff7600;
    background: #fbf7f8;
    margin: 2px;
}
// 大代码块的自定义样式
.highlight, pre {
    margin: 5px 0;
    padding: 5px;
    border-radius: 3px;
}
```

## 添加 README.md 文件

在 Hexo 目录下的 source 根目录下添加一个 README.md 文件，修改站点配置文件 `_config.yml` ，将 `skip_render` 参数的值设置为： `skip_render: README.md` ，保存退出即可。 skip_render参数设置的路径是相对于source目录的路径。 再次使用 hexo d 命令部署博客的时候就不会在渲染 README.md 这个文件了。

```yml
# 路径是相对source目录的
# 不对文件进行渲染，保持文件原有内容
skip_render:
  - "*.html"
  - "demo/**" //排除demo整个目录
```

## 添加顶部加载条

```bash
cd themes/next
git submodule add https://github.com/theme-next/theme-next-pace source/lib/pace
```

修改主题配置文件 `_config.yml` 将pace: false 改为 pace: true

要改变颜色可以在 `/themes/next/layout/_partials/head/custom-head.swig` 文件中添加如下代码

```css
<style>
    .pace .pace-progress {
        background: #1E92FB; /*进度条颜色*/
        height: 3px;
    }
    .pace .pace-progress-inner {
         box-shadow: 0 0 10px #1E92FB, 0 0 5px     #1E92FB; /*阴影颜色*/
    }
    .pace .pace-activity {
        border-top-color: #1E92FB;    /*上边框颜色*/
        border-left-color: #1E92FB;    /*左边框颜色*/
    }
</style>
```

## 文章加密访问

打开 `/themes/next/layout/_partials/head/custom-head.swig` 文件,插入如下代码：

```javascript
<script>
    (function(){
        if('{{ page.password }}'){
            if (prompt('请输入文章密码') !== '{{ page.password }}'){
                alert('密码错误！');
                history.back();
            }
        }
    })();
</script>
```

在文章上添加：

```yml
---
password:
---
```

## 主题更新

命令：

```bash
cd themes/next
git pull
```

推荐你使用 [Hexo 数据文件][7]特性进行主题配置

> 目前，通过 pull 或下载新的 release 版本来更新 NexT 主题的体验并不平滑。当用户使用 git pull 更新 NexT 主题时经常需要解决冲突问题，而在手动下载 release 版本时也经常需要手动合并配置。

> 现在来说，NexT 推荐用户存储部分配置在站点的 `_config.yml` 中，而另一部分在主题的 `_config.yml` 中。这一方式固然可用，但也有一些缺点：

> - 配置项被分裂为两部分；
> - 用户难以弄清何处存放配置选项。

> 为了解决这一问题，NexT 将利用 Hexo 的数据文件特性。因为数据文件是在 Hexo 3 中被引入，所以你需要更新至 Hexo 3.0 以后的版本来使用这一特性。

> 如果你仍然希望使用 Hexo 2.x，你依旧可以按老的方式进行配置。NexT 仍然兼容 Hexo 2.x（但可能会出现错误）。

> **带来的好处** 使用这一特性，你现在可以将你的全部配置置于同一位置 `(source/_data/next.yml）`，并且不需要修改 `next/_config.yml`。如果在新的 release 中出现了任何新的选项，那么你只需要从 `next/_config.yml` 中将他们复制到 `source/_data/next.yml` 中并设置它们的值为你想要的选项。

> **如何使用这一特性** 请确认你的 Hexo 版本为 3.0 或更高。 在你站点的 `hexo/source/_data` 目录创建一个 `next.yml` 文件（如果 `_data` 目录不存在，请创建之）。 复制你站点的 `_config.yml` 和主题的 `_config.yml` 中的 NexT 配置项到 `hexo/source/_data/next.yml` 中。 使用 `--config source/_data/next.yml` 参数来启动服务器，生成或部署。 例如：`hexo clean --config source/_data/next.yml` && `hexo g --config source/_data/next.yml` 。

### 从 NexT v5.1.x 更新

<https://github.com/theme-next/hexo-theme-next/blob/master/docs/cn/UPDATE-FROM-5.1.X.md>

[1]: https://nodejs.org/
[10]: https://livere.com/
[11]: https://analytics.google.com/
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