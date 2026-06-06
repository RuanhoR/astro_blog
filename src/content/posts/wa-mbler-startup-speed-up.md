---
title: Mbler 速度提升 -- 如何达到
published: 2026-06-06
description: '旧的mbler在老旧设备上启动高达3秒，如何优化启动时间呢'
tags: ['MCX']
category: MCX
draft: false
lang: zh
---

首先，我们要查清楚什么东西影响了启动时间，那么，我们可以通过在启动bin文件上通过代理全局require来实现记录哪个模块才是时间消耗的元凶。  
类似这样

```javascript
const Module = require('module')
const originalRequire = Module.prototype.require

Module.prototype.require = function (id) {
  console.time('Loading module: ' + id)
  const result = originalRequire.call(this, id)
  console.timeEnd('Loading module: ' + id)
  return result
}
```

这样，就可以记录模块加载耗时了，最大耗时竟是模块 'npm-registry-fetch' 。  
然后，怎么优化呢？把用到这个模块的地方包装成一个Proxy，用到的时候再去加载这个模块。  
比如说
![Demo Proxy](/assets/images/175618f5-3d1c-4bef-bd1c-efa1d12939b9.png)
这样子，在低性能设备上的启动时间也能优化到几百毫秒了
