<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CalendarDotsIcon as CalendarDots } from 'phosphor-svelte';
	import { expect, userEvent, waitFor, within } from 'storybook/test';
	import TextField from './TextField.svelte';
	import EmailFormExample from './EmailFormExample.svelte';

	const icons = { None: undefined, CalendarDots };

	const { Story } = defineMeta({
		title: 'Components/TextField',
		component: TextField,
		tags: ['autodocs'],
		args: {
			label: 'Label',
			placeholder: 'Placeholder text',
			helperText: 'This is a helptext',
			maxlength: 40,
			showCounter: true,
			hideLabel: false,
			disabled: false
		},
		argTypes: {
			icon: { control: 'select', options: Object.keys(icons), mapping: icons },
			error: { control: 'text' },
			value: { control: 'text' }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Single-line text input with label, help text, counter and error message.',
						'Typing and Complete from Figma are not props: they happen when the field has focus or a value.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=96-2131)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-sm"><TextField {...args} /></div>
	{/snippet}
</Story>

<Story name="With info tooltip" args={{ info: 'We use it to send your race confirmation.' }}>
	{#snippet template(args)}
		<div class="max-w-sm pt-48"><TextField {...args} /></div>
	{/snippet}
</Story>

<Story name="With icon" args={{ icon: CalendarDots, placeholder: 'Select a date' }}>
	{#snippet template(args)}
		<div class="max-w-sm"><TextField {...args} /></div>
	{/snippet}
</Story>

<Story name="Error" args={{ value: 'Typed', error: 'This is an error message' }}>
	{#snippet template(args)}
		<div class="max-w-sm"><TextField {...args} /></div>
	{/snippet}
</Story>

<Story name="Disabled" args={{ value: 'Typed', disabled: true }}>
	{#snippet template(args)}
		<div class="max-w-sm"><TextField {...args} /></div>
	{/snippet}
</Story>

<Story name="Hidden label" args={{ hideLabel: true, helperText: undefined }}>
	{#snippet template(args)}
		<div class="max-w-sm"><TextField {...args} /></div>
	{/snippet}
</Story>

<!-- Overview of the Figma states. Click a field to see focus. -->
<Story name="All states" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="grid max-w-3xl grid-cols-2 gap-32">
			<TextField
				label="Default"
				placeholder="Placeholder text"
				helperText="This is a helptext"
				maxlength={40}
			/>
			<TextField
				label="Complete (has a value)"
				value="Typed"
				helperText="This is a helptext"
				maxlength={40}
			/>
			<TextField
				label="Disabled"
				value="Typed"
				helperText="This is a helptext"
				maxlength={40}
				disabled
			/>
			<TextField label="Error" value="Typed" error="This is an error message" maxlength={40} />
			<TextField label="With icon" icon={CalendarDots} placeholder="Select a date" />
			<TextField
				label="Hidden label"
				hideLabel
				placeholder="Label is only read by screen readers"
			/>
		</div>
	{/snippet}
</Story>

<!-- Example + test: a form validates the field with Zod. Runs with `npm run test`. -->
<Story
	name="Validation with Zod"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByLabelText('Email');

		await userEvent.type(input, 'not-an-email');
		await userEvent.tab();
		await expect(input).toHaveAttribute('aria-invalid', 'true');
		await expect(input).toHaveAccessibleDescription('Enter a valid email address');

		await userEvent.clear(input);
		await userEvent.type(input, 'runner@runhappy.com');
		await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
		await expect(input).not.toHaveAttribute('aria-invalid');
		await expect(canvas.getByRole('status')).toHaveTextContent('Valid: runner@runhappy.com');
	}}
>
	{#snippet template()}
		<EmailFormExample />
	{/snippet}
</Story>

<!-- Behaviour test: the Info button is named, focusable and describes itself with the tooltip text. -->
<Story
	name="Info tooltip behaviour"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const infoButton = canvas.getByRole('button', { name: 'More information about Email' });
		await expect(infoButton).toHaveAccessibleDescription(
			'We use it to send your race confirmation.'
		);
		await userEvent.tab();
		await expect(infoButton).toHaveFocus();
		await waitFor(() => expect(canvas.getByRole('tooltip')).toBeVisible());
	}}
>
	{#snippet template()}
		<div class="max-w-sm pt-48">
			<TextField label="Email" info="We use it to send your race confirmation." />
		</div>
	{/snippet}
</Story>
