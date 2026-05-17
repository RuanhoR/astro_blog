---
title: 论免费的AI API的优势与否
published: 2026-05-17
description: '在搭qqbot, 自动i18n，ai agent中，一个合格的ai api能让人工作效率翻倍，那么什么是好的免费 ai api呢'
tags: ['AI', 'Free']
category: AI
draft: false
lang: zh
---

# 公开无账号低质量

比如说 [XXAPI](https://xxapi.cn/doc/turing) 提供的简易免费无需账号的ai api，这个称不上智能，有时候一些小场景能用上（比如说主页动态宣传标语）

# 需账号能初步使用

## [Cloudflare](https://dash.cloudflare.com)

由大善人Cloudflare提供的Worker ai有着完善的Openai兼容api，甚至能用gpt5.5！这里分享别人的介绍视频：[前往](https://www.bilibili.com/video/BV1RjQABfEHu/?share_source=copy_web&vd_source=a9edff187d0d96e7fe4ef0cc0a9f8d5c)  
按照神经元计量，大概将近百万token每天，不多也不少，适合做翻译、聊天吧，写代码就显少了。

## [Opencode](https://sopencode.ai)

Opencode有deepseek v4 fresh free, minimax m2.5 free之类的，写代码用用还可以

## [Codex](https://chatgpt.com/codex)

Codex有免费额度，但是封号/掉plus/手机号验证，如果没有境外支付方式、境外物理手机号的不建议尝试

## [阿里百炼](https://www.aliyun.com/benefit/scene/codingplan)

阿里百炼额度还是可以的，免费版一个月2000万Token大约，只不过life掉了

## [Ollama 云模型](https://ollama.com)

Ollama注册需要手机号，不过国内的就行，速度不错

## [BigModel.cn](bigmodel.cn)

嗯...之前听说注册送2000万token，没试过

## [OpenRouter](https://openrouter.ai/)

OpenRouter挺有名的，免费模型也挺多的。

# 其他路径

## 本地跑

如果没高性能设备，自己克隆llama.cpp，构建，跑千问小参数模型就行，有的话下载[Ollama](https://ollama.ai)，跑gemma4，性能不错。

## 去爬web api

一些应用会有web聊天，用开发者工具去查api，去本地使用，不建议
