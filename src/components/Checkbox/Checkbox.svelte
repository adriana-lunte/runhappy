<!--
	Checkbox — Runhappy design system
	Figma: UI Library | Runhappy → Components → Checkbox (Type=Check) + _Checkbox base
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=107-3100

	Figma states map to code: Idle / Hover / Disable as such · Active → `checked` ·
	Null → `indeterminate` (some, not all, children chosen) · Focus → shared focus ring.
-->
<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { ChoiceSize } from '#components/Choice';

	export interface CheckboxProps extends Omit<
		HTMLInputAttributes,
		'type' | 'size' | 'checked' | 'indeterminate'
	> {
		/** Label text, always visible (clicking it toggles the checkbox). */
		label: string;
		/** Second line under the label. */
		description?: string;
		/** Checked or not. Use `bind:checked` to read it. */
		checked?: boolean;
		/** "Some but not all" state (Figma: Null). Cleared by the browser when the user clicks. */
		indeterminate?: boolean;
		/** Medium (box 20, label 15) or Small (box 16, label 14). */
		size?: ChoiceSize;
		/** Help text under the checkbox. Hidden while there is an error. */
		helperText?: string;
		/** Error message, e.g. "Accept the terms to continue". */
		error?: string;
	}
</script>

<script lang="ts">
	import { Choice, choiceInputClasses } from '#components/Choice';
	import { FieldMessage } from '#components/Field';

	let {
		label,
		description,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		size = 'medium',
		helperText,
		error,
		id,
		class: className,
		...rest
	}: CheckboxProps = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-input`);
	const helperId = `${uid}-helper`;
	const errorId = `${uid}-error`;
	const hasError = $derived(Boolean(error));
	const describedBy = $derived(hasError ? errorId : helperText ? helperId : undefined);
</script>

<div class={['flex flex-col gap-4', className]}>
	<Choice type="checkbox" {size} {label} {description}>
		{#snippet control()}
			<input
				id={inputId}
				type="checkbox"
				bind:checked
				bind:indeterminate
				aria-invalid={hasError || undefined}
				aria-describedby={describedBy}
				class={choiceInputClasses('checkbox', size)}
				{...rest}
			/>
		{/snippet}
	</Choice>
	{#if helperText || error}
		<!-- Indented to start under the label: box + gap. -->
		<div class={size === 'medium' ? 'pl-32' : 'pl-24'}>
			<FieldMessage {helperText} {error} {helperId} {errorId} />
		</div>
	{/if}
</div>
