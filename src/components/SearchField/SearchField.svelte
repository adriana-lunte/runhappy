<!--
	SearchField — Runhappy design system
	Figma: UI Library | Runhappy → Components → search_field
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=113-917

	Figma states map to code like this:
	  Default / Hover        → idle (no hover change while empty)
	  Focus / Typing         → the field has focus (shared focus ring, as TextField)
	  Complete               → has a value: the search icon becomes a "clear" button
	  Complete Hover         → has a value + hover: yellow background
	  Complete Disable       → `disabled` (same look as TextField disabled — decided 2026-10-27)
	  Error                  → `error` has a message (red border, as TextField — decided 2026-10-27)
-->
<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface SearchFieldProps extends Omit<HTMLInputAttributes, 'value' | 'size' | 'type'> {
		/** Label text. Always required: screen readers need it even when it is hidden. */
		label: string;
		/** Hides the label visually but keeps it for screen readers (Figma: Label = No). */
		hideLabel?: boolean;
		/** Help text under the field (Figma: Support Text). Hidden while there is an error. */
		helperText?: string;
		/** Extra explanation shown in a tooltip from an "Info" icon next to the label. */
		info?: string;
		/** Error message. When set, the field shows the error state. */
		error?: string;
		/** The search text. Use `bind:value` to read it. */
		value?: string;
		/** Called when the user presses Enter. */
		onsearch?: (value: string) => void;
		/** Called after the clear button (or Escape) empties the field. */
		onclear?: () => void;
	}
</script>

<script lang="ts">
	import { MagnifyingGlassIcon, XIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';
	import { FieldBox, FieldLabel, FieldMessage } from '#components/Field';

	let {
		label,
		hideLabel = false,
		helperText,
		info,
		error,
		value = $bindable(''),
		onsearch,
		onclear,
		id,
		disabled = false,
		onkeydown,
		class: className,
		...rest
	}: SearchFieldProps = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-input`);
	const helperId = `${uid}-helper`;
	const errorId = `${uid}-error`;

	let input: HTMLInputElement;

	const hasError = $derived(Boolean(error));
	const hasValue = $derived(value.length > 0);
	const canClear = $derived(hasValue && !disabled);
	const describedBy = $derived(hasError ? errorId : helperText ? helperId : undefined);

	function clear() {
		value = '';
		input.focus();
		onclear?.();
	}

	function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
		if (event.key === 'Escape' && canClear) {
			event.preventDefault();
			clear();
		} else if (event.key === 'Enter') {
			onsearch?.(value);
		}
		onkeydown?.(event);
	}
</script>

<div class={['flex flex-col gap-8', className]}>
	<FieldLabel for={inputId} {label} {hideLabel} {info} />

	<FieldBox invalid={hasError} {disabled} highlightOnHover={hasValue}>
		<input
			bind:this={input}
			id={inputId}
			type="search"
			enterkeyhint="search"
			{disabled}
			bind:value
			aria-invalid={hasError || undefined}
			aria-describedby={describedBy}
			onkeydown={handleKeydown}
			class={[
				'min-w-0 flex-1 bg-transparent type-ui-body-3-regular text-ui-base-foreground outline-hidden',
				'placeholder:text-brand-neutral-warm-gray',
				'disabled:cursor-not-allowed disabled:text-ui-ui-elements-muted-foreground'
			]}
			{...rest}
		/>
		{#if canClear}
			<!-- Touch target of at least 24 × 24 (WCAG 2.5.8); negative margins keep the box as tall as in Figma. -->
			<button
				type="button"
				onclick={clear}
				aria-label={`Clear ${label}`}
				class="-m-4 inline-flex size-24 shrink-0 cursor-pointer items-center justify-center rounded-full text-ui-base-foreground focus-ring"
			>
				<Icon icon={XIcon} class="size-16" />
			</button>
		{:else}
			<Icon icon={MagnifyingGlassIcon} class="size-16 text-ui-ui-elements-muted-foreground" />
		{/if}
	</FieldBox>

	<FieldMessage {helperText} {error} {helperId} {errorId} />
</div>
