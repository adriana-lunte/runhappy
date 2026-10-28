<!--
	Callout — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com ("What to do", 2026-10-28).

	A tinted box that stands out from the text around it: an icon, a small uppercase label and the text.
	Background brand/accent/yellow background, text brand/text/primary (color rule: light tints → primary text).
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { PhosphorIcon } from '#components/Icon';

	export interface CalloutProps {
		/** Small label above the text, e.g. "What to do". Shown uppercase. */
		label: string;
		/** Icon on the left (any Phosphor icon). Defaults to the light bulb. Decorative. */
		icon?: PhosphorIcon;
		/** The text. */
		children: Snippet;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { LightbulbIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let { label, icon = LightbulbIcon, children, class: className }: CalloutProps = $props();
</script>

<div
	class={[
		'flex gap-12 rounded-xs bg-brand-accent-yellow-background px-16 py-14 text-brand-text-primary',
		className
	]}
>
	<Icon {icon} class="mt-2 size-20" />
	<div class="flex min-w-0 flex-col gap-4">
		<span class="type-ui-overline-1 uppercase">{label}</span>
		<div class="type-ui-body-2-regular">{@render children()}</div>
	</div>
</div>
