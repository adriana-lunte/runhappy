<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import SearchField from './SearchField.svelte';

	const { Story } = defineMeta({
		title: 'Components/SearchField',
		component: SearchField,
		tags: ['autodocs'],
		args: {
			label: 'Label',
			placeholder: 'Placeholder text',
			helperText: 'This is a helptext',
			hideLabel: false,
			disabled: false,
			onsearch: fn(),
			onclear: fn()
		},
		argTypes: { error: { control: 'text' }, value: { control: 'text' } },
		parameters: {
			docs: {
				description: {
					component: [
						'Search input. When it has text, the search icon becomes a clear button (also Escape). Enter calls `onsearch`.',
						'Built from the shared field parts (FieldLabel, FieldBox, FieldMessage), like TextField.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=113-917)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-sm"><SearchField {...args} /></div>
	{/snippet}
</Story>

<Story name="With value" args={{ value: 'Typed' }}>
	{#snippet template(args)}
		<div class="max-w-sm"><SearchField {...args} /></div>
	{/snippet}
</Story>

<Story name="Error" args={{ value: 'Typed', error: 'This is an error message' }}>
	{#snippet template(args)}
		<div class="max-w-sm"><SearchField {...args} /></div>
	{/snippet}
</Story>

<Story name="Disabled" args={{ value: 'Typed', disabled: true }}>
	{#snippet template(args)}
		<div class="max-w-sm"><SearchField {...args} /></div>
	{/snippet}
</Story>

<!-- Overview of the Figma states. Hover a field with text to see the yellow background. -->
<Story name="All states" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="grid max-w-3xl grid-cols-2 gap-32">
			<SearchField label="Default" placeholder="Placeholder text" helperText="This is a helptext" />
			<SearchField label="Complete (has a value)" value="Typed" helperText="This is a helptext" />
			<SearchField label="Disabled" value="Typed" helperText="This is a helptext" disabled />
			<SearchField label="Error" value="Typed" error="This is an error message" />
			<SearchField label="With info" info="Search by name or email." placeholder="Search" />
			<SearchField label="Hidden label" hideLabel placeholder="Search" />
		</div>
	{/snippet}
</Story>

<!-- Behaviour test: Enter searches, the clear button and Escape empty the field. Runs with `npm run test`. -->
<Story
	name="Search and clear behaviour"
	args={{ onsearch: fn(), onclear: fn() }}
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole('searchbox', { name: 'Search runners' });

		await expect(canvas.queryByRole('button', { name: 'Clear Search runners' })).toBeNull();
		await userEvent.type(input, 'Adriana{Enter}');
		await expect(args.onsearch).toHaveBeenCalledWith('Adriana');

		const clearButton = canvas.getByRole('button', { name: 'Clear Search runners' });
		await userEvent.click(clearButton);
		await expect(input).toHaveValue('');
		await expect(input).toHaveFocus();
		await expect(args.onclear).toHaveBeenCalledTimes(1);

		await userEvent.type(input, 'Bel');
		await userEvent.keyboard('{Escape}');
		await expect(input).toHaveValue('');
		await expect(args.onclear).toHaveBeenCalledTimes(2);
	}}
>
	{#snippet template(args)}
		<div class="max-w-sm">
			<SearchField label="Search runners" onsearch={args.onsearch} onclear={args.onclear} />
		</div>
	{/snippet}
</Story>
