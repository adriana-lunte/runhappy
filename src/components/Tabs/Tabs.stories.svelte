<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { PlugsConnectedIcon, SquaresFourIcon, ArchiveIcon } from 'phosphor-svelte';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import Tabs from './Tabs.svelte';

	const items = [
		{ value: 'connected', label: 'Connected' },
		{ value: 'available', label: 'Available' },
		{ value: 'archived', label: 'Archived' }
	];
	const withExtras = [
		{ value: 'connected', label: 'Connected', icon: PlugsConnectedIcon, count: 3 },
		{ value: 'available', label: 'Available', icon: SquaresFourIcon, count: 12 },
		{ value: 'archived', label: 'Archived', icon: ArchiveIcon, count: 0, disabled: true }
	];
	const many = ['Connected', 'Available', 'Archived', 'Scheduled', 'Drafts', 'Sent', 'Failed'].map(
		(label) => ({ value: label.toLowerCase(), label })
	);
	const withDisabled = [
		{ value: 'connected', label: 'Connected' },
		{ value: 'available', label: 'Available', disabled: true },
		{ value: 'archived', label: 'Archived' }
	];

	const { Story } = defineMeta({
		title: 'Components/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		args: { label: 'Integrations', items, onchange: fn() },
		argTypes: {
			items: { control: false },
			panel: { control: false },
			value: { control: 'select', options: [undefined, ...items.map((item) => item.value)] }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'A row of tabs; each tab shows its own panel. Tab enters the row, ←/→ move and select, Home/End go to the ends. Disabled tabs are skipped.',
						'States: idle, hover, selected (inverted pill, decided 2026-10-27), keyboard focus and disabled. Optional icon and count.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=87-1942)'
					].join('\n\n')
				}
			}
		}
	});
</script>

{#snippet examplePanel(item: { label: string })}
	<p class="type-ui-body-2-regular text-ui-base-foreground">{item.label} panel</p>
{/snippet}

<Story name="Default">
	{#snippet template(args)}
		<Tabs {...args} panel={examplePanel} />
	{/snippet}
</Story>

<Story name="With icon and count" args={{ items: withExtras }}>
	{#snippet template(args)}
		<Tabs {...args} panel={examplePanel} />
	{/snippet}
</Story>

<Story name="With a disabled tab" args={{ items: withDisabled }}>
	{#snippet template(args)}
		<Tabs {...args} panel={examplePanel} />
	{/snippet}
</Story>

<!-- Behaviour test: arrows move and select, disabled tab is skipped, Home/End, click. Runs with `npm run test`. -->
<Story
	name="Keyboard behaviour"
	args={{ items: withDisabled, onchange: fn() }}
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const tabs = canvas.getAllByRole('tab');

		await expect(canvas.getByRole('tablist', { name: 'Integrations' })).toBeInTheDocument();
		await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Connected panel');

		await userEvent.tab();
		await expect(tabs[0]).toHaveFocus();

		// "Available" is disabled: ArrowRight jumps from Connected to Archived.
		await userEvent.keyboard('{ArrowRight}');
		await expect(tabs[2]).toHaveFocus();
		await expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
		await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Archived panel');
		await expect(args.onchange).toHaveBeenLastCalledWith('archived');

		await userEvent.keyboard('{ArrowRight}');
		await expect(tabs[0]).toHaveFocus();
		await userEvent.keyboard('{End}');
		await expect(tabs[2]).toHaveFocus();
		await userEvent.keyboard('{Home}');
		await expect(tabs[0]).toHaveFocus();

		// Only the selected tab is in the Tab order; the next Tab goes to the panel.
		await userEvent.tab();
		await expect(canvas.getByRole('tabpanel')).toHaveFocus();

		await userEvent.click(tabs[2]);
		await expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
		await expect(tabs[1]).toBeDisabled();
	}}
>
	{#snippet template(args)}
		<Tabs {...args} panel={examplePanel} />
	{/snippet}
</Story>

<!-- Tabs that don't fit scroll sideways. Test: the row scrolls and the last tab is brought into view. -->
<Story
	name="Many tabs (scroll)"
	args={{ items: many }}
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const row = canvas.getByRole('tablist');
		await expect(row.scrollWidth).toBeGreaterThan(row.clientWidth);

		await userEvent.tab();
		await userEvent.keyboard('{End}');
		const last = canvas.getByRole('tab', { name: 'Failed' });
		await expect(last).toHaveFocus();
		await expect(row.scrollLeft).toBeGreaterThan(0);
	}}
>
	{#snippet template(args)}
		<div class="max-w-xs"><Tabs {...args} panel={examplePanel} /></div>
	{/snippet}
</Story>

<!-- Overview of the Figma states. Hover or Tab to see hover and focus. -->
<Story name="All states" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="flex flex-col gap-32">
			<Tabs label="Plain" {items} panel={examplePanel} />
			<Tabs label="Second selected" {items} value="available" panel={examplePanel} />
			<Tabs label="With icon and count" items={withExtras} panel={examplePanel} />
			<Tabs label="With a disabled tab" items={withDisabled} panel={examplePanel} />
		</div>
	{/snippet}
</Story>
