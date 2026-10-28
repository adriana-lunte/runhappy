<!--
	Button — Runhappy design system
	Figma: UI Library | Runhappy → Components → button-pimary / button-secondary / button-tertiary
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=70-1444
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

	export interface ButtonProps extends HTMLButtonAttributes {
		/** Visual style. Matches the three Figma button sets. */
		variant?: ButtonVariant;
		/** Icon before the label (any Phosphor icon). Decorative: hidden from screen readers. */
		iconLeft?: PhosphorIcon;
		/** Icon after the label (any Phosphor icon). Decorative: hidden from screen readers. */
		iconRight?: PhosphorIcon;
		/** Native button type. Defaults to "button" so it never submits a form by accident. */
		type?: 'button' | 'submit' | 'reset';
	}
</script>

<script lang="ts">
	import { Icon } from '#components/Icon';

	let {
		variant = 'primary',
		iconLeft: IconLeft,
		iconRight: IconRight,
		type = 'button',
		disabled = false,
		class: className,
		children,
		...rest
	}: ButtonProps = $props();

	// Colors per variant (approved mapping, 2026-10-23 — see docs/decisions.md).
	// `enabled:` keeps hover and pressed effects off when the button is disabled.
	const variantClasses: Record<ButtonVariant, string> = {
		primary: [
			'bg-ui-base-primary text-ui-base-primary-foreground',
			'enabled:hover:bg-ui-base-primary-hover',
			'disabled:bg-brand-neutral-warm-gray-light disabled:text-brand-neutral-warm-gray'
		].join(' '),
		secondary: [
			'bg-brand-accent-yellow-background text-brand-text-primary',
			'enabled:hover:bg-ui-base-primary enabled:hover:text-ui-base-primary-foreground',
			'disabled:bg-brand-neutral-warm-gray-light disabled:text-brand-neutral-warm-gray'
		].join(' '),
		tertiary: [
			// inset-ring draws the border inside the button, so all variants keep the same size (as in Figma).
			'bg-transparent text-brand-text-primary inset-ring inset-ring-brand-accent-yellow-dark',
			'enabled:hover:bg-brand-accent-yellow-background',
			'disabled:text-brand-neutral-warm-gray-mid disabled:inset-ring-brand-neutral-warm-gray-mid'
		].join(' ')
	};
</script>

<button
	{type}
	{disabled}
	class={[
		// Layout: Figma auto layout — padding 10/16, gap 8, hug content, pill shape.
		'inline-flex items-center justify-center gap-8 rounded-full px-16 py-10',
		'cursor-pointer type-ui-button focus-ring disabled:cursor-not-allowed',
		// Pressed: shrinks to 98% while held (no animation if the user prefers reduced motion).
		'transition duration-150 enabled:active:scale-98 motion-reduce:transition-none motion-reduce:enabled:active:scale-100',
		variantClasses[variant],
		className
	]}
	{...rest}
>
	{#if IconLeft}
		<Icon icon={IconLeft} class="size-20" />
	{/if}
	{@render children?.()}
	{#if IconRight}
		<Icon icon={IconRight} class="size-20" />
	{/if}
</button>
