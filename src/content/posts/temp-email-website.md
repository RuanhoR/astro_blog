---
title: 用CF做临时邮箱!
published: 2026-05-04
description: '众所周知cloudflare有邮件路由、worker、D1等服务，那么结合一下...临时邮箱！'
tags: ['Email', 'Website']
category: 'Website'
draft: false
lang: 'zh'
---

## 地址

[Go](https://wap.ruanhor.dpdns.org)

## 如何使用

先点开上面的链接，然后点击“登录以继续”，登录完点导航栏的“邮箱”，点开后输入完整邮箱，比如“aaa@ruanhor.dpdns.org”，然后点击 "Buy" 就行，后续可以用这个邮箱接收邮件，不支持发邮件。

## 原理

cloudflare的邮件路由会把所有发给你的域名的邮件转发到你的worker，然后你在worker里面写一个脚本，把邮件存到D1，再用API供前端请求。

## 步骤

先到cloudflare，把你的域名开启邮件路由，打开Catch-all规则，行为是发送到Worker，然后创建Worker和D1数据库，在Worker里面把邮件存到D1数据库。然后再写一套前端和API，前端用来显示邮件和点开邮件详情，API用来获取邮件。如果有兴趣可以像我一样加个积分和账号，不然就只是个临时邮箱。另外我这边接的账号系统是我主站点 ruanhor.dpdns.org 的oauth，emmm...对于我来说少些了很多代码好吧。  
然后具体代码是不开源的，感兴趣可以自己写一个，也不难，一天就搞定了。如果在使用这个站点遇到问题，可以发邮件到 root@ruanhor.dpdns.org 提建议。
