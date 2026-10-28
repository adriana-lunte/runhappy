<!--
	Menu — Runhappy design system
	Figma: UI Library | Runhappy → Components → menu (created 2026-10-28, rows = dropdown-item)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=205-2604
	Same panel and rows as the Dropdown list (shared in src/components/OptionList).

	A button that opens a short list of actions or choices (WAI-ARIA "menu button").
	  Enter / Space / ↓  open (focus on the chosen option, or the first)     ↑  open on the last option
	  ↑ / ↓  move (wraps, skips disabled)     Home / End  first / last
	  Enter / Space  choose and close         Escape  close and go back to the button
	  Tab or a click outside closes it.
	With `value`, the options are choices (menuitemradio: screen readers hear "checked"); the chosen one shows a check.
	Without it, they are plain actions (menuitem).
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { PhosphorIcon } from '#components/Icon';

	export interface MenuItem {
		/** Identifies the option. Must be unique in the menu. */
		value: string;
		/** Text of the option. */
		label: string;
		/** Icon before the label (any Phosphor icon). */
		icon?: PhosphorIcon;
		/** Can't be chosen. */
		disabled?: boolean;
	}

	/** Props a custom trigger must spread on its <button>. */
	export interface MenuTriggerProps {
		id: string;
		'aria-haspopup': 'menu';
		'aria-expanded': boolean;
		'aria-controls': string;
		onclick: () => void;
		onkeydown: (event: KeyboardEvent) => void;
	}

	export interface MenuProps {
		/** Name of the button and the menu (screen readers, tooltip). */
		label: string;
		/** Icon of the default button (an IconButton). Not needed with a custom `trigger`. */
		icon?: PhosphorIcon;
		/** The options. */
		items: MenuItem[];
		/** The chosen option, for menus of choices. Leave empty for menus of actions. */
		value?: string;
		/** Called when the user chooses an option. */
		onselect?: (value: string) => void;
		/** Opens below the button (default) or above it (e.g. at the bottom of the sidebar). */
		placement?: 'bottom' | 'top';
		/** Lines the panel up with the button's left edge (default) or right edge. */
		align?: 'start' | 'end';
		/** Where the default button's tooltip opens. */
		tooltipPlacement?: 'top' | 'right';
		/** A different button. It receives the props it must spread. */
		trigger?: Snippet<[MenuTriggerProps]>;
		/** Layout classes for the wrapper. */
		class?: string;
	}
</script>

<script lang="ts">
	import { IconButton } from '#components/IconButton';
	import { OptionContent, optionPanelClasses, optionRowClasses } from '#components/OptionList';

	let {
		label,
		icon,
		items,
		value,
		onselect,
		placement = 'bottom',
		align = 'start',
		tooltipPlacement = 'top',
		trigger,
		class: className
	}: MenuProps = $props();

	const uid = $props.id();
	const triggerId = `${uid}-trigger`;
	const menuId = `${uid}-menu`;
	const isChoice = $derived(value !== undefined);

	let open = $state(false);
	let activeIndex = $state(-1);
	let wrapper: HTMLDivElement;
	const optionEls: HTMLButtonElement[] = $state([]);

	const enabledIndexes = $derived(items.flatMap((item, index) => (item.disabled ? [] : [index])));

	function focusOption(index: number) {
		activeIndex = index;
		optionEls[index]?.focus();
	}

	function openMenu(focus: 'chosen' | 'last' = 'chosen') {
		open = true;
		const chosen = items.findIndex((item) => item.value === value && !item.disabled);
		const target =
			focus === 'last' ? enabledIndexes.at(-1) : chosen >= 0 ? chosen : enabledIndexes[0];
		// Wait for the panel to be shown before moving the focus into it.
		queueMicrotask(() => target !== undefined && focusOption(target));
	}

	function close(returnFocus = true) {
		open = false;
		activeIndex = -1;
		if (returnFocus) document.getElementById(triggerId)?.focus();
	}

	function choose(item: MenuItem) {
		if (item.disabled) return;
		onselect?.(item.value);
		close();
	}

	function move(step: 1 | -1) {
		const position = enabledIndexes.indexOf(activeIndex);
		const next = (position + step + enabledIndexes.length) % enabledIndexes.length;
		focusOption(enabledIndexes[next]);
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			openMenu(event.key === 'ArrowUp' ? 'last' : 'chosen');
		}
	}

	function handleMenuKeydown(event: KeyboardEvent) {
		const keys: Record<string, () => void> = {
			ArrowDown: () => move(1),
			ArrowUp: () => move(-1),
			Home: () => focusOption(enabledIndexes[0]),
			End: () => focusOption(enabledIndexes.at(-1) ?? 0),
			Escape: () => close()
		};
		if (event.key === 'Tab') return close(false);
		if (!(event.key in keys)) return;
		event.preventDefault();
		keys[event.key]();
	}

	function handleWindowPointerdown(event: PointerEvent) {
		if (open && !wrapper.contains(event.target as Node)) close(false);
	}

	const triggerProps: MenuTriggerProps = $derived({
		id: triggerId,
		'aria-haspopup': 'menu',
		'aria-expanded': open,
		'aria-controls': menuId,
		onclick: () => (open ? close() : openMenu()),
		onkeydown: handleTriggerKeydown
	});
</script>

<svelte:window onpointerdown={handleWindowPointerdown} />

<div bind:this={wrapper} class={['relative inline-flex', className]}>
	{#if trigger}
		{@render trigger(triggerProps)}
	{:else if icon}
		<IconButton {icon} {label} {tooltipPlacement} {...triggerProps} />
	{/if}

	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		id={menuId}
		role="menu"
		aria-label={label}
		hidden={!open}
		onkeydown={handleMenuKeydown}
		class={[
			'absolute z-20 w-max',
			optionPanelClasses,
			placement === 'top' ? 'bottom-full mb-8' : 'top-full mt-8',
			align === 'end' ? 'right-0' : 'left-0'
		]}
	>
		{#each items as item, index (item.value)}
			<button
				bind:this={optionEls[index]}
				type="button"
				role={isChoice ? 'menuitemradio' : 'menuitem'}
				aria-checked={isChoice ? item.value === value : undefined}
				aria-disabled={item.disabled || undefined}
				tabindex="-1"
				onclick={() => choose(item)}
				onmousemove={() => !item.disabled && focusOption(index)}
				class={[
					optionRowClasses(index === activeIndex, item.disabled),
					'w-full text-left outline-hidden'
				]}
			>
				<OptionContent
					label={item.label}
					icon={item.icon}
					selected={isChoice && item.value === value}
					disabled={item.disabled}
				/>
			</button>
		{/each}
	</div>
</div>
