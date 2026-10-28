<!--
	FeatureCard — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (home page cards, 2026-10-28).

	A white card that explains one thing: icon, title and a short text. Static, not clickable.
	Background ui/surface/surface-100, radius sm, title UI/Subtitle/3, text UI/Body/3 in brand/text/secondary.
	With `step` (decided 2026-10-28): a yellow Tag "Step 1" sits above the icon. Put numbered cards in an <ol>.
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';

	export interface FeatureCardProps {
		/** Icon on top (any Phosphor icon). Decorative. */
		icon: PhosphorIcon;
		/** Card title. */
		title: string;
		/** Short explanation. */
		text: string;
		/** Step number. Shows a yellow "Step N" tag above the icon. */
		step?: number;
		/** Heading level of the title, so the page outline stays right. */
		level?: 2 | 3;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { Icon } from '#components/Icon';
	import { Tag } from '#components/Tag';

	let { icon, title, text, step, level = 2, class: className }: FeatureCardProps = $props();
</script>

<div class={['flex flex-col gap-12 rounded-sm bg-ui-surface-surface-100 p-20', className]}>
	{#if step !== undefined}
		<Tag announceType={false} class="self-start">Step {step}</Tag>
	{/if}
	<Icon {icon} class="size-24 text-ui-base-foreground" />
	<div class="flex flex-col gap-6">
		<svelte:element this={`h${level}`} class="type-ui-subtitle-3 text-ui-base-foreground">
			{title}
		</svelte:element>
		<p class="type-ui-body-3-regular text-brand-text-secondary">{text}</p>
	</div>
</div>
