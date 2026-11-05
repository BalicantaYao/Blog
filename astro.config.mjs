// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
// The live site is https://balicanta.tw, published at the domain root (Netlify).
// Do not set `base` to `/Blog`: that prefix 404s here, and `/Blog` is
// case-folded to `/blog`, which is the post index rather than the homepage.
// GitHub Pages for this repo is not enabled, so balicantayao.github.io/Blog is not a host.
export default defineConfig({
	site: 'https://balicanta.tw',
	integrations: [mdx(), sitemap()],
});
