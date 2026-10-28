<!--
	TextField — Runhappy design system
	Figma: UI Library | Runhappy → Components → text_filed
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=96-2131

	Figma states map to code like this:
	  Default / Hover → idle (hover has no visual change, as in Figma)
	  Focus / Typing  → the field has focus
	  Complete        → the field has a value
	  Complete Disable → `disabled`
	  Error           → `error` has a message
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface TextFieldProps extends Omit<HTMLInputAttributes, 'value' | 'size'> {
		/** Label text. Always required: screen readers need it even when it is hidden. */
		label: string;
		/** Hides the label visually but keeps it for screen readers (Figma: Label = No). */
		hideLabel?: boolean;
		/** Help text under the field (Figma: Support Text). Hidden while there is an error. */
		helperText?: string;
		/** Error message. When set, the field shows the error state. */
		error?: string;
		/** The text in the field. Use `bind:value` to read it. */
		value?: string;
		/** Maximum number of characters. Also enables the counter ("9/40"). */
		maxlength?: number;
		/** Shows the character counter when `maxlength` is set (Figma: Counter). */
		showCounter?: boolean;
		/** Icon at the start of the field (any Phosphor icon). Decorative. */
		icon?: PhosphorIcon;
		/** Extra explanation shown in a tooltip from an "Info" icon next to the label (Figma: icon). */
		info?: string;
	}
</script>

<script lang="ts">
	import { FieldBox, FieldLabel, FieldMessage } from '#components/Field';
	import { Icon } from '#components/Icon';

	let {
		label,
		hideLabel = false,
		helperText,
		info,
		error,
		value = $bindable(''),
		maxlength,
		showCounter = true,
		icon,
		id,
		type = 'text',
		disabled = false,
		class: className,
		...rest
	}: TextFieldProps = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-input`);
	const helperId = `${uid}-helper`;
	const errorId = `${uid}-error`;
	const counterId = `${uid}-counter`;

	const hasError = $derived(Boolean(error));
	const hasCounter = $derived(showCounter && maxlength !== undefined);
	// Screen readers read these after the label: the error (or the help text) and the counter.
	const describedBy = $derived(
		[hasError ? errorId : helperText ? helperId : null, hasCounter ? counterId : null]
			.filter(Boolean)
			.join(' ') || undefined
	);
</script>

<div class={['flex flex-col gap-8', className]}>
	<FieldLabel for={inputId} {label} {hideLabel} {info} />

	<FieldBox invalid={hasError} {disabled}>
		{#if icon}
			<Icon {icon} class="size-16 text-ui-ui-elements-muted-foreground" />
		{/if}
		<input
			id={inputId}
			{type}
			{disabled}
			{maxlength}
			bind:value
			aria-invalid={hasError || undefined}
			aria-describedby={describedBy}
			class={[
				'min-w-0 flex-1 bg-transparent type-ui-body-3-regular text-ui-base-foreground outline-hidden',
				'placeholder:text-brand-neutral-warm-gray',
				'disabled:cursor-not-allowed disabled:text-ui-ui-elements-muted-foreground'
			]}
			{...rest}
		/>
		{#if hasCounter}
			<span id={counterId} class="shrink-0 type-ui-body-5-regular text-brand-neutral-warm-gray">
				{value.length}/{maxlength}
			</span>
		{/if}
	</FieldBox>

	<FieldMessage {helperText} {error} {helperId} {errorId} />
</div>
