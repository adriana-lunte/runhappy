<!--
	SidebarGroup — Runhappy design system
	Figma: UI Library | Runhappy → Components → sidebar-item (the hidden "CaretDown Regular")
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=70-1407

	A sidebar row that opens and closes a list of sub-items (decided 2026-10-27; sub-items are not in Figma yet).
	The row only toggles, it is not a link. Screen readers hear "expanded" / "collapsed" (aria-expanded).
	It starts open when one of its sub-items is the current page, so the selected item is always visible.
	In a collapsed Sidebar: icon only with its name in a tooltip; clicking it opens the column and the group.
	While collapsed, a group that holds the current page shows the selected look (to confirm, 2026-10-28).
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';

	export interface SidebarGroupLink {
		/** Page the sub-item links to. */
		href: string;
		/** Text on the sub-item. */
		label: string;
		/** This sub-item is the page the user is on. */
		current?: boolean;
	}

	export interface SidebarGroupProps {
		/** Text on the group row. */
		label: string;
		/** Icon before the label (any Phosphor icon). Decorative. */
		icon?: PhosphorIcon;
		/** The sub-items. */
		items: SidebarGroupLink[];
		/** Whether the list is shown. Defaults to open when a sub-item is the current page. Use `bind:open`. */
		open?: boolean;
		/** Layout classes (margin). */
		class?: string;
	}
</script>

<script lang="ts">
	import { CaretDownIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';
	import { Tooltip, type TooltipTriggerProps } from '#components/Tooltip';
	import { getSidebarContext } from './context';
	import SidebarItem, { sidebarRowClasses } from './SidebarItem.svelte';

	let {
		label,
		icon,
		items,
		open = $bindable(items.some((item) => item.current)),
		class: className
	}: SidebarGroupProps = $props();

	const uid = $props.id();
	const listId = `${uid}-list`;
	const sidebar = getSidebarContext();
	const hasCurrent = $derived(items.some((item) => item.current));
	// While the column is collapsed the sub-items are not shown.
	const expanded = $derived(open && !sidebar.collapsed);

	function toggle() {
		if (sidebar.collapsed) {
			// Collapsed: open the column and the group (decided 2026-10-28).
			sidebar.expand();
			open = true;
		} else {
			open = !open;
		}
	}
</script>

{#snippet row(tip?: TooltipTriggerProps)}
	<button
		type="button"
		aria-expanded={expanded}
		aria-controls={listId}
		{...tip}
		onclick={() => {
			tip?.onclick();
			toggle();
		}}
		class={sidebarRowClasses(sidebar.collapsed && hasCurrent)}
	>
		{#if icon}
			<Icon {icon} duotone={sidebar.collapsed && hasCurrent} class="size-20" />
		{/if}
		{#if !sidebar.collapsed}
			<span class="min-w-0 flex-1">{label}</span>
			<Icon
				icon={CaretDownIcon}
				regular
				class={[
					'size-20 transition-transform duration-150 motion-reduce:transition-none',
					open && 'rotate-180'
				]}
			/>
		{/if}
	</button>
{/snippet}

<div class={className}>
	{#if sidebar.collapsed}
		<Tooltip text={label} labels placement="right">
			{#snippet trigger(tip)}{@render row(tip)}{/snippet}
		</Tooltip>
	{:else}
		{@render row()}
	{/if}
	<!-- Items 2 apart, as in the Figma example screens (decided 2026-10-28). -->
	<ul id={listId} hidden={!expanded} class="mt-2 flex flex-col gap-2">
		{#each items as item (item.href)}
			<li><SidebarItem href={item.href} label={item.label} current={item.current} nested /></li>
		{/each}
	</ul>
</div>
