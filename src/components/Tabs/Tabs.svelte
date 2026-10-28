<!--
	Tabs — Runhappy design system
	Figma: UI Library | Runhappy → Components → Tab
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=87-1942

	A row of tabs; each tab shows its own panel below (WAI-ARIA tabs pattern).
	Keyboard: Tab enters the row on the selected tab, ←/→ move and select (selection follows focus),
	Home/End go to the first/last tab. Disabled tabs are skipped.
	Selected: inverted pill (ui-base-foreground background, ui-base-background text), decided 2026-10-27 —
	Figma's gray pill was identical to hover and only 1.25:1 against the page.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { PhosphorIcon } from '#components/Icon';

	export interface TabItem {
		/** Identifies the tab. Must be unique in the row. */
		value: string;
		/** Text on the tab. */
		label: string;
		/** Icon before the label (any Phosphor icon). Decorative: hidden from screen readers. */
		icon?: PhosphorIcon;
		/** Number after the label, e.g. how many items the panel has. */
		count?: number;
		/** Can't be selected. */
		disabled?: boolean;
	}

	export interface TabsProps {
		/** Name of the tab row for screen readers (not shown). */
		label: string;
		/** The tabs. */
		items: TabItem[];
		/** The selected tab's value. Defaults to the first enabled tab. Use `bind:value` to read it. */
		value?: string;
		/** Called when the user selects a tab. */
		onchange?: (value: string) => void;
		/** Content of each tab's panel. Receives the tab it belongs to. */
		panel: Snippet<[TabItem]>;
		/** Layout classes for the whole component (width, margin). */
		class?: string;
	}
</script>

<script lang="ts">
	import { Icon } from '#components/Icon';

	let {
		label,
		items,
		value = $bindable(),
		onchange,
		panel,
		class: className
	}: TabsProps = $props();

	const uid = $props.id();
	const tabId = (item: TabItem) => `${uid}-tab-${item.value}`;
	const panelId = (item: TabItem) => `${uid}-panel-${item.value}`;

	const enabled = $derived(items.filter((item) => !item.disabled));
	const selected = $derived(value ?? enabled[0]?.value);

	let tabs: Record<string, HTMLButtonElement> = {};

	function select(item: TabItem) {
		if (item.disabled || item.value === selected) return;
		value = item.value;
		onchange?.(item.value);
	}

	// Moves focus (and selection) along the enabled tabs, wrapping at both ends.
	function handleKeydown(event: KeyboardEvent) {
		const index = enabled.findIndex((item) => item.value === selected);
		const last = enabled.length - 1;
		const next: Record<string, number> = {
			ArrowRight: index === last ? 0 : index + 1,
			ArrowLeft: index <= 0 ? last : index - 1,
			Home: 0,
			End: last
		};
		if (!(event.key in next)) return;
		event.preventDefault();
		const target = enabled[next[event.key]];
		select(target);
		tabs[target.value]?.focus();
	}
</script>

<div class={['flex flex-col gap-16', className]}>
	<!-- Tabs that don't fit scroll sideways (decided 2026-10-28). The 8 padding keeps the focus ring (gap + ring
	     + halo = 6) from being cut by the scroll area; the -8 margin keeps the row aligned with the content. -->
	<div role="tablist" aria-label={label} class="-m-8 flex gap-8 overflow-x-auto p-8">
		{#each items as item (item.value)}
			{@const isSelected = item.value === selected}
			<button
				bind:this={tabs[item.value]}
				type="button"
				role="tab"
				id={tabId(item)}
				aria-selected={isSelected}
				aria-controls={panelId(item)}
				tabindex={isSelected ? 0 : -1}
				disabled={item.disabled}
				onclick={() => select(item)}
				onkeydown={handleKeydown}
				class={[
					// Layout: Figma auto layout — padding 10/16, gap 8, hug content, pill shape.
					'inline-flex shrink-0 items-center gap-8 rounded-full px-16 py-10 whitespace-nowrap',
					// focus-ring-offset: a gap so the dark ring doesn't touch the dark selected pill (decided 2026-10-28).
					'cursor-pointer type-ui-button focus-ring-offset transition-colors duration-150 motion-reduce:transition-none',
					isSelected
						? 'bg-ui-base-foreground text-ui-base-background'
						: 'bg-transparent text-ui-base-foreground enabled:hover:bg-brand-neutral-warm-gray-mid',
					'disabled:cursor-not-allowed disabled:text-ui-ui-elements-muted-foreground'
				]}
			>
				{#if item.icon}
					<Icon icon={item.icon} class="size-20" />
				{/if}
				{item.label}
				{#if item.count !== undefined}
					<span>{item.count}</span>
				{/if}
			</button>
		{/each}
	</div>

	{#each items as item (item.value)}
		<div
			role="tabpanel"
			id={panelId(item)}
			aria-labelledby={tabId(item)}
			tabindex="0"
			hidden={item.value !== selected}
			class="focus-ring"
		>
			{@render panel(item)}
		</div>
	{/each}
</div>
