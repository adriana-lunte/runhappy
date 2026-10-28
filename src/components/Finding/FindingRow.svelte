<!--
	FindingRow — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (list of checks in a category, 2026-10-28).

	One check in a category list: status icon, headline, points ("2/3") and a caret. Opens (native <details>) to show
	what is happening, a "What to do" Callout and the evidence. Checks we couldn't check or that don't apply say so
	next to the headline and have no points. Rows without anything to show are not expandable.
-->
<script lang="ts" module>
	import type { Finding } from '#lib/schemas/report.ts';

	export interface FindingRowProps {
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
	import { StatusIcon } from '#components/StatusIcon';
	import EvidenceList from './EvidenceList.svelte';

	let { finding, class: className }: FindingRowProps = $props();

	const aside = $derived(
		finding.outcome === 'couldnt_check'
			? 'couldn’t check'
			: finding.outcome === 'not_applicable'
				? 'not applicable'
				: undefined
	);
	const muted = $derived(Boolean(aside));
	const scoreColor = $derived(
		finding.outcome === 'fail'
			? 'text-ui-status-destructive-foreground'
			: finding.outcome === 'pass'
				? 'text-ui-status-success-foreground'
				: 'text-ui-base-foreground'
	);
	const hasDetails = $derived(Boolean(finding.happening || finding.fix || finding.evidence.length));
</script>

{#snippet line()}
	<StatusIcon outcome={finding.outcome} class="mt-2 size-20 shrink-0" />
	<span
		class={[
			'min-w-0 flex-1 type-ui-body-2-medium',
			muted ? 'text-ui-ui-elements-muted-foreground' : 'text-ui-base-foreground'
		]}
	>
		{finding.headline}{#if aside}<span class="type-ui-body-3-regular"> · {aside}</span>{/if}
	</span>
	{#if finding.possible !== undefined}
		<span class={['type-ui-body-3-regular font-mono', scoreColor]}>
			{finding.earned ?? 0}/{finding.possible}<span class="sr-only"> points</span>
		</span>
	{/if}
{/snippet}

{#if hasDetails}
	<details class={['group border-b border-ui-base-border last:border-b-0', className]}>
		<summary class="flex cursor-pointer list-none items-start gap-12 rounded-xs py-12 focus-ring">
			{@render line()}
			<Icon
				icon={CaretDownIcon}
				regular
				class="mt-2 size-16 text-brand-text-secondary transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
			/>
		</summary>
		<div class="flex flex-col gap-12 pb-16 pl-32">
			{#if finding.happening}
				<p class="type-ui-body-3-regular text-ui-base-foreground">{finding.happening}</p>
			{/if}
			{#if finding.fix}
				<Callout label="What to do">{finding.fix}</Callout>
			{/if}
			{#if finding.evidence.length}
				<EvidenceList items={finding.evidence} />
			{/if}
		</div>
	</details>
{:else}
	<div
		class={[
			'flex items-start gap-12 border-b border-ui-base-border py-12 last:border-b-0',
			className
		]}
	>
		{@render line()}
	</div>
{/if}
