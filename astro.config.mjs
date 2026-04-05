// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue"
// https://astro.build/config
export default defineConfig({
	site: 'https://blog.wei.qzz.io',
	integrations: [mdx(), sitemap(), vue()],
});
