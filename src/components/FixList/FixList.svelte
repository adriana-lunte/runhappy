<!--
	FixList — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com ("11 things to fix", 2026-10-28).

	The failed checks, biggest gain first: a red status icon, the headline and the points the fix would add
	("+7"). Shows the first few; the rest are counted ("And 6 more below") because they are listed further down.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface FixItem {
		/** What is wrong, e.g. "Your page title doesn’t say what you offer". */
		headline: string;
		/** Points the fix would add. */
		gain: number;
	}

	export interface FixListProps {
		/** The fixes, already sorted. */
		items: FixItem[];
		/** How many to show. */
		visible?: number;
		/** Extra content at the bottom, e.g. a "Book a call" link. */
		footer?: Snippet;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { StatusIcon } from '#components/StatusIcon';

	let { items, visible = 5, footer, class: className }: FixListProps = $props();

	const uid = $props.id();
	const shown = $derived(items.slice(0, visible));
	const hidden = $derived(items.length - shown.length);
</script>

<section aria-labelledby={`${uid}-title`} class={['flex flex-col gap-12', className]}>
	<h2 id={`${uid}-title`} class="type-ui-subtitle-2 text-ui-base-foreground">
		{items.length} things to fix
	</h2>
	<ol class="flex flex-col gap-8">
		{#each shown as item (item.headline)}
			<li class="flex items-start gap-12">
				<StatusIcon outcome="fail" class="mt-2 size-20 shrink-0" />
				<span class="min-w-0 flex-1 type-ui-body-2-regular text-ui-base-foreground"
					>{item.headline}</span
				>
				<span class="type-ui-body-3-regular text-brand-text-secondary tabular-nums">
					+{item.gain}<span class="sr-only"> points</span>
				</span>
			</li>
		{/each}
	</ol>
	{#if hidden > 0}
		<p class="type-ui-body-3-regular text-brand-text-secondary">And {hidden} more below</p>
	{/if}
	{#if footer}{@render footer()}{/if}
</section>
