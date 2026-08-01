---
title: TS 版 MCBE Brarchive 工具！
published: 2026-08-01
description: 最近mcbe更新了brarchive，行为包/资源包未来都要发布时打包，合手的工具能大大提升开发效率
tags: ['MCX', 'MCBE', 'Typescript']
category: MCBE
draft: false
lang: zh
---

# TS Brarchive

[NPM 地址](https://npmjs.com/package/mcbe-brarchive-ts) | [Github](https://github.com/RuanhoR/mcbe-brachirve-ts) | [格式参考](https://gist.github.com/tryashtar/4e62280c1611d744b6aa5d752ab69c15) | [代码参考](https://github.com/xKingDark/xKingDark-brachive)

brarchive文件夹是放在\_\_brarchive的，用作聚合中小文件，格式呢不算过于复杂，甚至没有压缩和加密，做起来不算难

## 有了这又能做什么呢

首先，集合到了我的工具链（ [Github](https://github.com/RuanhoR/mbler.git) ），可以通过参数开启使用brarchive进行生成。

## 如何使用

```bash
npx mcbe-brarchive-ts --help
```

如上，即可使用cli模式。

```javascript
import * as brarhive from 'mcbe-brarchive-ts'
```

如上，即可使用库模式（带.d.ts）
