<!--
	OptionContent — shared look of floating option lists (internal). Used by Dropdown and Menu (decided 2026-10-28).
	Figma: UI Library | Runhappy → Components → dropdown + dropdown-item.

	Panel: warm-gray-light background, warm-gray-mid border, overlay shadow, radius xs, padding 16/12, gap 12.
	Row: padding 12/16, gap 12, radius xs; warm-gray-mid background when active (hover or keyboard).
	Content: icon 20 (duotone: list icons communicate; drawing in ui/base/foreground so it adapts to dark mode),
	text Body/3, description Body/4, check on the chosen option. Disabled: icon and text in
	ui/ui elements/muted-foreground, readable in both modes (decided 2026-10-28; Figma's warm gray mid was 1.2:1).
	A change to the panel or rows is made here, once.
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';

	/** Classes for the floating panel (position it with your own classes). */
	export const optionPanelClasses =
		'flex flex-col gap-12 rounded-xs bg-brand-neutral-warm-gray-light px-12 py-16 shadow-overlay inset-ring inset-ring-brand-neutral-warm-gray-mid';

	/** Classes for one row. `active` = under the pointer or the keyboard cursor. */
	export function optionRowClasses(active: boolean, disabled = false) {
		return [
			'flex items-center gap-12 rounded-xs px-16 py-12',
			disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			active && !disabled && 'bg-brand-neutral-warm-gray-mid'
		];
	}

	export interface OptionContentProps {
		/** Text of the option. */
		label: string;
		/** Second line. */
		description?: string;
		/** Icon before the label (any Phosphor icon). Shown with the brand-yellow layer. */
		icon?: PhosphorIcon;
		/** It is the chosen option: shows the check. */
		selected?: boolean;
		/** Can't be chosen. */
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { CheckIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let {
		label,
		description,
		icon,
		selected = false,
		disabled = false
	}: OptionContentProps = $props();
</script>

{#if icon}
	<Icon
		{icon}
		duotone={!disabled}
		class={[
			'size-20',
			disabled ? 'text-ui-ui-elements-muted-foreground' : 'text-ui-base-foreground'
		]}
	/>
{/if}
<span class="flex min-w-0 flex-1 flex-col">
	<span
		class={[
			'type-ui-body-3-regular',
			disabled ? 'text-ui-ui-elements-muted-foreground' : 'text-ui-base-foreground'
		]}
	>
		{label}
	</span>
	{#if description}
		<span
			class={[
				'type-ui-body-4-regular',
				disabled ? 'text-ui-ui-elements-muted-foreground' : 'text-brand-text-secondary'
			]}
		>
			{description}
		</span>
	{/if}
</span>
{#if selected}
	<Icon icon={CheckIcon} class="size-20 text-ui-base-foreground" />
{/if}
