<!--
	FeatureCard — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (home page cards, 2026-10-28).

	A card that explains one thing: an icon or a step number, a title and a short text. Static, not clickable.
	Built on Card (background, border, radius, padding), title UI/Subtitle/3, text UI/Body/4 in
	brand/text/secondary (was Body/3, Adriana 2026-10-28).
	With `step` (Adriana, 2026-10-30, replacing the yellow "Step N" tag): a big number ("01") in UI/Headline Serif/4,
	32 px above the title. Yellow (brand/text/accent) in dark mode only: in light mode yellow on white fails contrast,
	so it uses ui/base/foreground. Screen readers hear "Step 1", and the cards go in an <ol>.
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';

	export interface FeatureCardProps {
		/** Icon on top (any Phosphor icon). Decorative. Leave it out on numbered cards. */
		icon?: PhosphorIcon;
		/** Card title. */
		title: string;
		/** Short explanation. */
		text: string;
		/** Step number. Shows a big number ("01") on top, yellow in dark mode. */
		step?: number;
		/** Heading level of the title, so the page outline stays right. */
		level?: 2 | 3;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { Card } from '#components/Card';
	import { Icon } from '#components/Icon';

	let { icon, title, text, step, level = 2, class: className }: FeatureCardProps = $props();
</script>

<Card
	class={['flex flex-col', step === undefined ? 'gap-12' : 'gap-32', className]
		.filter(Boolean)
		.join(' ')}
>
	{#if step !== undefined}
		<p class="type-ui-headline-serif-4 text-ui-base-foreground dark:text-brand-text-accent">
			<span aria-hidden="true">{String(step).padStart(2, '0')}</span>
			<span class="sr-only">Step {step}</span>
		</p>
	{/if}
	{#if icon}
		<Icon {icon} class="size-24 text-ui-base-foreground" />
	{/if}
	<div class="flex flex-col gap-6">
		<svelte:element this={`h${level}`} class="type-ui-subtitle-3 text-ui-base-foreground">
			{title}
		</svelte:element>
		<p class="type-ui-body-4-regular text-brand-text-secondary">{text}</p>
	</div>
</Card>
