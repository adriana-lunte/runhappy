<!--
	TimeField — Runhappy design system
	Figma: not drawn yet. Self Onboarding's day-row uses text_field with a Clock icon as a stand-in; the real time
	input is to confirm in Figma.
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-751

	A native time input (the browser's own picker and keyboard behaviour) inside the shared FieldBox, with a
	16 px Clock icon. The value is "HH:MM" in 24-hour form; the browser shows it in the user's format (10:00 AM).
	The browser's own clock button is hidden so there is only one icon; clicking the field opens the picker.
-->
<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface TimeFieldProps extends Omit<HTMLInputAttributes, 'value' | 'type' | 'size'> {
		/** Label text. Always required: screen readers need it even when it is hidden. */
		label: string;
		/** Hides the label visually but keeps it for screen readers (e.g. inside DayRow). */
		hideLabel?: boolean;
		/** Help text under the field. Hidden while there is an error. */
		helperText?: string;
		/** Error message. When set, the field shows the error state. */
		error?: string;
		/** The time, "HH:MM" (24 h), e.g. "18:00". Use `bind:value` to read it. */
		value?: string;
	}
</script>

<script lang="ts">
	import { ClockIcon } from 'phosphor-svelte';
	import { FieldBox, FieldLabel, FieldMessage } from '#components/Field';
	import { Icon } from '#components/Icon';

	let {
		label,
		hideLabel = false,
		helperText,
		error,
		value = $bindable(''),
		id,
		disabled = false,
		class: className,
		...rest
	}: TimeFieldProps = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-input`);
	const helperId = `${uid}-helper`;
	const errorId = `${uid}-error`;
	const hasError = $derived(Boolean(error));
	const describedBy = $derived(hasError ? errorId : helperText ? helperId : undefined);
</script>

<div class={['flex flex-col gap-8', className]}>
	<FieldLabel for={inputId} {label} {hideLabel} />

	<FieldBox invalid={hasError} {disabled}>
		<Icon icon={ClockIcon} class="size-16 text-ui-ui-elements-muted-foreground" />
		<input
			id={inputId}
			type="time"
			{disabled}
			bind:value
			aria-invalid={hasError || undefined}
			aria-describedby={describedBy}
			onclick={(event) => {
				// The browser's own clock button is hidden (our Clock icon replaces it), so a click opens the picker.
				try {
					event.currentTarget.showPicker();
				} catch {
					// Not supported or not allowed (e.g. disabled): typing still works.
				}
			}}
			class={[
				'min-w-0 flex-1 cursor-pointer bg-transparent type-ui-body-3-regular text-ui-base-foreground outline-hidden',
				'disabled:cursor-not-allowed disabled:text-ui-ui-elements-muted-foreground',
				'[&::-webkit-calendar-picker-indicator]:hidden'
			]}
			{...rest}
		/>
	</FieldBox>

	<FieldMessage {helperText} {error} {helperId} {errorId} />
</div>
