<!--
	Icon — Runhappy design system
	Figma: UI Library | Runhappy → Icons page (Phosphor, duotone with brand yellow).

	Usage:
	  <Icon icon={MagnifyingGlassIcon} class="size-16 text-ui-ui-elements-muted-foreground" />
	  <Icon icon={InfoIcon} duotone class="size-14 text-ui-base-primary-foreground" />
	Size and color come from classes (size-*, text-*): the drawing uses the text color.
-->
<script lang="ts" module>
	import type { Component } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import type { IconComponentProps } from 'phosphor-svelte';

	/** Any icon from phosphor-svelte, e.g. `import { PlusIcon } from 'phosphor-svelte'`. */
	export type PhosphorIcon = Component<IconComponentProps>;

	export interface IconProps {
		/** The Phosphor icon to draw. Same name as in Figma (e.g. MagnifyingGlass → MagnifyingGlassIcon). */
		icon: PhosphorIcon;
		/** Shows the brand-yellow layer. Only where the icon communicates (see src/tokens/icons.css). */
		duotone?: boolean;
		/**
		 * Uses Phosphor's Regular drawing instead of the duotone one. Only for the carets inside controls
		 * (Figma: "CaretDown Regular", "CaretUp Regular"… — chevrons instead of triangles).
		 */
		regular?: boolean;
		/** Uses Phosphor's Bold drawing: a thicker line. For now only the "Grade my site" chevron (Adriana, 2026-10-28). */
		bold?: boolean;
		/** Only for icons that carry meaning on their own. Without it the icon is hidden from screen readers. */
		label?: string;
		/** Size and color, e.g. "size-16 text-ui-base-foreground". */
		class?: ClassValue;
	}
</script>

<script lang="ts">
	let {
		icon: Glyph,
		duotone = false,
		regular = false,
		bold = false,
		label,
		class: className
	}: IconProps = $props();
</script>

<!-- The duotone drawing, like the Figma set (yellow layer shown or hidden), or Regular / Bold line drawings. -->
<Glyph
	weight={bold ? 'bold' : regular ? 'regular' : 'duotone'}
	class={['shrink-0', !regular && !bold && (duotone ? 'icon-duotone' : 'icon-plain'), className]}
	aria-hidden={label ? undefined : 'true'}
	aria-label={label}
/>
