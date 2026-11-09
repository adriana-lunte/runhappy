<!--
	Card — Runhappy design system (Report Card)
	Not in Figma yet: the box shared by the home form and the step cards (Adriana, 2026-10-30).

	A static box that groups content: radius sm, 20 px padding, no border (Adriana removed the thin ui/base/border
	one on 2026-10-30). Not clickable. Layout inside (direction, gaps) comes from the `class` prop.
	Two tones:
	  default → ui/surface/surface-100 (white): Report Card.
	  muted   → ui/ui elements/card (light gray): Self Onboarding cards (Figma "Platform | Runhappy" → V2),
	            added 2026-11-09 (Adriana chose a Card option instead of changing every card).
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export type CardTone = 'default' | 'muted';

	export interface CardProps {
		/** Background: "default" white surface (Report Card) or "muted" light gray (Self Onboarding). */
		tone?: CardTone;
		/** What goes inside the card. */
		children: Snippet;
		/** Layout classes (e.g. "flex flex-col gap-12"). */
		class?: ClassValue;
	}
</script>

<script lang="ts">
	let { tone = 'default', children, class: className }: CardProps = $props();

	const toneClasses: Record<CardTone, string> = {
		default: 'bg-ui-surface-surface-100',
		muted: 'bg-ui-ui-elements-card'
	};
</script>

<div class={['rounded-sm p-20', toneClasses[tone], className]}>
	{@render children()}
</div>
