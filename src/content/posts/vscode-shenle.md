---
title: Vscode 扩展开发神了
published: 2026-05-16
description: '当给mcx做lsp,vscode插件时，方才觉得vscode插件是真有大坑'
tags: ['vscode', 'MCX', 'Typescript']
category: 'MCX'
draft: false
lang: zh
---

# 论开发VSCODE插件有多少坑

1. 依赖打包与多包管理问题

刚新建vscode插件，lsp时，先写了volar插件（github: RuanhoR/mcx-language-server），但是到写vscode插件时却频频出错。

这个问题就很神。用PNPM worspace管理依赖吧，然后打包的vsce给我扫到../../.git去，.vscodeignore写了也无济于事。

后面便不放在workspace，然后继续vsce package，给我报无效的依赖，一看，vsce会先用npm扫一遍依赖，然后npm不兼容pnpm的link...

2. LSP 客户端启动服务器端时文件指向问题

在vscode中依赖是处理很麻烦的，而lsp的一些东西，比如volar language server，去启动容易直接找不到模块。

3. 高亮

vscode的高亮不算好写，一堆json，很地狱。

4. 体积

本想做小一点的，然后一包含依赖： 40MB。vscode就不能自带个pnpm吗，让我们把依赖也上传到市场，怕存储够用是不？

# 那么结果？

在十分良好地写好volar插件等之后，发布vscode market也就是市场有个谷歌那个人机验证，很麻烦，其他还好。

# 总结

写大型vscode插件，完全是前人栽树后人乘凉的，前人麻烦，后人凉快。
