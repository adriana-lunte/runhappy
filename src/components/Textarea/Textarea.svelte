<!--
	Textarea — Runhappy design system
	Figma: not drawn yet. Self Onboarding uses text_field as a stand-in for long text ("What do you offer?",
	"Greeting"); the multi-line look is to confirm in Figma.
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=96-2131

	Long text with an optional character counter. Built from the shared Field parts, like TextField: same label,
	box, focus ring, error and help text. The box grows with `rows`; the user can make it taller.
-->
<script lang="ts" module>
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	export interface TextareaProps extends Omit<HTMLTextareaAttributes, 'value'> {
		/** Label text. Always required: screen readers need it even when it is hidden. */
		label: string;
		/** Hides the label visually but keeps it for screen readers. */
		hideLabel?: boolean;
		/** Help text under the field. Hidden while there is an error. */
		helperText?: string;
		/** Error message. When set, the field shows the error state. */
		error?: string;
		/** The text. Use `bind:value` to read it. */
		value?: string;
		/** Visible lines before it needs to scroll. */
		rows?: number;
		/** Maximum number of characters. Also enables the counter ("184/2000"). */
		maxlength?: number;
		/** Shows the character counter when `maxlength` is set. */
		showCounter?: boolean;
		/** Extra explanation shown in a tooltip from an "Info" icon next to the label. */
		info?: string;
	}
</script>

<script lang="ts">
	import { FieldBox, FieldLabel, FieldMessage } from '#components/Field';

	let {
		label,
		hideLabel = false,
		helperText,
		info,
		error,
		value = $bindable(''),
		rows = 3,
		maxlength,
		showCounter = true,
		id,
		disabled = false,
		class: className,
		...rest
	}: TextareaProps = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-input`);
	const helperId = `${uid}-helper`;
	const errorId = `${uid}-error`;
	const counterId = `${uid}-counter`;

	const hasError = $derived(Boolean(error));
	const hasCounter = $derived(showCounter && maxlength !== undefined);
	const describedBy = $derived(
		[hasError ? errorId : helperText ? helperId : null, hasCounter ? counterId : null]
			.filter(Boolean)
			.join(' ') || undefined
	);
</script>

<div class={['flex flex-col gap-8', className]}>
	<FieldLabel for={inputId} {label} {hideLabel} {info} />

	<FieldBox invalid={hasError} {disabled}>
		<div class="flex min-w-0 flex-1 flex-col gap-4">
			<textarea
				id={inputId}
				{rows}
				{disabled}
				{maxlength}
				bind:value
				aria-invalid={hasError || undefined}
				aria-describedby={describedBy}
				class={[
					'min-w-0 resize-y bg-transparent type-ui-body-3-regular text-ui-base-foreground outline-hidden',
					'placeholder:text-brand-neutral-warm-gray',
					'disabled:cursor-not-allowed disabled:text-ui-ui-elements-muted-foreground'
				]}
				{...rest}></textarea>
			{#if hasCounter}
				<span id={counterId} class="self-end type-ui-body-5-regular text-brand-neutral-warm-gray">
					{value.length}/{maxlength}
				</span>
			{/if}
		</div>
	</FieldBox>

	<FieldMessage {helperText} {error} {helperId} {errorId} />
</div>
