<script lang="ts">
	import '#tokens/index.css';
	import favicon from '#lib/assets/favicon.svg';
	import { watchSystemTheme } from '#lib/theme.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Follow OS light/dark changes while the user hasn't chosen a mode by hand.
	$effect(() => watchSystemTheme());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
