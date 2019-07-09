---
title: 【技术贴】vultr 搭建ss服务器
date: 2019-07-09
---



# 购买 VPS 服务器

vultr注册地址：https://www.vultr.com/

注册并邮件激活账号，充值后即可购买服务器。充值方式是paypal（首选）或支付宝，使用paypal有银行卡（包括信用卡）即可。paypal注册地址：https://www.paypal.com

> vultr实际上是折算成小时来计费的，比如服务器是2.5美元1个月，那么每小时收费为 2.5/30/24=0.0035美元 会自动从账号中扣费，只要保证账号有钱即可。如果你部署的服务器实测后速度不理想，或者被封，你可以把它删掉（destroy），重新开服务器，或换个地区的服务器来部署，新开服务器只需要0.01美元。因为新的服务器就是新的ip，所以当ip被墙时这个方法很有用。当ip被墙时，为了保证新开的服务器ip和原先的ip不一样，先开新服务器，开好后再删除旧服务器即可。
计费从你开通服务器开始算的，不管你有没有使用，即使服务器处于关机状态仍然会计费，如果你没有开通服务器就不算。比如你今天早上开通了服务器，但你有事情，晚上才部署，那么这段时间是会计费的。同理，如果你早上删掉服务器，第二天才开通新的服务器，那么这段时间是不会计费的。在账号的Billing选项里可以看到账户余额。

# 开通服务器

## 服务器选择

1. Server Location
2. Server Type
选则centos6！entos7默认的防火墙可能会干扰ssr的正常连接！
3. Server Size
4. Additional Features
开启vps的ipv6 ip，选填项。如果你的电脑系统可以用ipv6，那么可以勾选此项。

利用 `ipip` 这个网站的 实用工具里的ping 来全国性的ping我们的vultr主机

## 获取 vps 系统密码

> 如果你开启了vps的ipv6，那么在后台的settings选项可以找到服务器的ipv6 ip。在部署SSR账号时，你用ipv6 ip就行。记得把电脑系统开启ipv6。

## 删掉服务器


# 部署VPS服务器

* Win：
使用软件 PuTTY
打开软件
Host Name (or IP address) 写你服务器的 IP 地址
Port 默认 22
Connection type 选择SSH
Open

* Mac：
默认有 SSH 命令
ssh root@IP
输入用户名和密码,用户名为root
 login as: root
 root@IP's password:

等到出现root@vurlt~字样，说明登陆成功


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

复制上面的代码到VPS服务器里，按回车键，脚本会自动安装，以后只需要运行 `bash ssr.sh` 这个快捷命令就可以出现下图的界面进行设置。

1. 安装SSR服务端
2. 设置端口和密码
3. 设置的加密方式: aes-256-cfb
4. 选择协议插件: auth_sha1_v4
5. 选择混淆插件 plain

ShadowsocksR MudbJSON模式多用户一键脚本 支持流量限制
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
# 一键加速VPS服务器

【谷歌BBR加速教程】

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
```

把上面整个代码复制后粘贴进去，不动的时候按回车，然后耐心等待，最后重启vps服务器即可。


最后输入y重启服务器

# 常见问题参考解决方法：

1、用了一段时间发现ssr账号用不了了

首先ping一下自己的ip，看看能不能ping的通，ping不通那么就是ip被墙了，ip被墙时，xshell也会连接不上服务器，遇到这种情况重新部署一个新的服务器，新的服务器就是新的ip。关于怎么ping ip的方法，可以自行网上搜索，或者用xshell软件连接服务器来判断，连不上即是被墙了。vultr开通和删除服务器非常方便，新服务器即新ip，大多数vps服务商都没有这样的服务，一般的vps服务商可能会提供免费更换1次ip的服务。

2、刚搭建好的ssr账号，ip能ping通，但是还是用不了

首选排除杀毒软件的干扰，尤其是国产杀毒软件，比如360安全卫生、360杀毒软件、腾讯管家、金山卫生等。这些东西很容易干扰翻墙上网，如果你的电脑安装了这样的东西，建议至少翻墙时别用，最好卸载。其次，检查下SSR信息是否填写正确。浏览器的代理方式是否是ssr代理，即（HTTP）127.0.0.1 和1080。如果以上条件都排除，还是用不了，那么可以更换端口、加密方式、协议、混淆，或者更换服务器位置。另外，如果你的vps服务器配置的是SSR账号，即有协议和混淆且没有兼容原版(SS版），那么你必须使用SSSR客户端来使用账号，因为SS客户端没有填写协议和混淆的选项。

3、有的地区需要把混淆参数设置成plain才好用。因为混淆不总是有效果，要看各地区的策略，有时候不混淆（plain）让其看起来像随机数据更好。

4、电脑能用但手机用不了

如果你的手机用的是SS客户端，SS客户端没有填协议和混淆的地方，如果你部署的协议和混淆的时候没有选择兼容原版（SS版），因此手机是用不了的。这个时候你把协议弄成兼容原版、混淆也设置成兼容原版即可。或者直接将协议设置成origin且混淆设置成plain。

5、vps的服务器操作系统不要用的太高，太高可能会因为系统的防火墙问题导致搭建的SSR账号连不上，如果你用的centos系统，建议用centos6，不要用centos7。如果你前面不小心装了centos7系统，那么只能重装系统或者重新部署新的vps服务器。

6、vultr服务商提供的vps服务器是单向流量计算，有的vps服务商是双向流量计算，单向流量计算对于用户来说更实惠。因为我们是在vps服务器上部署SSR服务端后，再用SSR客户端翻墙，所以SSR服务端就相当于中转，比如我们看一个视频，必然会产生流量，假如消耗流量80M，那么VPS服务器会产生上传80M和下载80M流量，vultr服务商只计算单向的80M流量。如果是双向计算流量，那么会计算为160M流量。

7、如果你想把搭建的账号给多人使用，不用额外设置端口，因为一个账号就可以多人使用。一般5美元的服务器可以同时支持40人在线使用。

如果想实现支持每个用户(端口)不同的加密方式/协议/混淆等，并且管理流量使用，可以参考多用户配置脚本：wget -N --no-check-certificate https://softs.fun/Bash/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh 备用脚本：wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh 安装后管理命令为：bash ssrmu.sh
注意：这个多用户配置脚本和教程内容的脚本无法共存！要想用这个脚本，把之前的脚本卸载，输入管理命令bash ssr.sh ，选择3，卸载ShadowsocksR即可卸载原脚本。

8、vultr服务器每月有流量限制，超过限制后服务器不会被停止运行，但是超出的流量会被额外收费。北美和西欧地区的服务器超出流量后，多出的部分收费为0.01美元/G。新加坡和日本东京（日本）为0.025美元/G，悉尼（澳大利亚）为0.05美元/G。把vultr服务器删掉，开通新的服务器，流量会从0开始重新计算。

9、vultr怎样才能申请退款呢？

vultr和其他的国外商家一样，都是使用工单的形式与客服联系，如果需要退款，直接在后台点击support，选择open ticket新开一个工单，选择billing question财务问题，简单的在文本框输入你的退款理由。比如：Please refund all the balance in my account。工单提交以后一般很快就可以给你确认退款，若干个工作日后就会退回你的支付方式。（全额退款结束后，账号可能会被删除）

如果英语水平不好，但是想和客服进行交流，可以用百度在线翻译，自动中文转英文和英文转中文。

10、路由器也可以配置ss/ssr账号，详见openwrt-ssr项目地址：https://github.com/ywb94/openwrt-ssr

11、如果电脑想用搭建的ss/ssr账号玩游戏，即实现类似VPN全局代理，可以用SSTAP，教程：https://www.jianshu.com/p/519e68b74646


# 客户端下载



IPV6地址：
https://raw.githubusercontent.com/lennylxx/ipv6-hosts/master/hosts


[测速](https://www.vultr.com/faq/#speedtest_v4)