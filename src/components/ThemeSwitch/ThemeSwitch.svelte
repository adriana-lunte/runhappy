<!--
	ThemeSwitch — Runhappy design system
	Figma: UI Library | Runhappy → Components → theme-switch (created 2026-10-28; option B: sidebar footer)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=205-2794

	An IconButton + Menu to choose the color mode: System (follow the device, the default), Light or Dark.
	The button shows the current choice: Monitor, Sun or Moon. Name and tooltip: "Theme".
	The choice is applied at once and remembered in the browser (src/lib/theme.ts).
-->
<script lang="ts" module>
	export interface ThemeSwitchProps {
		/** Opens the menu above the button (default, for the sidebar footer) or below it. */
		placement?: 'top' | 'bottom';
		/** Lines the menu up with the button's left or right edge. */
		align?: 'start' | 'end';
		/** Where the button's tooltip opens. */
		tooltipPlacement?: 'top' | 'right';
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { MonitorIcon, MoonIcon, SunIcon } from 'phosphor-svelte';
	import { Menu } from '#components/Menu';
	import { getThemePreference, setThemePreference, type ThemePreference } from '#lib/theme.ts';

	let {
		placement = 'top',
		align = 'start',
		tooltipPlacement = 'top',
		class: className
	}: ThemeSwitchProps = $props();

	const items = [
		{ value: 'system', label: 'System', icon: MonitorIcon },
		{ value: 'light', label: 'Light', icon: SunIcon },
		{ value: 'dark', label: 'Dark', icon: MoonIcon }
	] satisfies { value: ThemePreference; label: string; icon: unknown }[];

	// "system" while rendering on the server; the saved choice is read once the page is in the browser.
	let preference = $state<ThemePreference>('system');
	onMount(() => {
		preference = getThemePreference();
	});

	const currentIcon = $derived(
		items.find((item) => item.value === preference)?.icon ?? MonitorIcon
	);

	function choose(value: string) {
		preference = value as ThemePreference;
		setThemePreference(preference);
	}
</script>

<Menu
	label="Theme"
	icon={currentIcon}
	{items}
	value={preference}
	onselect={choose}
	{placement}
	{align}
	{tooltipPlacement}
	class={className}
/>
