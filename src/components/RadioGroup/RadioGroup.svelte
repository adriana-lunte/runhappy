<!--
	RadioGroup — Runhappy design system
	Figma: UI Library | Runhappy → Components → Radio + _Radio base
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=202-2183

	A group of radios: choose one option. Native radios with the same `name`, inside a <fieldset>
	with a <legend>, so screen readers announce the group and arrow keys move between options.
	The chosen radio shows a dark dot on yellow (decided 2026-10-27, Figma aligned the same day).
-->
<script lang="ts" module>
	import type { ChoiceSize } from '#components/Choice';

	export interface RadioOption {
		/** Value stored in the form. Must be unique in the group. */
		value: string;
		/** Text next to the radio. */
		label: string;
		/** Second line under the label. */
		description?: string;
		/** Can't be chosen. */
		disabled?: boolean;
	}

	export interface RadioGroupProps {
		/** Group title (rendered as the fieldset legend). */
		label: string;
		/** Hides the group title visually but keeps it for screen readers. */
		hideLabel?: boolean;
		/** The options. */
		options: RadioOption[];
		/** The chosen option's value. Use `bind:value` to read it. */
		value?: string;
		/** Form field name. Generated when empty (radios need one to work as a group). */
		name?: string;
		/** Medium (box 20, label 15) or Small (box 16, label 14). */
		size?: ChoiceSize;
		/** Disables the whole group. */
		disabled?: boolean;
		/** Help text under the group. Hidden while there is an error. */
		helperText?: string;
		/** Error message. */
		error?: string;
		/** Called when the user chooses an option. */
		onchange?: (value: string) => void;
		/** Layout classes for the group (width, margin). */
		class?: string;
	}
</script>

<script lang="ts">
	import { Choice, choiceInputClasses } from '#components/Choice';
	import { FieldMessage } from '#components/Field';

	let {
		label,
		hideLabel = false,
		options,
		value = $bindable(),
		name,
		size = 'medium',
		disabled = false,
		helperText,
		error,
		onchange,
		class: className
	}: RadioGroupProps = $props();

	const uid = $props.id();
	const groupName = $derived(name ?? `${uid}-radio`);
	const helperId = `${uid}-helper`;
	const errorId = `${uid}-error`;
	const hasError = $derived(Boolean(error));
	const describedBy = $derived(hasError ? errorId : helperText ? helperId : undefined);
</script>

<fieldset {disabled} aria-describedby={describedBy} class={['flex flex-col gap-8', className]}>
	<legend class={['mb-8 type-ui-body-4-medium text-ui-base-foreground', hideLabel && 'sr-only']}>
		{label}
	</legend>
	<div class="flex flex-col gap-12">
		{#each options as option (option.value)}
			<Choice type="radio" {size} label={option.label} description={option.description}>
				{#snippet control()}
					<input
						type="radio"
						name={groupName}
						value={option.value}
						bind:group={value}
						disabled={option.disabled}
						onchange={() => onchange?.(option.value)}
						class={choiceInputClasses('radio', size)}
					/>
				{/snippet}
			</Choice>
		{/each}
	</div>
	<FieldMessage {helperText} {error} {helperId} {errorId} />
</fieldset>
