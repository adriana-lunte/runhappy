<!--
	FieldBox — shared building block for form fields (TextField, SearchField…).
	Figma "Input" frame: padding 16, gap 8, radius xs. The border is drawn inside (inset-ring)
	so the height matches Figma (53). Focus: `focus-ring-field`, a yellow border only, in both modes (2026-11-10).
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface FieldBoxProps {
		/** Error state: red border. */
		invalid?: boolean;
		/** Disabled state: not-allowed cursor (the input itself handles the text color). */
		disabled?: boolean | null;
		/** Yellow background on hover (SearchField with a value — Figma "Complete Hover"). */
		highlightOnHover?: boolean;
		/** Content: optional icons, the input, counters or buttons. */
		children: Snippet;
	}
</script>

<script lang="ts">
	let {
		invalid = false,
		disabled = false,
		highlightOnHover = false,
		children
	}: FieldBoxProps = $props();
</script>

<div
	class={[
		'flex items-center gap-8 rounded-xs bg-brand-neutral-warm-gray-light p-16 inset-ring',
		'focus-ring-field',
		// Border: gray (ui/base/input), yellow (ui/base/ring) while focused (2026-11-10); red with an error, also on focus.
		invalid
			? 'inset-ring-ui-status-destructive-border'
			: 'inset-ring-ui-base-input has-focus-visible:inset-ring-ui-base-ring',
		disabled && 'cursor-not-allowed',
		highlightOnHover && !disabled && 'hover:bg-brand-accent-yellow-background'
	]}
>
	{@render children()}
</div>
