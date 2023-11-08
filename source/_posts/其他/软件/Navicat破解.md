---
title: Navicat Premium 破解（win&mac）
tags:
  - Navicat
id: 2049
date: 2022-04-05
---

## navicat15版本(win)

官方安装包下载

32位 http://download.navicat.com.cn/download/navicat150_premium_cs_x86.exe
64位 http://download.navicat.com.cn/download/navicat150_premium_cs_x64.exe


百度网盘：https://pan.baidu.com/s/1RR17QvWBlekj2vDLEJzZdg 提取码：wqdy
阿里云盘：
TG：

## navicat16版本(win)

官方安装包下载

32位 https://download.navicat.com.cn/download/navicat160_premium_cs_x86.exe
64位 https://download.navicat.com.cn/download/navicat160_premium_cs_x64.exe

无限试用方法

原理：清除注册表相关信息实现再次试用14天！试用 Navicat Premium 大部分版本

将以下内容保存成 reset.bat 并运行

```bat
@echo off

echo Delete HKEY_CURRENT_USER\Software\PremiumSoft\NavicatPremium\Registration[version and language]
for /f %%i in ('"REG QUERY "HKEY_CURRENT_USER\Software\PremiumSoft\NavicatPremium" /s | findstr /L Registration"') do (
    reg delete %%i /va /f
)
echo.

echo Delete Info folder under HKEY_CURRENT_USER\Software\Classes\CLSID
for /f %%i in ('"REG QUERY "HKEY_CURRENT_USER\Software\Classes\CLSID" /s | findstr /E Info"') do (
    reg delete %%i /va /f
)
echo.

echo Finish

pause
```

参考链接：

https://github.com/malaohu/reset-navicat-premium
https://github.com/Abeautifulsnow/navicat-premium-crack

## navicat15版本(mac)

下载

百度网盘：https://pan.baidu.com/s/1MtlteEcj9AeRrIfgs_hOag 提取码：wqdy
阿里云盘：
TG：
