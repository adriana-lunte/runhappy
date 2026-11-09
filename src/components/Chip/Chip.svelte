<!--
	Chip — Runhappy design system
	Figma: UI Library | Runhappy → Components → chip
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-696

	A small static pill (not clickable): the pages on the Self Onboarding loading screen and source tags such as
	"Drafted from your site" or "Recommended". Padding 4/10, gap 4, UI/Body/4, optional 12 px check.
	Tones:
	  neutral → ui/ui elements/muted background, muted-foreground text (pending, plain tags)
	  accent  → brand/accent/yellow background tint, brand/text/primary text (color rule: light tint → primary text)
	  inverse → ui/base/foreground background, ui/base/background text (on cards; added in Figma 2026-11-06)
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ChipTone = 'neutral' | 'accent' | 'inverse';

	export interface ChipProps {
		/** Colors. "inverse" stands out on a card, "neutral" is the quiet default. */
		tone?: ChipTone;
		/** Shows a check before the text (e.g. a page already read). */
		showCheck?: boolean;
		/** Words read by screen readers before the text when the check shows, e.g. "Read". */
		checkLabel?: string;
		/** Visible text. */
		children: Snippet;
		/** Layout classes (margin, alignment). */
		class?: string;
	}
</script>

<script lang="ts">
	import { CheckIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let {
		tone = 'neutral',
		showCheck = false,
		checkLabel,
		children,
		class: className
	}: ChipProps = $props();

	const toneClasses: Record<ChipTone, string> = {
		neutral: 'bg-ui-ui-elements-muted text-ui-ui-elements-muted-foreground',
		accent: 'bg-brand-accent-yellow-background text-brand-text-primary',
		inverse: 'bg-ui-base-foreground text-ui-base-background'
	};
</script>

<span
	class={[
		'inline-flex items-center gap-4 rounded-full px-10 py-4 type-ui-body-4-regular whitespace-nowrap',
		toneClasses[tone],
		className
	]}
>
	{#if showCheck}
		<Icon icon={CheckIcon} class="size-12" />
		{#if checkLabel}<span class="sr-only">{checkLabel}:</span>{/if}
	{/if}
	{@render children()}
</span>
