<!--
	Dropdown — Runhappy design system (searchable: type to filter the list)
	Figma: UI Library | Runhappy → Components → dropdown + dropdown-item
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=102-2855

	Accessibility: WAI-ARIA "editable combobox with list autocomplete".
	  ↓ / Alt+↓  open, then move to the next option      ↑  previous option
	  Enter      choose the active option                Escape  close (and restore the chosen label)
	  Typing     filters the list; the first match becomes active
	The input keeps the focus; the active option is announced through aria-activedescendant.

	Figma states map to code like this:
	  idle → closed, no value · open → list visible · complete → has a value · disable → `disabled`
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';
	import type { DropdownOptionData } from './DropdownOption.svelte';

	export interface DropdownProps {
		/** Label text. Always required: screen readers need it even when it is hidden. */
		label: string;
		/** Hides the label visually but keeps it for screen readers (Figma: Show Label = off). */
		hideLabel?: boolean;
		/** Extra explanation shown in a tooltip from an "Info" icon next to the label (Figma: info icon). */
		info?: string;
		/** Help text under the field. Hidden while there is an error. */
		helperText?: string;
		/** Error message. When set, the field shows the error state. */
		error?: string;
		/** The options. */
		options: DropdownOptionData[];
		/** The chosen option's `value`. Use `bind:value` to read it. */
		value?: string;
		/** Text in the empty field. Defaults to "Search", as in Figma (decided 2026-10-28). */
		placeholder?: string;
		/** Message when the search matches nothing. Default "No results" (confirmed 2026-10-28). */
		emptyText?: string;
		/** Icon at the start of the field (any Phosphor icon). Decorative. */
		icon?: PhosphorIcon;
		/** Can't be used. */
		disabled?: boolean;
		/** Name for form submission (sent as a hidden input with the value). */
		name?: string;
		/** id of the input. Generated when empty. */
		id?: string;
		/** Called when the user chooses an option. */
		onchange?: (value: string) => void;
		/** Called when the field loses focus (useful to validate). */
		onblur?: () => void;
		/** Layout classes for the wrapper (width, margin). */
		class?: string;
	}
</script>

<script lang="ts">
	import { CaretDownIcon } from 'phosphor-svelte';
	import { FieldBox, FieldLabel, FieldMessage } from '#components/Field';
	import { Icon } from '#components/Icon';
	import { optionPanelClasses } from '#components/OptionList';
	import DropdownOption from './DropdownOption.svelte';

	let {
		label,
		hideLabel = false,
		info,
		helperText,
		error,
		options,
		value = $bindable(),
		placeholder = 'Search',
		emptyText = 'No results',
		icon,
		disabled = false,
		name,
		id,
		onchange,
		onblur,
		class: className
	}: DropdownProps = $props();

	const uid = $props.id();
	const inputId = $derived(id ?? `${uid}-input`);
	const listId = `${uid}-list`;
	const helperId = `${uid}-helper`;
	const errorId = `${uid}-error`;
	const optionId = (index: number) => `${uid}-option-${index}`;
	// Minimum distance (in CSS pixels) the list keeps from the bottom of the window before opening above.
	const VIEWPORT_MARGIN = 8;

	let wrapper: HTMLDivElement;
	let input: HTMLInputElement;
	let open = $state(false);
	let openAbove = $state(false);
	let activeIndex = $state(-1);

	const selected = $derived(options.find((o) => o.value === value));
	// What the user typed. Follows the chosen label until the user types; while equal, the whole list is shown.
	let query = $derived(selected?.label ?? '');

	const filtered = $derived(
		query && query !== selected?.label
			? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
			: options
	);
	const hasError = $derived(Boolean(error));
	const describedBy = $derived(hasError ? errorId : helperText ? helperId : undefined);

	function firstEnabled(from: number, step: 1 | -1): number {
		for (let i = from; i >= 0 && i < filtered.length; i += step)
			if (!filtered[i].disabled) return i;
		return activeIndex;
	}

	function openList() {
		if (disabled || open) return;
		const box = wrapper.getBoundingClientRect();
		const panelMax =
			parseFloat(getComputedStyle(wrapper).getPropertyValue('--size-dropdown-panel')) * 16;
		openAbove = window.innerHeight - box.bottom < panelMax + VIEWPORT_MARGIN && box.top > panelMax;
		open = true;
		const current = filtered.findIndex((o) => o.value === value);
		activeIndex = current >= 0 ? current : firstEnabled(0, 1);
	}

	function close() {
		open = false;
		activeIndex = -1;
		query = selected?.label ?? '';
	}

	function choose(option: DropdownOptionData) {
		value = option.value;
		query = option.label;
		open = false;
		activeIndex = -1;
		onchange?.(option.value);
	}

	function handleInput() {
		if (!open) openList();
		activeIndex = firstEnabled(0, 1);
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (!open) openList();
				else activeIndex = firstEnabled(activeIndex + 1, 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (open) activeIndex = firstEnabled(activeIndex - 1, -1);
				break;
			case 'Enter':
				if (open && filtered[activeIndex]) {
					event.preventDefault();
					choose(filtered[activeIndex]);
				}
				break;
			case 'Escape':
				if (open) {
					event.preventDefault();
					close();
				}
				break;
		}
	}

	function handleBlur() {
		close();
		onblur?.();
	}

	// Keep the active option visible while moving with the keyboard.
	$effect(() => {
		if (open && activeIndex >= 0)
			document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' });
	});
</script>

<div bind:this={wrapper} class={['relative flex flex-col gap-8', className]}>
	<FieldLabel for={inputId} {label} {hideLabel} {info} />

	<!-- Clicking anywhere in the box (including the chevron) opens or closes the list. -->
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div
		onclick={() => (open ? close() : (input.focus(), openList()))}
		class={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
	>
		<FieldBox invalid={hasError} {disabled}>
			{#if icon}
				<Icon {icon} class="size-16 text-ui-ui-elements-muted-foreground" />
			{/if}
			<input
				bind:this={input}
				id={inputId}
				type="text"
				role="combobox"
				autocomplete="off"
				aria-autocomplete="list"
				aria-expanded={open}
				aria-controls={listId}
				aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
				aria-invalid={hasError || undefined}
				aria-describedby={describedBy}
				{placeholder}
				{disabled}
				bind:value={query}
				oninput={handleInput}
				onkeydown={handleKeydown}
				onblur={handleBlur}
				class={[
					'min-w-0 flex-1 bg-transparent type-ui-body-3-regular text-ui-base-foreground outline-hidden',
					'placeholder:text-brand-neutral-warm-gray',
					'disabled:cursor-not-allowed disabled:text-ui-ui-elements-muted-foreground'
				]}
			/>
			<Icon
				icon={CaretDownIcon}
				regular
				class={[
					'size-20 transition-transform duration-150 motion-reduce:transition-none',
					disabled ? 'text-ui-ui-elements-muted-foreground' : 'text-ui-base-foreground',
					open && 'rotate-180'
				]}
			/>
		</FieldBox>
	</div>

	{#if name}
		<input type="hidden" {name} value={value ?? ''} />
	{/if}

	<!-- The list. onmousedown keeps the focus in the input while clicking an option. -->
	<ul
		id={listId}
		role="listbox"
		aria-label={label}
		hidden={!open}
		onmousedown={(event) => event.preventDefault()}
		class={[
			'absolute inset-x-0 z-20 max-h-(--size-dropdown-panel) overflow-y-auto',
			optionPanelClasses,
			openAbove ? 'bottom-full mb-8' : 'top-full mt-8'
		]}
	>
		{#each filtered as option, index (option.value)}
			<DropdownOption
				{option}
				id={optionId(index)}
				selected={option.value === value}
				active={index === activeIndex}
				onselect={() => choose(option)}
				onhover={() => (activeIndex = index)}
			/>
		{:else}
			<li role="presentation" class="px-16 py-12 type-ui-body-3-regular text-brand-text-secondary">
				{emptyText}
			</li>
		{/each}
	</ul>

	<FieldMessage {helperText} {error} {helperId} {errorId} />
</div>
