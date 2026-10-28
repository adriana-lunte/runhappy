<!--
	ScoreRow — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (report summary, 2026-10-28).

	One category in the report summary: name, "15/23" and a small ScoreRing. A link that jumps to the category.
	Hover: ui/surface/surface-150. Poor scores are written in ui/status/destructive-foreground.
	Without a score (not graded), it shows a note instead, e.g. "Not running yet, so not graded".
-->
<script lang="ts" module>
	export interface ScoreRowProps {
		/** Category name, e.g. "Party booking". */
		name: string;
		/** Where the row jumps to, e.g. "#booking". */
		href: string;
		/** Points. Leave empty for a category that is not graded. */
		score?: { earned: number; possible: number };
		/** Shown under the name when there is no score. */
		note?: string;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { TrendUpIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';
	import { ScoreRing } from '#components/ScoreRing';
	import { scoreTone } from '#lib/report/score.ts';

	let { name, href, score, note, class: className }: ScoreRowProps = $props();

	const poor = $derived(score ? scoreTone(score) === 'poor' : false);
</script>

<!-- In-page anchor: no navigation to resolve. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	class={[
		'-mx-8 flex items-center justify-between gap-12 rounded-xs px-8 py-6 focus-ring',
		'transition-colors duration-150 hover:bg-ui-surface-surface-150 motion-reduce:transition-none',
		className
	]}
>
	<span class="flex min-w-0 flex-col">
		<span class="type-ui-body-2-regular text-ui-base-foreground">{name}</span>
		{#if !score && note}
			<span class="type-ui-body-4-regular text-brand-text-secondary">{note}</span>
		{/if}
	</span>
	{#if score}
		<span class="flex items-center gap-12">
			<span
				class={[
					'type-ui-body-2-semibold tabular-nums',
					poor ? 'text-ui-status-destructive-foreground' : 'text-ui-base-foreground'
				]}
			>
				{score.earned}/{score.possible}
			</span>
			<ScoreRing earned={score.earned} possible={score.possible} />
		</span>
	{:else}
		<Icon icon={TrendUpIcon} class="size-20 text-ui-base-foreground" />
	{/if}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
