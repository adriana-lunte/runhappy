<!--
	SidebarSection — Runhappy design system
	Figma: UI Library | Runhappy → Components → sidebar-section (created 2026-10-28)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=206-2830

	A titled group of sidebar items. Title: uppercase, brand/text/secondary, UI/Overline/1 (confirmed by Adriana
	on 2026-10-28; the example screens used an old font). Items 2 apart (decided 2026-10-28).
	In a collapsed Sidebar the title is hidden visually but still read by screen readers.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface SidebarSectionProps {
		/** Section title, e.g. "AI in action" (shown uppercase). */
		title: string;
		/** The items: one <li> per SidebarItem or SidebarGroup. */
		children: Snippet;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { getSidebarContext } from './context';

	let { title, children, class: className }: SidebarSectionProps = $props();

	const uid = $props.id();
	const titleId = `${uid}-title`;
	const sidebar = getSidebarContext();
</script>

<section aria-labelledby={titleId} class={['flex flex-col gap-2', className]}>
	<h2
		id={titleId}
		class={[
			'px-16 py-4 type-ui-overline-1 text-brand-text-secondary uppercase',
			sidebar.collapsed && 'sr-only'
		]}
	>
		{title}
	</h2>
	<ul class="flex flex-col gap-2">
		{@render children()}
	</ul>
</section>
