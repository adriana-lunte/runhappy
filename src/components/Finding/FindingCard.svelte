<!--
	FindingCard — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (the main finding of a category, 2026-10-28).

	The biggest finding of a category, as a white card: a status badge ("Needs work", "Opportunity"), the points,
	the headline, what is happening, a "What to do" Callout and a "What we saw" disclosure with the evidence.
-->
<script lang="ts" module>
	import type { Finding } from '#lib/schemas/report.ts';

	export interface FindingCardProps {
		/** The finding to show. */
		finding: Finding;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { CaretDownIcon } from 'phosphor-svelte';
	import { Callout } from '#components/Callout';
	import { Icon } from '#components/Icon';
	import { StatusIcon, outcomeLabels } from '#components/StatusIcon';
	import EvidenceList from './EvidenceList.svelte';

	let { finding, class: className }: FindingCardProps = $props();

	const badge = $derived(
		finding.outcome === 'fail'
			? 'bg-ui-status-destructive text-ui-status-destructive-foreground inset-ring-ui-status-destructive-border'
			: 'bg-ui-surface-surface-150 text-ui-base-foreground inset-ring-ui-base-border'
	);
</script>

<article class={['flex flex-col gap-12 rounded-sm bg-ui-surface-surface-100 p-20', className]}>
	<div class="flex items-center justify-between gap-12">
		<span
			class={[
				'inline-flex items-center gap-6 rounded-full px-10 py-2 type-ui-body-4-medium inset-ring',
				badge
			]}
		>
			<StatusIcon outcome={finding.outcome} class="size-14" />
			<span aria-hidden="true">{outcomeLabels[finding.outcome]}</span>
		</span>
		{#if finding.possible !== undefined}
			<span class="type-ui-body-3-regular text-brand-text-secondary">
				<span class="font-semibold text-ui-base-foreground">{finding.earned ?? 0}</span>
				of {finding.possible} points
			</span>
		{/if}
	</div>
	<h3 class="type-ui-subtitle-2 text-ui-base-foreground">{finding.headline}</h3>
	{#if finding.happening}
		<p class="type-ui-body-2-regular text-ui-base-foreground">{finding.happening}</p>
	{/if}
	{#if finding.fix}
		<Callout label="What to do">{finding.fix}</Callout>
	{/if}
	{#if finding.evidence.length}
		<details class="group">
			<summary
				class="inline-flex cursor-pointer list-none items-center gap-4 rounded-xs type-ui-body-3-regular text-ui-base-foreground focus-ring"
			>
				<Icon
					icon={CaretDownIcon}
					regular
					class="size-16 -rotate-90 transition-transform duration-150 group-open:rotate-0 motion-reduce:transition-none"
				/>
				What we saw
			</summary>
			<div class="pt-12"><EvidenceList items={finding.evidence} /></div>
		</details>
	{/if}
</article>
