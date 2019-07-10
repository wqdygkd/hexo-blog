## Travis

### .travis.yml 配置



## 部署到远程服务器

### 加密登录

首先通过 Ruby 的 gem 安装 travis

```
yum install ruby # 版本低需手动安装
gem install travis
gem update --system
```

RVM方式安装ruby

curl -L get.rvm.io | bash -s stable

source /etc/profile.d/rvm.sh

rvm -v

查看Ruby版本

rvm list known

安装指定版本

rvm install 2.5



更换gem源

 gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
​gem sources -l

确保只有 gems.ruby-china.com

安装 travis

gem install travis

登录 Travis

travis login



travis shell文件

cd /usr/share/nginx/html/doc/
git pull origin master
echo 'travis build done!'



加密私钥:在项目根目录下运行

travis encrypt -r cuilongjin/cuilongjin.github.io GH_Token=XXX --add

```
travis encrypt-file -r cuilongjin/test  ~/.ssh/id_rsa  --add
```



.travis.yml添加 addons 配置：

```
addons:
  ssh_known_hosts: your-ip
```