---
title: mcx我写的这组件...屎山吧
pubDate: '2026-04-05T11:02:54.511Z'
description: mcx是我写的mcbe addon DSL，而目前在写组件...
---

### 前情提要

mcx是我写的一个有着完整Tokenizr，Parser，transform的mcbe addon DSL，[相关的github](https://mbler-docs.ruanhor.dpdns.org/other/github.html)

### 吐槽的组件

由于这个mcbe的各个组件JSON过于庞大，使用AI辅助，然后发现，写完验证后，EntityComponent来到了将近6000行（甚至组件写了一半不到啊），ItemComponent将近 4000 行（还行写完了），因此，这mcx-component的代码行数比我主编译器还多是啥阴啊！（主编译器依赖babel，行数只有2000行）  
![entity line](/assets/mcx-component-entity-show-line.png)
![item line](/assets/mcx-component-item-show-line.png)

### 为什么不能精简

因为这么多行全是精华，基本都是验证参数啥的，精简起来很麻烦

###
