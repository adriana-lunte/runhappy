<!--
	Choice — shared building block for Checkbox and RadioGroup (internal).
	Figma: UI Library | Runhappy → Components → _Checkbox base + Checkbox, _Radio base + Radio.

	Layout: [box] [label + description]. The box is the native <input> itself (appearance: none),
	so keyboard, focus and screen readers work natively; the check / dot is drawn on top of it.
	Medium: box 20, gap 12, label Body/2 · Small: box 16, gap 8, label Body/3.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type ChoiceType = 'checkbox' | 'radio';
	export type ChoiceSize = 'medium' | 'small';

	/** Classes for the native input that draws the box. Used by Checkbox and RadioGroup. */
	export function choiceInputClasses(type: ChoiceType, size: ChoiceSize) {
		return [
			'peer col-start-1 row-start-1 m-0 shrink-0 appearance-none cursor-pointer focus-ring transition-shadow duration-150 motion-reduce:transition-none',
			size === 'medium' ? 'size-20' : 'size-16',
			type === 'checkbox' ? 'rounded-2xs' : 'rounded-full',
			// Idle border --border-control (ui/base/input, rule 3A); thicker on hover, as in Figma.
			'bg-transparent inset-ring-(length:--border-control) inset-ring-ui-base-input',
			'enabled:hover:inset-ring-(length:--border-control-hover)',
			'aria-invalid:inset-ring-ui-status-destructive-border',
			// Checked / indeterminate: brand yellow box.
			'checked:bg-ui-base-primary checked:inset-ring-ui-base-primary',
			// Indeterminate only for checkboxes: a radio group with nothing chosen also matches :indeterminate.
			type === 'checkbox' &&
				'indeterminate:bg-ui-base-primary indeterminate:inset-ring-ui-base-primary',
			// Disabled (checked or not): light gray box.
			'disabled:cursor-not-allowed disabled:bg-brand-neutral-warm-gray-light disabled:inset-ring-brand-neutral-warm-gray-mid',
			'disabled:checked:bg-brand-neutral-warm-gray-light',
			type === 'checkbox' && 'disabled:indeterminate:bg-brand-neutral-warm-gray-light'
		];
	}

	export interface ChoiceProps {
		type: ChoiceType;
		size?: ChoiceSize;
		/** Label text. */
		label: string;
		/** Second line under the label. */
		description?: string;
		/** The native input (render it with `choiceInputClasses`). */
		control: Snippet;
	}
</script>

<script lang="ts">
	import { CheckIcon, MinusIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let { type, size = 'medium', label, description, control }: ChoiceProps = $props();

	const textStyle = $derived(
		size === 'medium' ? 'type-ui-body-2-regular' : 'type-ui-body-3-regular'
	);
	const markSize = $derived(size === 'medium' ? 'size-14' : 'size-12');
</script>

<label class={['group flex items-start', size === 'medium' ? 'gap-12' : 'gap-8']}>
	<!-- As tall as one line of the label, so the box stays centered on the first line. -->
	<span class={['grid h-lh shrink-0 place-items-center', textStyle]}>
		{@render control()}
		{#if type === 'checkbox'}
			<Icon
				icon={CheckIcon}
				class={[
					'pointer-events-none invisible col-start-1 row-start-1 text-ui-base-primary-foreground peer-disabled:text-ui-ui-elements-muted-foreground',
					'peer-checked:visible peer-indeterminate:invisible',
					markSize
				]}
			/>
			<Icon
				icon={MinusIcon}
				class={[
					'pointer-events-none invisible col-start-1 row-start-1 text-ui-base-primary-foreground peer-indeterminate:visible peer-disabled:text-ui-ui-elements-muted-foreground',
					markSize
				]}
			/>
		{:else}
			<!-- Radio dot: dark on yellow (11.5:1), decided 2026-10-27; the old light dot was 1.3:1. -->
			<span
				class={[
					'pointer-events-none invisible col-start-1 row-start-1 rounded-full bg-ui-base-primary-foreground peer-checked:visible peer-disabled:bg-ui-ui-elements-muted-foreground',
					size === 'medium' ? 'size-8' : 'size-6'
				]}
			></span>
		{/if}
	</span>
	<span class="flex min-w-0 flex-col">
		<span
			class={[
				textStyle,
				'text-ui-base-foreground group-has-disabled:text-ui-ui-elements-muted-foreground',
				'cursor-pointer group-has-disabled:cursor-not-allowed'
			]}
		>
			{label}
		</span>
		{#if description}
			<span class="type-ui-body-4-regular text-brand-text-secondary">{description}</span>
		{/if}
	</span>
</label>
