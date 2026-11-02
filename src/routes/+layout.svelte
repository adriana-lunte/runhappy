<script lang="ts">
	import '#tokens/index.css';
	import { page } from '$app/state';
	import favicon from '#lib/assets/favicon.svg';
	import { share } from '#lib/report/config.ts';
	import { watchSystemTheme } from '#lib/theme.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Follow OS light/dark changes while the user hasn't chosen a mode by hand.
	$effect(() => watchSystemTheme());
</script>

<!-- Link previews when the site is shared (Adriana, 2026-11-02). Crawlers need an absolute image URL. -->
<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content={share.description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Runhappy" />
	<meta property="og:title" content={share.title} />
	<meta property="og:description" content={share.description} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={new URL('/og-image.png', page.url.origin).href} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={share.imageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{@render children()}
