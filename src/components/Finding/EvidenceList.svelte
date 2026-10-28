<!--
	EvidenceList — what we saw for one finding (internal; FindingCard and FindingRow render it).
	Pages are links (they open the venue's site in a new tab), facts are "label: value", screenshots are images.
-->
<script lang="ts" module>
	import type { Evidence } from '#lib/schemas/report.ts';

	export interface EvidenceListProps {
		/** The evidence of one finding. */
		items: Evidence[];
	}
</script>

<script lang="ts">
	import { ArrowUpRightIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let { items }: EvidenceListProps = $props();
</script>

<!-- External links to the checked site: no SvelteKit navigation to resolve. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<ul class="flex flex-col gap-8">
	{#each items as item, index (index)}
		<li class="type-ui-body-3-regular text-ui-base-foreground">
			{#if item.kind === 'page'}
				<a
					href={item.url}
					target="_blank"
					rel="noopener"
					class="inline-flex items-center gap-4 rounded-xs underline underline-offset-2 focus-ring"
				>
					{item.label}
					<Icon icon={ArrowUpRightIcon} class="size-14" />
					<span class="sr-only">(opens in a new tab)</span>
				</a>
			{:else if item.kind === 'fact'}
				<span class="text-brand-text-secondary">{item.label}:</span>
				{item.value}
			{:else}
				<img
					src={item.src}
					alt={item.label}
					loading="lazy"
					class="w-full rounded-xs inset-ring inset-ring-ui-base-border"
				/>
			{/if}
		</li>
	{/each}
</ul>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
