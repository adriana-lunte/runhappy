<!--
	SidebarItem — Runhappy design system
	Figma: UI Library | Runhappy → Components → sidebar-item
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=70-1407

	A link to a page in the sidebar. The current page is selected: yellow-tint background, semibold text
	and the icon's yellow layer (as in Figma); screen readers hear "current page" (aria-current).
	Hover uses the same background as selected (decided 2026-10-27: keep Figma's look).
	Inside a SidebarGroup it is a sub-item: no icon, text aligned with the group's text.
	In a collapsed Sidebar it shows the icon only; the name is in a tooltip on the right (decided 2026-10-28).
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	/** Row look shared by SidebarItem and the SidebarGroup button. */
	export function sidebarRowClasses(current: boolean) {
		return [
			// Layout: Figma auto layout — padding 12/16, gap 12, fills the sidebar width.
			'flex w-full items-center gap-12 rounded-sm px-16 py-12 text-left',
			'cursor-pointer text-brand-text-primary focus-ring transition-colors duration-150 motion-reduce:transition-none',
			'hover:bg-brand-accent-yellow-background',
			current
				? 'bg-brand-accent-yellow-background type-ui-body-4-semibold'
				: 'type-ui-body-4-regular'
		];
	}

	export interface SidebarItemProps extends HTMLAnchorAttributes {
		/** Page the item links to. */
		href: string;
		/** Text on the item. */
		label: string;
		/** Icon before the label (any Phosphor icon). Decorative. Not shown on sub-items. */
		icon?: PhosphorIcon;
		/** This item is the page the user is on. */
		current?: boolean;
		/** Sub-item of a SidebarGroup (set by SidebarGroup): no icon, indented text. */
		nested?: boolean;
	}
</script>

<script lang="ts">
	import { Icon } from '#components/Icon';
	import { Tooltip, type TooltipTriggerProps } from '#components/Tooltip';
	import { getSidebarContext } from './context';

	let {
		href,
		label,
		icon,
		current = false,
		nested = false,
		class: className,
		...rest
	}: SidebarItemProps = $props();

	const sidebar = getSidebarContext();
	const iconOnly = $derived(sidebar.collapsed && !nested);
</script>

{#snippet link(tip?: TooltipTriggerProps)}
	<!-- The page passes `href` already resolved (SvelteKit `resolve()`), so the component does not resolve it again. -->
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		{href}
		aria-current={current ? 'page' : undefined}
		class={[
			sidebarRowClasses(current),
			// Sub-item text starts where the group's text starts: 16 padding + 20 icon + 12 gap.
			nested && 'pl-48',
			className
		]}
		{...rest}
		{...tip}
	>
		{#if icon && !nested}
			<Icon {icon} duotone={current} class="size-20" />
		{/if}
		{#if !iconOnly}
			<span class="min-w-0 flex-1">{label}</span>
		{/if}
	</a>
	<!-- eslint-enable svelte/no-navigation-without-resolve -->
{/snippet}

{#if iconOnly}
	<Tooltip text={label} labels placement="right">
		{#snippet trigger(tip)}{@render link(tip)}{/snippet}
	</Tooltip>
{:else}
	{@render link()}
{/if}
