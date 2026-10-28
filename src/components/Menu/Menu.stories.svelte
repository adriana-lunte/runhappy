<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		DotsThreeVerticalIcon,
		MonitorIcon,
		MoonIcon,
		SignOutIcon,
		SunIcon,
		UserIcon
	} from 'phosphor-svelte';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import Menu from './Menu.svelte';

	const actions = [
		{ value: 'profile', label: 'Profile', icon: UserIcon },
		{ value: 'logout', label: 'Log out', icon: SignOutIcon }
	];
	const choices = [
		{ value: 'system', label: 'System', icon: MonitorIcon },
		{ value: 'light', label: 'Light', icon: SunIcon },
		{ value: 'dark', label: 'Dark', icon: MoonIcon, disabled: true }
	];

	const { Story } = defineMeta({
		title: 'Components/Menu',
		component: Menu,
		tags: ['autodocs'],
		args: { label: 'Account menu', icon: DotsThreeVerticalIcon, items: actions, onselect: fn() },
		argTypes: {
			items: { control: false },
			icon: { control: false },
			trigger: { control: false },
			placement: { control: 'inline-radio', options: ['bottom', 'top'] },
			align: { control: 'inline-radio', options: ['start', 'end'] }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'A button that opens a short list of actions or choices (WAI-ARIA menu button). Same panel and rows as the Dropdown list.',
						'Enter / Space / ↓ open; ↑ ↓ Home End move; Enter chooses; Escape closes and returns to the button; Tab or a click outside closes.',
						'With `value` the options are choices and the chosen one shows a check.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=205-2604)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Actions">
	{#snippet template(args)}
		<div class="min-h-(--size-dropdown-panel) pt-48"><Menu {...args} /></div>
	{/snippet}
</Story>

<Story name="Choices" args={{ label: 'Theme', icon: MonitorIcon, items: choices, value: 'system' }}>
	{#snippet template(args)}
		<div class="min-h-(--size-dropdown-panel) pt-48"><Menu {...args} /></div>
	{/snippet}
</Story>

<!-- Behaviour test: open with the keyboard, move (disabled skipped), choose, Escape returns focus. -->
<Story
	name="Keyboard behaviour"
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Theme' });

		await userEvent.tab();
		await userEvent.keyboard('{ArrowDown}');
		await expect(button).toHaveAttribute('aria-expanded', 'true');
		const system = canvas.getByRole('menuitemradio', { name: 'System' });
		await expect(system).toHaveFocus();
		await expect(system).toHaveAttribute('aria-checked', 'true');

		// "Dark" is disabled: ↓ from Light wraps to System.
		await userEvent.keyboard('{ArrowDown}');
		await expect(canvas.getByRole('menuitemradio', { name: 'Light' })).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await expect(system).toHaveFocus();

		await userEvent.keyboard('{End}{Enter}');
		await expect(args.onselect).toHaveBeenLastCalledWith('light');
		await expect(button).toHaveAttribute('aria-expanded', 'false');
		await expect(button).toHaveFocus();

		await userEvent.keyboard('{Enter}');
		await userEvent.keyboard('{Escape}');
		await expect(button).toHaveAttribute('aria-expanded', 'false');
		await expect(button).toHaveFocus();
	}}
>
	{#snippet template(args)}
		<div class="min-h-(--size-dropdown-panel) pt-48">
			<Menu
				label="Theme"
				icon={MonitorIcon}
				items={choices}
				value="system"
				onselect={args.onselect}
			/>
		</div>
	{/snippet}
</Story>
