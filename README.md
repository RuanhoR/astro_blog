# Ruanhor Blog

个人技术博客，基于 [Astro](https://astro.build) + [Fuwari](https://github.com/saicaca/fuwari) 主题构建。

## 功能

- 文章发布与归档
- 标签与分类
- 亮色 / 暗色模式
- 全文搜索
- RSS 订阅
- 绘图工具
- 友链板块

## 本地开发

```sh
pnpm install
pnpm dev
```

访问 `http://localhost:4321`。

## 写文章

```sh
pnpm new-post <filename>
```

编辑 `src/content/posts/` 下生成的文件，frontmatter 格式：

```yaml
---
title: 文章标题
published: 2025-01-01
description: 文章描述
image: ./cover.jpg
tags: [标签]
category: 分类
---
```

## 部署

```sh
pnpm build
```

产物在 `dist/` 目录，可部署到 Vercel、Netlify、GitHub Pages 等。

## 常用命令

| 命令 | 说明 |
|:--|:--|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm check` | 类型检查 |
| `pnpm new-post <name>` | 新建文章 |

## License

MIT
