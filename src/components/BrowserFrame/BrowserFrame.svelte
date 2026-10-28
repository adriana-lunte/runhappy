<!--
	BrowserFrame — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (checking screen, 2026-10-28).

	A simple browser window around a screenshot or a placeholder: three dots and an address bar on top.
	Frame ui/surface/surface-150, address bar ui/surface/surface-100, radius sm, overlay shadow (it floats).
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface BrowserFrameProps {
		/** Address shown in the bar, e.g. "yourvenue.com". */
		address: string;
		/** What is inside the window (a screenshot, or a status text while loading). */
		children: Snippet;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	let { address, children, class: className }: BrowserFrameProps = $props();
</script>

<figure
	class={[
		'flex flex-col overflow-hidden rounded-sm bg-ui-surface-surface-150 shadow-overlay',
		className
	]}
>
	<div class="flex items-center gap-12 px-12 py-8" aria-hidden="true">
		<span class="flex gap-4">
			<span class="size-8 rounded-full bg-brand-neutral-warm-gray-mid"></span>
			<span class="size-8 rounded-full bg-brand-neutral-warm-gray-mid"></span>
			<span class="size-8 rounded-full bg-brand-neutral-warm-gray-mid"></span>
		</span>
		<span
			class="min-w-0 flex-1 truncate rounded-full bg-ui-surface-surface-100 px-12 py-2 type-ui-body-4-regular text-ui-base-foreground"
		>
			{address}
		</span>
	</div>
	<div class="grid min-h-0 flex-1 place-items-center">{@render children()}</div>
	<figcaption class="sr-only">{address}</figcaption>
</figure>
