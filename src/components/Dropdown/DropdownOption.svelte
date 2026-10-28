<!--
	DropdownOption — one option in the Dropdown list (internal; Dropdown renders it).
	Figma: UI Library | Runhappy → Components → dropdown-item (Idle / Hover / Disabled, 1 or 2 lines).
	The row look is shared with Menu: see src/components/OptionList.
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';

	export interface DropdownOptionData {
		/** Value stored in the form. Must be unique in the list. */
		value: string;
		/** Text shown in the list and in the field once selected. */
		label: string;
		/** Second line (Figma: Type = 2 lines). */
		description?: string;
		/** Icon before the label (any Phosphor icon). Shown with the brand-yellow layer. */
		icon?: PhosphorIcon;
		/** Can't be chosen. */
		disabled?: boolean;
	}

	export interface DropdownOptionProps {
		/** The option to draw. */
		option: DropdownOptionData;
		/** id, so the input can point to it with aria-activedescendant. */
		id: string;
		/** It is the chosen value: shows the check. */
		selected: boolean;
		/** It is the option under the keyboard cursor: same look as hover. */
		active: boolean;
		/** Called when the user clicks the option. */
		onselect: () => void;
		/** Called when the pointer moves over the option. */
		onhover: () => void;
	}
</script>

<script lang="ts">
	import { OptionContent, optionRowClasses } from '#components/OptionList';

	// option.value is used by Dropdown (to compare with the chosen value), not here.
	// eslint-disable-next-line svelte/no-unused-props
	let { option, id, selected, active, onselect, onhover }: DropdownOptionProps = $props();
</script>

<!-- Mouse interaction only: the keyboard is handled by the combobox input (aria-activedescendant). -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<li
	{id}
	role="option"
	aria-selected={selected}
	aria-disabled={option.disabled || undefined}
	onclick={() => !option.disabled && onselect()}
	onmousemove={() => !option.disabled && onhover()}
	class={optionRowClasses(active, option.disabled)}
>
	<OptionContent
		label={option.label}
		description={option.description}
		icon={option.icon}
		{selected}
		disabled={option.disabled}
	/>
</li>
