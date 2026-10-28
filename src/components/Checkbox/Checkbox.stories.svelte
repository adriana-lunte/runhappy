<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import Checkbox from './Checkbox.svelte';
	import TermsFormExample from './TermsFormExample.svelte';

	const { Story } = defineMeta({
		title: 'Components/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		args: {
			label: 'Check box',
			checked: false,
			indeterminate: false,
			disabled: false,
			size: 'medium'
		},
		argTypes: {
			size: { control: 'inline-radio', options: ['medium', 'small'] },
			error: { control: 'text' },
			description: { control: 'text' },
			helperText: { control: 'text' }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Native checkbox (Space toggles it; the label is clickable). States: unchecked, checked, indeterminate, hover, focus, disabled, error.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=107-3100)'
					].join('\n\n')
				}
			}
		}
	});

	const sizes = ['medium', 'small'] as const;
</script>

<Story name="Default" />

<Story name="With description" args={{ description: 'Supporting text', checked: true }} />

<Story name="Error" args={{ error: 'Accept the terms to continue' }} />

<!-- Overview of the Figma states, both sizes. Hover or Tab to see hover and focus. -->
<Story name="All states" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="grid grid-cols-2 gap-32">
			{#each sizes as size (size)}
				<div class="flex flex-col gap-16">
					<span class="type-ui-overline-1 text-brand-text-secondary">{size}</span>
					<Checkbox {size} label="Unchecked" />
					<Checkbox {size} label="Checked" checked />
					<Checkbox {size} label="Indeterminate" indeterminate />
					<Checkbox {size} label="Disabled" disabled />
					<Checkbox {size} label="Disabled checked" disabled checked />
					<Checkbox {size} label="Disabled indeterminate" disabled indeterminate />
				</div>
			{/each}
		</div>
	{/snippet}
</Story>

<!-- Behaviour test: label click, Space, indeterminate. Runs with `npm run test`. -->
<Story
	name="Keyboard behaviour"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const box = canvas.getByRole('checkbox', { name: 'Newsletter' });
		const mixed = canvas.getByRole('checkbox', { name: 'All races' });

		await userEvent.click(canvas.getByText('Newsletter'));
		await expect(box).toBeChecked();
		await userEvent.keyboard(' ');
		await expect(box).not.toBeChecked();

		await expect(mixed).toBePartiallyChecked();
		await userEvent.click(mixed);
		await expect(mixed).toBeChecked();
		await expect(mixed).not.toBePartiallyChecked();
	}}
>
	{#snippet template()}
		<div class="flex flex-col gap-16">
			<Checkbox label="Newsletter" />
			<Checkbox label="All races" indeterminate />
		</div>
	{/snippet}
</Story>

<!-- Example + test: a required checkbox validated with Zod. -->
<Story
	name="Validation with Zod"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const box = canvas.getByRole('checkbox', { name: 'I accept the terms' });
		await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
		await expect(box).toHaveAttribute('aria-invalid', 'true');
		await expect(box).toHaveAccessibleDescription('Accept the terms to continue');
		await userEvent.click(box);
		await expect(box).not.toHaveAttribute('aria-invalid');
		await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
		await expect(canvas.getByRole('status')).toHaveTextContent('Valid');
	}}
>
	{#snippet template()}
		<TermsFormExample />
	{/snippet}
</Story>
