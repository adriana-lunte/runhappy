<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { HouseIcon } from 'phosphor-svelte';
	import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
	import Dropdown from './Dropdown.svelte';
	import ChannelFormExample from './ChannelFormExample.svelte';

	const options = [
		{ value: 'instagram', label: '@instagram_user', icon: HouseIcon },
		{ value: 'facebook', label: 'Facebook User', icon: HouseIcon },
		{ value: 'whatsapp', label: 'WhatsApp +123456789', icon: HouseIcon },
		{ value: 'sms', label: 'SMS +123456789', icon: HouseIcon }
	];
	const withDescriptions = [
		{ value: 'home', label: 'Home', description: 'Description', icon: HouseIcon },
		{ value: 'office', label: 'Office', description: 'Description', icon: HouseIcon },
		{ value: 'other', label: 'Other', description: 'Description', icon: HouseIcon, disabled: true }
	];

	const { Story } = defineMeta({
		title: 'Components/Dropdown',
		component: Dropdown,
		tags: ['autodocs'],
		args: {
			label: 'Label',
			options,
			hideLabel: false,
			disabled: false,
			onchange: fn()
		},
		argTypes: {
			options: { control: false },
			icon: { control: false },
			error: { control: 'text' },
			value: { control: 'select', options: [undefined, ...options.map((o) => o.value)] }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Searchable dropdown (WAI-ARIA editable combobox): type to filter, ↓/↑ to move, Enter to choose, Escape to close.',
						'Built from the shared field parts. The chosen option shows a check.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=102-2855)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-sm pb-64"><Dropdown {...args} /></div>
	{/snippet}
</Story>

<Story name="With value" args={{ value: 'instagram', info: 'Where we contact you.' }}>
	{#snippet template(args)}
		<div class="max-w-sm pt-48 pb-64"><Dropdown {...args} /></div>
	{/snippet}
</Story>

<Story name="Two lines and disabled option" args={{ options: withDescriptions }}>
	{#snippet template(args)}
		<div class="max-w-sm pb-64"><Dropdown {...args} /></div>
	{/snippet}
</Story>

<Story name="Error" args={{ error: 'Choose a channel' }}>
	{#snippet template(args)}
		<div class="max-w-sm pb-64"><Dropdown {...args} /></div>
	{/snippet}
</Story>

<Story name="Disabled" args={{ value: 'instagram', disabled: true }}>
	{#snippet template(args)}
		<div class="max-w-sm"><Dropdown {...args} /></div>
	{/snippet}
</Story>

<!-- Behaviour test: keyboard, filter, choose, Escape. Runs with `npm run test`. -->
<Story
	name="Keyboard and search behaviour"
	args={{ onchange: fn() }}
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('combobox', { name: 'Channel' });
		const list = canvas.getByRole('listbox', { hidden: true });

		await userEvent.tab();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await expect(input).toHaveAttribute('aria-expanded', 'true');
		await expect(list).toBeVisible();

		// Typing filters the list; the first match becomes active.
		await userEvent.type(input, 'whats');
		const opts = within(list).getAllByRole('option');
		await expect(opts).toHaveLength(1);
		await expect(input).toHaveAttribute('aria-activedescendant', opts[0].id);

		await userEvent.keyboard('{Enter}');
		await expect(args.onchange).toHaveBeenCalledWith('whatsapp');
		await expect(input).toHaveValue('WhatsApp +123456789');
		await expect(input).toHaveAttribute('aria-expanded', 'false');

		// Reopen: the chosen option is selected; Escape closes and keeps the value.
		await userEvent.keyboard('{ArrowDown}');
		await waitFor(() =>
			expect(within(list).getByRole('option', { selected: true })).toHaveTextContent('WhatsApp')
		);
		await userEvent.keyboard('{Escape}');
		await expect(input).toHaveAttribute('aria-expanded', 'false');
		await expect(input).toHaveValue('WhatsApp +123456789');
	}}
>
	{#snippet template(args)}
		<div class="max-w-sm pb-64">
			<Dropdown label="Channel" {options} onchange={args.onchange} />
		</div>
	{/snippet}
</Story>

<!-- Example + test: a required Dropdown validated with Zod. -->
<Story
	name="Validation with Zod"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
		const input = canvas.getByRole('combobox', { name: 'Channel' });
		await expect(input).toHaveAttribute('aria-invalid', 'true');
		await expect(input).toHaveAccessibleDescription('Choose a channel');

		await userEvent.click(input);
		await userEvent.click(canvas.getByRole('option', { name: 'Facebook User' }));
		await expect(input).not.toHaveAttribute('aria-invalid');
		await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
		await expect(canvas.getByRole('status')).toHaveTextContent('Valid: facebook');
	}}
>
	{#snippet template()}
		<div class="pb-64"><ChannelFormExample /></div>
	{/snippet}
</Story>
