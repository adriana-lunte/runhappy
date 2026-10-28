<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		ChatsIcon,
		GearIcon,
		HouseIcon,
		ImageIcon,
		LightbulbIcon,
		SignOutIcon,
		SignpostIcon,
		UserIcon
	} from 'phosphor-svelte';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import { ThemeSwitch } from '#components/ThemeSwitch';
	import Sidebar from './Sidebar.svelte';
	import SidebarGroup from './SidebarGroup.svelte';
	import SidebarItem from './SidebarItem.svelte';
	import SidebarSection from './SidebarSection.svelte';
	import UserItem from './UserItem.svelte';

	const { Story } = defineMeta({
		title: 'Components/Sidebar',
		component: Sidebar,
		tags: ['autodocs'],
		args: { collapsed: false },
		argTypes: { children: { control: false }, footer: { control: false } },
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: [
						'**Sidebar**: the full column (258 wide). Logo and collapse button on top, navigation in the middle (scrolls when it does not fit), footer with **UserItem** and **ThemeSwitch**.',
						'**Collapsed** (76 wide): symbol logo, icons only with names in tooltips on the right, section titles hidden, footer stacked. Remembered in the browser.',
						'**SidebarSection**: titled group of items, 2 apart; sections 24 apart. **SidebarItem**: a link (current page = selected). **SidebarGroup**: opens and closes sub-items.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=206-3092) · [sidebar-item](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=70-1407) · [sidebar-section](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=206-2830) · [user-item](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=206-2871)'
					].join('\n\n')
				}
			}
		}
	});

	const settings = [
		{ href: '#profile', label: 'Profile' },
		{ href: '#team', label: 'Team', current: true },
		{ href: '#billing', label: 'Billing' }
	];
	const userActions = [
		{ value: 'profile', label: 'Profile', icon: UserIcon },
		{ value: 'logout', label: 'Log out', icon: SignOutIcon }
	];
	const onaction = fn();
</script>

{#snippet navigation()}
	<ul class="flex flex-col gap-2">
		<li><SidebarItem href="#dashboard" label="Dashboard" icon={HouseIcon} /></li>
	</ul>
	<SidebarSection title="AI in action">
		<li><SidebarItem href="#scenarios" label="Scenarios" icon={SignpostIcon} /></li>
		<li><SidebarItem href="#agents" label="Agents" icon={LightbulbIcon} /></li>
	</SidebarSection>
	<SidebarSection title="Engagement">
		<li><SidebarItem href="#conversations" label="Conversations" icon={ChatsIcon} /></li>
		<li><SidebarItem href="#media" label="Media" icon={ImageIcon} /></li>
		<li><SidebarGroup label="Settings" icon={GearIcon} items={settings} /></li>
	</SidebarSection>
{/snippet}

{#snippet footer()}
	<UserItem name="Sam Rivera" actions={userActions} {onaction} />
	<ThemeSwitch />
{/snippet}

<Story name="Full sidebar">
	{#snippet template(args)}
		<Sidebar {...args} class="h-dvh" children={navigation} {footer} />
	{/snippet}
</Story>

<Story name="Collapsed" args={{ collapsed: true }}>
	{#snippet template(args)}
		<Sidebar {...args} class="h-dvh" children={navigation} {footer} />
	{/snippet}
</Story>

<!-- Test: collapse, names stay available (tooltips), a group click opens the column and the group. -->
<Story
	name="Collapse and expand"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const sections = canvas.getAllByRole('heading', { level: 2 });

		await userEvent.click(canvas.getByRole('button', { name: 'Collapse sidebar' }));
		await expect(canvas.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument();
		await expect(sections[0]).toHaveClass('sr-only');
		// Icons only, but every link keeps its name.
		await expect(canvas.getByRole('link', { name: 'Scenarios' })).toBeInTheDocument();
		await expect(canvas.queryByRole('link', { name: 'Team' })).not.toBeInTheDocument();

		await userEvent.click(canvas.getByRole('button', { name: 'Settings' }));
		await expect(canvas.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: 'Settings' })).toHaveAttribute(
			'aria-expanded',
			'true'
		);
		await expect(canvas.getByRole('link', { name: 'Team' })).toHaveAttribute(
			'aria-current',
			'page'
		);
	}}
>
	{#snippet template()}
		<Sidebar class="h-dvh" children={navigation} {footer} />
	{/snippet}
</Story>

<!-- Test: the group opens and closes with mouse and keyboard; the user menu opens above and runs an action. -->
<Story
	name="Group and user menu"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const group = canvas.getByRole('button', { name: 'Settings' });

		await expect(group).toHaveAttribute('aria-expanded', 'true');
		await userEvent.click(group);
		await expect(group).toHaveAttribute('aria-expanded', 'false');
		group.focus();
		await userEvent.keyboard('{Enter}');
		await expect(group).toHaveAttribute('aria-expanded', 'true');

		await userEvent.click(canvas.getByRole('button', { name: 'Account menu' }));
		await userEvent.click(canvas.getByRole('menuitem', { name: 'Log out' }));
		await expect(onaction).toHaveBeenLastCalledWith('logout');
	}}
>
	{#snippet template()}
		<Sidebar class="h-dvh" children={navigation} {footer} />
	{/snippet}
</Story>

<!-- Item states outside a column. Hover or Tab to see hover and focus. -->
<Story name="Item states" parameters={{ controls: { disable: true }, layout: 'padded' }}>
	{#snippet template()}
		<ul class="flex max-w-xs flex-col gap-2">
			<li><SidebarItem href="#idle" label="Idle" icon={ImageIcon} /></li>
			<li><SidebarItem href="#selected" label="Selected" icon={ImageIcon} current /></li>
			<li>
				<SidebarGroup label="Group, collapsed" icon={GearIcon} items={settings.slice(0, 1)} />
			</li>
			<li><SidebarGroup label="Group, expanded" icon={GearIcon} items={settings} /></li>
		</ul>
	{/snippet}
</Story>
