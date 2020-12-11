---
title: 世纪互联 onedrive
tags: []
id: '1572'
categories:
  - - uncategorized
---

office 世纪互联账号

登录页面 [https://portal.partner.microsoftonline.cn/](https://portal.partner.microsoftonline.cn/)

474754962@qq.com 19955765501

全局管理员账号

显示名称: 张三 用户名:ccc@wqdy.partner.onmschina.cn 密码: wqdy1234, Office 365 教育版（教职员工）

显示名称: wangwu 用户名:wangwu@wqdy.partner.onmschina.cn 密码: wqdy1234, Office 365 教育版（教职员工）

### 设置5t

下载sharepoint online 的模块：[https://www.microsoft.com/zh-cn/download/details.aspx?id=35588](https://www.microsoft.com/zh-cn/download/details.aspx?id=35588)

安装完后后，打开PowerShell操作:

> 如果你OneDrive的url为https://orgname-my.sharepoint.cn，则你的组织名称为orgname

```bash
# $adminUPN="管理员邮箱"
# $orgName="组织名称"
Connect-SPOService -url https://$orgName-admin.sharepoint.cn -Credential $adminUPN
```

输入命令后，在弹出的界面输入密码

设置默认容量为5T

```bash
Set-SPOTenant -OneDriveStorageQuota 5242880
```

### 设置允许向所有人共享

需要全局管理员账号登录

*   管理 -全部显示-sharepoint-策略-共享-

### 子账号

显示名称: 熊大 用户名:xiongda@wqdy.partner.onmschina.cn 密码: Woc00563 Office 365 教育版（学生）

显示名称: 熊二 用户名:xionger@wqdy.partner.onmschina.cn 密码: Mot54203 Office 365 教育版（学生）

显示名称: 光头强 用户名:guangtouqiang@wqdy.partner.onmschina.cn 密码: Cax86223 Office 365 教育版（学生）

显示名称: 赵六 用户名:zhaoliu@wqdy.partner.onmschina.cn 密码: Cus65030 Office 365 教育版（教职员工）

显示名称: 天明 用户名:tianming@wqdy.partner.onmschina.cn 密码: Sak17413 Office 365 教育版（学生）

显示名称: 卫庄 用户名:weizhuang@wqdy.partner.onmschina.cn 密码: Wob42217 Microsoft 365 教职员工应用版 1t

显示名称: 盖聂 用户名:genie@wqdy.partner.onmschina.cn 密码: Cuw09202 Microsoft 365 教职员工应用版 1t

显示名称: 李四 用户名:lisi@wqdy.partner.onmschina.cn 密码: Dul29417 Office 365 教育版（教职员工）

[https://wqdy-my.sharepoint.cn/:f:/g/personal/ccc\_wqdy\_partner\_onmschina\_cn/EtVNVusyUI9Ihe7Gf4R6om4BihL7WmFZ9OkYSgVwdfwYMA?e=BdMmP4](https://wqdy-my.sharepoint.cn/:f:/g/personal/ccc_wqdy_partner_onmschina_cn/EtVNVusyUI9Ihe7Gf4R6om4BihL7WmFZ9OkYSgVwdfwYMA?e=BdMmP4)

[https://wqdy-my.sharepoint.cn/:f:/g/personal/ccc\_wqdy\_partner\_onmschina\_cn/Esg2zebv3e5Hp6NRP9ilrAkBIZo7CDg479FA86RBJ9pGWA?e=gJQMHx](https://wqdy-my.sharepoint.cn/:f:/g/personal/ccc_wqdy_partner_onmschina_cn/Esg2zebv3e5Hp6NRP9ilrAkBIZo7CDg479FA86RBJ9pGWA?e=gJQMHx)