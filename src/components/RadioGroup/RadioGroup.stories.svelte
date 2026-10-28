<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import RadioGroup from './RadioGroup.svelte';

	const options = [
		{ value: '5k', label: '5K' },
		{ value: '10k', label: '10K', description: 'Most popular' },
		{ value: 'half', label: 'Half marathon' },
		{ value: 'full', label: 'Marathon', disabled: true }
	];

	const { Story } = defineMeta({
		title: 'Components/RadioGroup',
		component: RadioGroup,
		tags: ['autodocs'],
		args: { label: 'Distance', options, size: 'medium', disabled: false, onchange: fn() },
		argTypes: {
			options: { control: false },
			size: { control: 'inline-radio', options: ['medium', 'small'] },
			value: { control: 'select', options: [undefined, ...options.map((o) => o.value)] },
			error: { control: 'text' },
			helperText: { control: 'text' }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Choose one option. Native radios in a fieldset: Tab enters the group, arrow keys move and choose.',
						'The chosen radio: dark dot on yellow (decided 2026-10-27).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=202-2183)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default" args={{ value: '10k' }} />

<Story name="Small" args={{ value: '5k', size: 'small' }} />

<Story name="Error" args={{ error: 'Choose a distance' }} />

<Story name="Disabled group" args={{ value: '10k', disabled: true }} />

<!-- Behaviour test: arrows move and choose, disabled option is skipped. Runs with `npm run test`. -->
<Story
	name="Keyboard behaviour"
	args={{ onchange: fn() }}
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole('group', { name: 'Distance' })).toBeInTheDocument();
		const radios = canvas.getAllByRole('radio');

		await userEvent.click(radios[0]);
		await expect(radios[0]).toBeChecked();
		await userEvent.keyboard('{ArrowDown}');
		await expect(radios[1]).toBeChecked();
		await expect(radios[1]).toHaveFocus();
		await expect(args.onchange).toHaveBeenLastCalledWith('10k');

		// The disabled "Marathon" is skipped: from the last enabled option, ArrowDown wraps to the first.
		await userEvent.keyboard('{ArrowDown}{ArrowDown}');
		await expect(radios[0]).toBeChecked();
		await expect(radios[3]).toBeDisabled();
	}}
>
	{#snippet template(args)}
		<RadioGroup label="Distance" {options} onchange={args.onchange} />
	{/snippet}
</Story>
