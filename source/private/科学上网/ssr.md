---
title: 【技术贴】vultr 搭建ss服务器
updated: 2019-07-09
---

# 购买 VPS 服务器

vultr 注册地址：https://www.vultr.com/

注册并邮件激活账号，充值后即可购买服务器。充值方式是 paypal（首选）或支付宝，使用 paypal 有银行卡（包括信用卡）即可。paypal 注册地址：https://www.paypal.com

> vultr 实际上是折算成小时来计费的，比如服务器是 2.5 美元 1 个月，那么每小时收费为 2.5/30/24=0.0035 美元 会自动从账号中扣费，只要保证账号有钱即可。如果你部署的服务器实测后速度不理想，或者被封，你可以把它删掉（destroy），重新开服务器，或换个地区的服务器来部署，新开服务器只需要 0.01 美元。因为新的服务器就是新的 ip，所以当 ip 被墙时这个方法很有用。当 ip 被墙时，为了保证新开的服务器 ip 和原先的 ip 不一样，先开新服务器，开好后再删除旧服务器即可。
> 计费从你开通服务器开始算的，不管你有没有使用，即使服务器处于关机状态仍然会计费，如果你没有开通服务器就不算。比如你今天早上开通了服务器，但你有事情，晚上才部署，那么这段时间是会计费的。同理，如果你早上删掉服务器，第二天才开通新的服务器，那么这段时间是不会计费的。在账号的 Billing 选项里可以看到账户余额。

# 开通服务器

## 服务器选择

1. Server Location
2. Server Type
   选则 centos6！entos7 默认的防火墙可能会干扰 ssr 的正常连接！
3. Server Size
4. Additional Features
   开启 vps 的 ipv6 ip，选填项。如果你的电脑系统可以用 ipv6，那么可以勾选此项。

利用 `ipip` 这个网站的 实用工具里的 ping 来全国性的 ping 我们的 vultr 主机

## 获取 vps 系统密码

> 如果你开启了 vps 的 ipv6，那么在后台的 settings 选项可以找到服务器的 ipv6 ip。在部署 SSR 账号时，你用 ipv6 ip 就行。记得把电脑系统开启 ipv6。

## 删掉服务器

# 部署 VPS 服务器

**Win：**
使用软件 PuTTY
打开软件
Host Name (or IP address) 写你服务器的 IP 地址
Port 默认 22
Connection type 选择 SSH
Open

**Mac：**
默认有 SSH 命令
ssh root@IP
输入用户名和密码,用户名为 root
login as: root
root@IP's password:

等到出现 root@vurlt~ 字样，说明登陆成功

CentOS/Debian/Ubuntu ShadowsocksR 单/多端口 一键管理脚本
https://doub.io/ss-jc42/

```bash
yum -y install wget

wget -N --no-check-certificate https://softs.fun/Bash/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

备用脚本：

```bash
yum -y install wget

wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

复制上面的代码到 VPS 服务器里，按回车键，脚本会自动安装，以后只需要运行 `bash ssr.sh` 这个快捷命令就可以出现下图的界面进行设置。

1. 安装 SSR 服务端
2. 设置端口和密码
3. 设置的加密方式: aes-256-cfb
4. 选择协议插件: auth_sha1_v4
5. 选择混淆插件 plain

ShadowsocksR MudbJSON 模式多用户一键脚本 支持流量限制
https://doub.io/ss-jc60/

```bash
wget -N --no-check-certificate https://softs.fun/Bash/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh
```

备用下载地址

```bash
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh
```

```bash
bash ssrmu.sh
```

#测速脚本官方地址

```bash
wget https://raw.githubusercontent.com/oooldking/script/master/superbench.sh
chmod +x superbench.sh
./superbench.sh
```

# 加速

[锐速/BBR/魔改 BBR/KCPTUN 加速效果对比测试](https://ssr.tools/674)

【原版 BBR】

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh

# 重启服务器

# 验证是否安装成功
sysctl net.ipv4.tcp_congestion_control
# 得到如下结果表示安装成功
net.ipv4.tcp_congestion_control = bbr
```

【魔改 BBR】

只有 centos 和 debain 版

```bash
# centos 版
wget --no-check-certificate https://raw.githubusercontent.com/tcp-nanqinlang/general/master/General/CentOS/bash/tcp_nanqinlang-1.3.2.sh
bash tcp_nanqinlang-1.3.2.sh

# debain 版
wget --no-check-certificate https://github.com/tcp-nanqinlang/general/releases/download/3.4.2.1/tcp_nanqinlang-fool-1.3.0.sh
bash tcp_nanqinlang-fool-1.3.0.sh

# 选择 1 安装内核，重启

# 运行 选择 2 安装并开启算法
bash tcp_nanqinlang-1.3.2.sh
# 选择 2 安装并开启算法
```

# 常见问题参考解决方法：

1、用了一段时间发现 ssr 账号用不了了

首先 ping 一下自己的 ip，看看能不能 ping 的通，ping 不通那么就是 ip 被墙了，ip 被墙时，xshell 也会连接不上服务器，遇到这种情况重新部署一个新的服务器，新的服务器就是新的 ip。关于怎么 ping ip 的方法，可以自行网上搜索，或者用 xshell 软件连接服务器来判断，连不上即是被墙了。vultr 开通和删除服务器非常方便，新服务器即新 ip，大多数 vps 服务商都没有这样的服务，一般的 vps 服务商可能会提供免费更换 1 次 ip 的服务。

2、刚搭建好的 ssr 账号，ip 能 ping 通，但是还是用不了

首选排除杀毒软件的干扰，尤其是国产杀毒软件，比如 360 安全卫生、360 杀毒软件、腾讯管家、金山卫生等。这些东西很容易干扰翻墙上网，如果你的电脑安装了这样的东西，建议至少翻墙时别用，最好卸载。其次，检查下 SSR 信息是否填写正确。浏览器的代理方式是否是 ssr 代理，即（HTTP）127.0.0.1 和 1080。如果以上条件都排除，还是用不了，那么可以更换端口、加密方式、协议、混淆，或者更换服务器位置。另外，如果你的 vps 服务器配置的是 SSR 账号，即有协议和混淆且没有兼容原版(SS 版），那么你必须使用 SSSR 客户端来使用账号，因为 SS 客户端没有填写协议和混淆的选项。

3、有的地区需要把混淆参数设置成 plain 才好用。因为混淆不总是有效果，要看各地区的策略，有时候不混淆（plain）让其看起来像随机数据更好。

4、电脑能用但手机用不了

如果你的手机用的是 SS 客户端，SS 客户端没有填协议和混淆的地方，如果你部署的协议和混淆的时候没有选择兼容原版（SS 版），因此手机是用不了的。这个时候你把协议弄成兼容原版、混淆也设置成兼容原版即可。或者直接将协议设置成 origin 且混淆设置成 plain。

5、vps 的服务器操作系统不要用的太高，太高可能会因为系统的防火墙问题导致搭建的 SSR 账号连不上，如果你用的 centos 系统，建议用 centos6，不要用 centos7。如果你前面不小心装了 centos7 系统，那么只能重装系统或者重新部署新的 vps 服务器。

6、vultr 服务商提供的 vps 服务器是单向流量计算，有的 vps 服务商是双向流量计算，单向流量计算对于用户来说更实惠。因为我们是在 vps 服务器上部署 SSR 服务端后，再用 SSR 客户端翻墙，所以 SSR 服务端就相当于中转，比如我们看一个视频，必然会产生流量，假如消耗流量 80M，那么 VPS 服务器会产生上传 80M 和下载 80M 流量，vultr 服务商只计算单向的 80M 流量。如果是双向计算流量，那么会计算为 160M 流量。

7、如果你想把搭建的账号给多人使用，不用额外设置端口，因为一个账号就可以多人使用。一般 5 美元的服务器可以同时支持 40 人在线使用。

如果想实现支持每个用户(端口)不同的加密方式/协议/混淆等，并且管理流量使用，可以参考多用户配置脚本：wget -N --no-check-certificate https://softs.fun/Bash/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh 备用脚本：wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh 安装后管理命令为：bash ssrmu.sh
注意：这个多用户配置脚本和教程内容的脚本无法共存！要想用这个脚本，把之前的脚本卸载，输入管理命令 bash ssr.sh ，选择 3，卸载 ShadowsocksR 即可卸载原脚本。

8、vultr 服务器每月有流量限制，超过限制后服务器不会被停止运行，但是超出的流量会被额外收费。北美和西欧地区的服务器超出流量后，多出的部分收费为 0.01 美元/G。新加坡和日本东京（日本）为 0.025 美元/G，悉尼（澳大利亚）为 0.05 美元/G。把 vultr 服务器删掉，开通新的服务器，流量会从 0 开始重新计算。

9、vultr 怎样才能申请退款呢？

vultr 和其他的国外商家一样，都是使用工单的形式与客服联系，如果需要退款，直接在后台点击 support，选择 open ticket 新开一个工单，选择 billing question 财务问题，简单的在文本框输入你的退款理由。比如：Please refund all the balance in my account。工单提交以后一般很快就可以给你确认退款，若干个工作日后就会退回你的支付方式。（全额退款结束后，账号可能会被删除）

如果英语水平不好，但是想和客服进行交流，可以用百度在线翻译，自动中文转英文和英文转中文。

10、路由器也可以配置 ss/ssr 账号，详见 openwrt-ssr 项目地址：https://github.com/ywb94/openwrt-ssr

11、如果电脑想用搭建的 ss/ssr 账号玩游戏，即实现类似 VPN 全局代理，可以用 SSTAP，教程：https://www.jianshu.com/p/519e68b74646

# 客户端下载

IPV6 地址：
https://raw.githubusercontent.com/lennylxx/ipv6-hosts/master/hosts

[测速](https://www.vultr.com/faq/#speedtest_v4)
