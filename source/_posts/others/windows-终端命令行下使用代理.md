---
title: windows 终端命令行下使用代理
tags: []
id: '1404'
categories:
  - - 教程
date: 2020-05-16 12:13:13
---

20200822更新：只要启用了代理软件，或系统设置（windows设置-网络和Internet-代理-手动设置代理）中配置了代理，powershell 就会走代理，不在需要上面的方式设置，实际上上面的这个脚本也是在系统设置中配置了代理，因为我发现运行上面的脚本，我的系统代理中就多了如下代理

![](https://wqdy.top/wp-content/uploads/2020/08/2020-08-16-13-09-36.png)


前提：在本地代理软件已经打开，并且开启了 http 代理（假设端口1080）

注意
* 一定要加 `http://`，直接写域名或者 IP 不行
* http 和 https 都要设置
* cmd，Bash，PowerShell 设置的方式不同

cmd 中用 `set http_proxy` 设置

```bash
# set http_proxy=http://IP:PORT
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080

# 如果有用户名密码需要设置，否则不需要设置
set http_proxy_user=user
set http_proxy_pass=pass

set https_proxy_user=user
set https_proxy_pass=pass

# 恢复
set http_proxy=
set https_proxy=
```

Bash 中用 `export http_proxy` 设置

```
# Ubuntu 下命令为 export
export http_proxy=http://127.0.0.1:1080
```

PowerShell 中按照这样设置:
创建 powershell-proxy-set-clear.ps1 文件，内容如下，并执行

```psl
# NOTE: registry keys for IE 8, may vary for other versions
$regPath = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings'
function Clear-Proxy
{
    Set-ItemProperty -Path $regPath -Name ProxyEnable -Value 0
    Set-ItemProperty -Path $regPath -Name ProxyServer -Value ''
    Set-ItemProperty -Path $regPath -Name ProxyOverride -Value ''

    [Environment]::SetEnvironmentVariable('http_proxy', $null, 'User')
    [Environment]::SetEnvironmentVariable('https_proxy', $null, 'User')
}
function Set-Proxy
{
	# 这里改为你的代理地址
    $proxy = 'http://127.0.0.1:1080'

    Set-ItemProperty -Path $regPath -Name ProxyEnable -Value 1
    Set-ItemProperty -Path $regPath -Name ProxyServer -Value $proxy
    Set-ItemProperty -Path $regPath -Name ProxyOverride -Value '<local>'

    [Environment]::SetEnvironmentVariable('http_proxy', $proxy, 'User')
    [Environment]::SetEnvironmentVariable('https_proxy', $proxy, 'User')
}

# Set-Proxy # 设置，取消该行注释
# Clear-Proxy # 清除，取消该行注释
```


* 如果想验证是否成功配置了代理的话，用 ping 命令是不可以的（ping的协议不是https，也不是https，是ICMP协议）

* 设置的代理只在当前 cmd 窗口下有效，窗口关闭后会失效，新建的窗口也不生效

验证方式

`curl -vv http://www.google.com`，用这条命令来验证，如果返回如下结果表示代理设置成功。

![](https://wqdy.top/wp-content/uploads/2020/05/20-05-16_11-51-47.png)

参考链接

https://github.com/shadowsocks/shadowsocks-windows/issues/1489
https://gist.github.com/famousgarkin/c5138b1e13ac41920d22

