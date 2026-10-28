<!--
	Sidebar — Runhappy design system
	Figma: UI Library | Runhappy → Components → sidebar (State = open | collapsed, created 2026-10-28)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=206-3092

	The full sidebar column: logo and collapse button on top, the navigation in the middle (scrolls when it does
	not fit), and a footer (e.g. UserItem + ThemeSwitch). Background brand/background/default, divider
	ui/base/border on the right and under the logo.
	Collapsed (76 wide): symbol instead of the wordmark, icons only with names in tooltips, section titles hidden,
	footer stacked. The choice is remembered in the browser.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface SidebarProps {
		/** Name of the navigation for screen readers. */
		label?: string;
		/** Narrow column with icons only. Remembered in the browser. Use `bind:collapsed` to read it. */
		collapsed?: boolean;
		/** The navigation: SidebarSection blocks (or a list of SidebarItem / SidebarGroup). */
		children: Snippet;
		/** Bottom of the column, e.g. UserItem + ThemeSwitch. */
		footer?: Snippet;
		/** Layout classes (height, e.g. "h-dvh"). */
		class?: string;
	}
</script>

<script lang="ts">
	import { CaretDoubleLeftIcon, CaretDoubleRightIcon } from 'phosphor-svelte';
	import { IconButton } from '#components/IconButton';
	import { Logo } from '#components/Logo';
	import { setSidebarContext } from './context';

	let {
		label = 'Main',
		collapsed = $bindable(false),
		children,
		footer,
		class: className
	}: SidebarProps = $props();

	const STORAGE_KEY = 'runhappy-sidebar-collapsed';

	// Read the remembered choice once the page is in the browser.
	$effect(() => {
		try {
			if (localStorage.getItem(STORAGE_KEY) === 'true') collapsed = true;
		} catch {
			// Storage can be blocked (private mode).
		}
	});

	function setCollapsed(next: boolean) {
		collapsed = next;
		try {
			localStorage.setItem(STORAGE_KEY, String(next));
		} catch {
			// Not remembered, but still applied.
		}
	}

	setSidebarContext({
		get collapsed() {
			return collapsed;
		},
		expand: () => setCollapsed(false)
	});
</script>

<aside
	class={[
		'flex shrink-0 flex-col border-r border-ui-base-border bg-brand-background-default',
		'transition-all duration-150 motion-reduce:transition-none',
		collapsed ? 'w-(--size-sidebar-collapsed)' : 'w-(--size-sidebar)',
		className
	]}
>
	<!-- Top: logo + collapse button. -->
	<div
		class={[
			'flex border-b border-ui-base-border px-16 pt-20 pb-16',
			collapsed ? 'flex-col items-center gap-12' : 'items-center justify-between'
		]}
	>
		<Logo variant={collapsed ? 'symbol' : 'wordmark'} class="h-20 text-ui-base-foreground" />
		<!-- The 40 button sits in the 20 logo row without making the header taller. -->
		<IconButton
			icon={collapsed ? CaretDoubleRightIcon : CaretDoubleLeftIcon}
			regular
			label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
			tooltipPlacement={collapsed ? 'right' : 'top'}
			onclick={() => setCollapsed(!collapsed)}
			class={collapsed ? '' : '-my-10 -mr-10'}
		/>
	</div>

	<!-- Middle: the navigation. Scrolls on its own when it does not fit. -->
	<nav aria-label={label} class="flex flex-1 flex-col gap-24 overflow-y-auto px-12 pt-16 pb-16">
		{@render children()}
	</nav>

	<!-- Bottom: footer. -->
	{#if footer}
		<div
			class={['flex px-16 py-8', collapsed ? 'flex-col items-center gap-8' : 'items-center gap-8']}
		>
			{@render footer()}
		</div>
	{/if}
</aside>
