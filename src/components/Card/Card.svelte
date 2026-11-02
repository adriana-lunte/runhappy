<!--
	Card — Runhappy design system (Report Card)
	Not in Figma yet: the box shared by the home form and the step cards (Adriana, 2026-10-30).

	A static box that groups content: background ui/surface/surface-100, radius sm, 20 px padding (24 px with
	padding="lg", used by the home form since 2026-11-02). No border
	(Adriana removed the thin ui/base/border one on 2026-10-30). Not clickable. Layout inside (direction, gaps)
	comes from the `class` prop.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export interface CardProps {
		/** What goes inside the card. */
		children: Snippet;
		/** Inner padding: md = 20 px, lg = 24 px (roomier, for forms). */
		padding?: 'md' | 'lg';
		/** Layout classes (e.g. "flex flex-col gap-12"). */
		class?: ClassValue;
	}
</script>

<script lang="ts">
	let { children, padding = 'md', class: className }: CardProps = $props();
</script>

<div
	class={['rounded-sm bg-ui-surface-surface-100', padding === 'lg' ? 'p-24' : 'p-20', className]}
>
	{@render children()}
</div>
