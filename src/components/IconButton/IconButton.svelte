<!--
	IconButton — Runhappy design system
	Figma: UI Library | Runhappy → Components → icon-button (created 2026-10-28)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=205-2598

	A round button with only an icon: 40×40, no background; warm-gray-mid on hover and while its menu is open;
	shrinks to 98% while pressed (like Button). Because it has no visible text, `label` is required: it is the
	button's name for screen readers and is shown in a tooltip on hover and keyboard focus.
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export interface IconButtonProps extends Omit<HTMLButtonAttributes, 'children'> {
		/** The icon (any Phosphor icon). */
		icon: PhosphorIcon;
		/** Name of the button: read by screen readers and shown in the tooltip. */
		label: string;
		/** Uses Phosphor's Regular drawing: only for carets (chevrons), as in every control. */
		regular?: boolean;
		/** Where the tooltip opens: "top" (default) or "right" (e.g. collapsed sidebar). */
		tooltipPlacement?: 'top' | 'right';
		/** Native button type. Defaults to "button" so it never submits a form by accident. */
		type?: 'button' | 'submit' | 'reset';
	}
</script>

<script lang="ts">
	import { Icon } from '#components/Icon';
	import { Tooltip } from '#components/Tooltip';

	let {
		icon,
		label,
		regular = false,
		tooltipPlacement = 'top',
		type = 'button',
		disabled = false,
		class: className,
		onclick,
		onfocus,
		onblur,
		onmouseenter,
		onmouseleave,
		...rest
	}: IconButtonProps = $props();

	// While a menu opened by this button is showing, the tooltip stays closed so it does not cover the menu.
	const expanded = $derived(rest['aria-expanded'] === true || rest['aria-expanded'] === 'true');
</script>

<Tooltip text={label} labels placement={tooltipPlacement} suppressed={expanded}>
	{#snippet trigger(tip)}
		<button
			{type}
			{disabled}
			{...rest}
			{...tip}
			onclick={(event) => {
				tip.onclick();
				onclick?.(event);
			}}
			onfocus={(event) => {
				tip.onfocus();
				onfocus?.(event);
			}}
			onblur={(event) => {
				tip.onblur();
				onblur?.(event);
			}}
			onmouseenter={(event) => {
				tip.onmouseenter();
				onmouseenter?.(event);
			}}
			onmouseleave={(event) => {
				tip.onmouseleave();
				onmouseleave?.(event);
			}}
			class={[
				'grid size-40 shrink-0 cursor-pointer place-items-center rounded-full focus-ring',
				'text-ui-base-foreground enabled:hover:bg-brand-neutral-warm-gray-mid aria-expanded:bg-brand-neutral-warm-gray-mid',
				'disabled:cursor-not-allowed disabled:text-ui-ui-elements-muted-foreground',
				// Pressed: shrinks to 98% while held (no animation if the user prefers reduced motion).
				'transition duration-150 enabled:active:scale-98 motion-reduce:transition-none motion-reduce:enabled:active:scale-100',
				className
			]}
		>
			<Icon {icon} {regular} class="size-20" />
		</button>
	{/snippet}
</Tooltip>
