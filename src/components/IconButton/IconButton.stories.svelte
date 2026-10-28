<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CaretDoubleLeftIcon, DotsThreeVerticalIcon, SunIcon } from 'phosphor-svelte';
	import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
	import IconButton from './IconButton.svelte';

	const icons = { SunIcon, DotsThreeVerticalIcon };

	const { Story } = defineMeta({
		title: 'Components/IconButton',
		component: IconButton,
		tags: ['autodocs'],
		args: { icon: SunIcon, label: 'Theme', disabled: false, onclick: fn() },
		argTypes: {
			icon: { control: 'select', options: Object.keys(icons), mapping: icons },
			tooltipPlacement: { control: 'inline-radio', options: ['top', 'right'] }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Round 40×40 button with only an icon. States: idle, hover (warm gray mid), pressed (98%), keyboard focus, disabled, and "menu open" (same gray).',
						'`label` is required: it is the name screen readers read and the text of the tooltip (hover and keyboard focus).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=205-2598)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="pt-48"><IconButton {...args} /></div>
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet template(args)}
		<div class="pt-48"><IconButton {...args} /></div>
	{/snippet}
</Story>

<!-- Every state. Hover or Tab to see hover, focus and the tooltip. -->
<Story name="All states" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="flex gap-16 pt-48">
			<IconButton icon={SunIcon} label="Theme" />
			<IconButton icon={DotsThreeVerticalIcon} label="Account menu" aria-expanded="true" />
			<IconButton icon={CaretDoubleLeftIcon} regular label="Collapse sidebar" />
			<IconButton icon={SunIcon} label="Theme" disabled />
		</div>
	{/snippet}
</Story>

<!-- Test: the label is the button's name (read once) and shows in the tooltip on keyboard focus. -->
<Story
	name="Name and tooltip"
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Theme' });
		await expect(button).not.toHaveAccessibleDescription();

		await userEvent.tab();
		await expect(button).toHaveFocus();
		await waitFor(() => expect(canvas.getByRole('tooltip')).toBeVisible());

		await userEvent.keyboard('{Enter}');
		await expect(args.onclick).toHaveBeenCalled();
	}}
>
	{#snippet template(args)}
		<div class="pt-48"><IconButton icon={SunIcon} label="Theme" onclick={args.onclick} /></div>
	{/snippet}
</Story>
