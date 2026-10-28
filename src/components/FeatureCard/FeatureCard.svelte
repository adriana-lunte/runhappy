<!--
	FeatureCard — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (home page cards, 2026-10-28).

	A white card that explains one thing: icon, title and a short text. Static, not clickable.
	Background ui/surface/surface-100, radius sm, title UI/Subtitle/3, text UI/Body/3 in brand/text/secondary.
	With `step`, a yellow circle with the step number sits next to the icon (decided 2026-10-28). Put numbered cards
	in an <ol>: the list tells screen readers the order, so the circle is hidden from them.
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
		/** Step number, shown in a yellow circle next to the icon. */
		step?: number;
		/** Heading level of the title, so the page outline stays right. */
		level?: 2 | 3;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { Icon } from '#components/Icon';

	let { icon, title, text, step, level = 2, class: className }: FeatureCardProps = $props();
</script>

<div class={['flex flex-col gap-12 rounded-sm bg-ui-surface-surface-100 p-20', className]}>
	<div class="flex items-center gap-12">
		{#if step !== undefined}
			<span
				class="flex size-24 items-center justify-center rounded-full bg-ui-base-primary type-ui-body-4-semibold text-ui-base-primary-foreground"
				aria-hidden="true"
			>
				{step}
			</span>
		{/if}
		<Icon {icon} class="size-24 text-ui-base-foreground" />
	</div>
	<div class="flex flex-col gap-6">
		<svelte:element this={`h${level}`} class="type-ui-subtitle-3 text-ui-base-foreground">
			{title}
		</svelte:element>
		<p class="type-ui-body-3-regular text-brand-text-secondary">{text}</p>
	</div>
</div>
