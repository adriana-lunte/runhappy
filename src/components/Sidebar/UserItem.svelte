<!--
	UserItem — Runhappy design system
	Figma: UI Library | Runhappy → Components → user-item (type = expanded | collapsed, created 2026-10-28)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=206-2871

	The signed-in user at the bottom of the sidebar: avatar (photo, or the User icon), name, and a ⋮ button
	that opens a Menu with the actions the page passes. Name: UI/Body/3 Regular (closest library style).
	In a collapsed Sidebar only the avatar shows; it opens the same menu.
-->
<script lang="ts" module>
	import type { MenuItem } from '#components/Menu';

	export interface UserItemProps {
		/** The user's name. */
		name: string;
		/** Photo URL. Without it, the User icon is shown. */
		avatarSrc?: string;
		/** Options of the ⋮ menu (e.g. Profile, Log out). */
		actions?: MenuItem[];
		/** Called with the chosen action's `value`. */
		onaction?: (value: string) => void;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { DotsThreeVerticalIcon, UserIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';
	import { Menu } from '#components/Menu';
	import { Tooltip } from '#components/Tooltip';
	import { getSidebarContext } from './context';

	let { name, avatarSrc, actions = [], onaction, class: className }: UserItemProps = $props();

	const sidebar = getSidebarContext();
	const menuLabel = 'Account menu';
</script>

{#snippet avatar()}
	<span
		class="grid size-32 shrink-0 place-items-center overflow-hidden rounded-full bg-ui-surface-surface-100 inset-ring inset-ring-ui-base-border"
	>
		{#if avatarSrc}
			<img src={avatarSrc} alt="" class="size-full object-cover" />
		{:else}
			<Icon icon={UserIcon} class="size-20 text-ui-base-foreground" />
		{/if}
	</span>
{/snippet}

{#if sidebar.collapsed}
	<!-- Collapsed: the avatar is the menu button; its tooltip says whose account it is. -->
	<Menu label={menuLabel} items={actions} onselect={onaction} placement="top" class={className}>
		{#snippet trigger(menu)}
			<Tooltip
				text={`${name} — ${menuLabel}`}
				labels
				placement="right"
				suppressed={menu['aria-expanded']}
			>
				{#snippet trigger(tip)}
					<button
						type="button"
						{...menu}
						{...tip}
						onclick={() => {
							tip.onclick();
							menu.onclick();
						}}
						class="grid size-40 cursor-pointer place-items-center rounded-full focus-ring hover:bg-brand-neutral-warm-gray-mid aria-expanded:bg-brand-neutral-warm-gray-mid"
					>
						{@render avatar()}
					</button>
				{/snippet}
			</Tooltip>
		{/snippet}
	</Menu>
{:else}
	<div class={['flex min-w-0 flex-1 items-center gap-12', className]}>
		{@render avatar()}
		<span class="min-w-0 flex-1 truncate type-ui-body-3-regular text-ui-base-foreground"
			>{name}</span
		>
		{#if actions.length}
			<Menu
				label={menuLabel}
				icon={DotsThreeVerticalIcon}
				items={actions}
				onselect={onaction}
				placement="top"
				align="end"
			/>
		{/if}
	</div>
{/if}
