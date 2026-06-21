# AGENTS.md

## Project Overview

Personal tech blog built with Astro 5 + Fuwari theme, deployed to `https://blog.wei.qzz.io/`.

## Tech Stack

- **Framework**: Astro 5 (SSG) + Svelte 5 (interactive components)
- **Styling**: Tailwind CSS 3 + Stylus (variables)
- **Package Manager**: pnpm (enforced via `only-allow`)
- **Language**: TypeScript (strict)
- **Search**: Pagefind (static)
- **Animations**: Swup
- **Icons**: astro-icon (fa6-brands, fa6-solid, material-symbols)

## Commands

| Command | Description |
|:--|:--|
| `pnpm dev` | Dev server at `localhost:1309` |
| `pnpm build` | Build + Pagefind index |
| `pnpm check` | `astro check` (type + Astro diagnostics) |
| `pnpm type-check` | `tsc --noEmit` |
| `pnpm lint` | Biome lint + format |
| `pnpm format` | Biome format |
| `pnpm new-post <name>` | Create new post in `src/content/posts/` |

## Project Structure

```
src/
├── assets/              # Static assets (images)
├── components/          # Astro + Svelte components
│   ├── drawing/         # Drawing tool (Svelte)
│   ├── control/         # UI controls (BackToTop etc.)
│   ├── misc/            # Markdown, ImageWrapper
│   └── widget/          # Sidebar, TOC, Profile, NavMenuPanel
├── config.ts            # Site config, nav, profile, license
├── constants/           # Constants, icons, link presets
├── content/
│   ├── posts/           # Blog posts (markdown)
│   └── spec/            # Special pages (about, friend-links)
├── i18n/                # Internationalization
│   ├── i18nKey.ts       # All i18n keys
│   ├── translation.ts   # i18n resolver
│   └── languages/       # 10 languages (en, zh_CN, zh_TW, ja, ko, es, th, vi, id, tr)
├── layouts/             # Layout components (MainGridLayout, Layout)
├── pages/               # Route pages
│   ├── tool/            # Tool pages (drawing, index)
│   ├── posts/           # Post pages
│   └── friend_links.astro
├── plugins/             # Markdown/remark/rehype plugins
├── styles/              # Global CSS + Stylus variables
│   └── variables.styl   # Theme CSS variables (light/dark)
├── types/               # TypeScript types
└── utils/               # Utility functions
```

## Path Aliases

Defined in `tsconfig.json`:
- `@components/*` → `src/components/*`
- `@assets/*` → `src/assets/*`
- `@constants/*` → `src/constants/*`
- `@utils/*` → `src/utils/*`
- `@i18n/*` → `src/i18n/*`
- `@/*` → `src/*`

## Conventions

### i18n

- All user-visible text must use `i18n(Key.xxx)` from `src/i18n/translation.ts`
- Keys defined in `src/i18n/i18nKey.ts`
- Translations in `src/i18n/languages/{lang}.ts` — **all 10 files** must have every key
- Fallback: `en` → key name

### Dark Mode

- Theme CSS variables defined in `src/styles/variables.styl` using `define()` mixin
- Each variable has light/dark values: `--var: light-value dark-value`
- **Astro files**: Use Tailwind utilities `text-90`/`text-75`/`text-50`/`text-30` (include `dark:text-white/xx`)
- **Astro files**: Use CSS variables `var(--btn-regular-bg)`, `var(--btn-content)`, `var(--primary)` etc.
- **Svelte components**: Use `var()` references for scoped styles; use `:global(html.dark)` for overrides

### Nav Links

- Preset links: Add to `LinkPreset` enum in `types/config.ts`, add entry in `constants/link-presets.ts`, add to `navBarConfig` in `config.ts`
- Custom links: Add `{ name, url, external? }` directly in `navBarConfig`
- External links open in new tab automatically

### Components

- Astro components: `.astro` files, server-side only
- Svelte components: `.svelte` files, use `client:only` or `client:load` for client-side hydration
- CSS: Scoped styles in components, global in `src/styles/`

### Posts

- Create with `pnpm new-post <filename>`
- Stored in `src/content/posts/`
- Frontmatter: `title`, `published`, `description`, `tags`, `category`, `image`, `draft`

## Known Pre-existing Issues

- `Navbar.astro:58` — `LightDarkSwitch client:load` has a TS error (Svelte component type mismatch)
- `BrushSelector` / `ShapeSelector` — no exported props, use internal state only
