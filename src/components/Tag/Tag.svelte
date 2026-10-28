<!--
	Tag — Runhappy design system
	Figma: UI Library | Runhappy → Components → tag
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=88-1966

	A small, static label (not clickable). The color carries meaning, so screen readers also hear
	the type before the text, e.g. "Overdue: in 3 days" (decided 2026-10-27).
	Text: UI/Overline/1 (decided 2026-10-27 — Figma used the smaller Overline/2 size, unlinked).
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type TagType = 'consultation' | 'soon' | 'later' | 'overdue';

	export interface TagProps {
		/** What the tag means. Sets the color and the word screen readers hear first. */
		type?: TagType;
		/** Visible text, e.g. "in 3 days". */
		children: Snippet;
		/** Layout classes (margin, alignment). */
		class?: string;
	}
</script>

<script lang="ts">
	let { type = 'consultation', children, class: className }: TagProps = $props();

	// Text on brand colors uses ui-base-primary-foreground (color rule 1, stays dark in dark mode).
	// Overdue keeps Figma's white text: 5.0:1 light, 6.3:1 dark.
	const typeClasses: Record<TagType, string> = {
		consultation: 'bg-brand-accent-yellow text-ui-base-primary-foreground',
		soon: 'bg-brand-secondary-pink text-ui-base-primary-foreground',
		later: 'bg-brand-secondary-green text-ui-base-primary-foreground',
		overdue: 'bg-ui-status-destructive-foreground text-brand-neutral-white'
	};

	// Read by screen readers only, before the visible text.
	const typeLabels: Record<TagType, string> = {
		consultation: 'Consultation',
		soon: 'Soon',
		later: 'Later',
		overdue: 'Overdue'
	};
</script>

<span
	class={[
		// Layout: Figma auto layout — padding 2/8, hug content, pill shape.
		'inline-flex items-center rounded-full px-8 py-2 type-ui-overline-1 whitespace-nowrap',
		typeClasses[type],
		className
	]}
>
	<span class="sr-only">{typeLabels[type]}:</span>
	{@render children()}
</span>
