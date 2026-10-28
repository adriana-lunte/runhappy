<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CaretRightIcon, PlusIcon as Plus } from 'phosphor-svelte';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import Button from './Button.svelte';

	const variants = ['primary', 'secondary', 'tertiary'] as const;
	const icons = { None: undefined, Plus };

	const { Story } = defineMeta({
		title: 'Components/Button',
		component: Button,
		tags: ['autodocs'],
		args: {
			variant: 'primary',
			disabled: false,
			onclick: fn()
		},
		argTypes: {
			variant: { control: 'inline-radio', options: variants },
			iconLeft: { control: 'select', options: Object.keys(icons), mapping: icons },
			iconRight: { control: 'select', options: Object.keys(icons), mapping: icons },
			type: { control: false },
			children: { control: false }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Main action button. Three variants from Figma (button-pimary / secondary / tertiary).',
						'States: idle, hover, pressed (shrinks to 98%), keyboard focus (dark ring + yellow halo) and disabled.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=70-1444)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Primary" args={{ variant: 'primary', iconLeft: Plus, iconRight: Plus }}>
	{#snippet template(args)}
		<Button {...args}>Add Tool</Button>
	{/snippet}
</Story>

<Story name="Secondary" args={{ variant: 'secondary', iconLeft: Plus, iconRight: Plus }}>
	{#snippet template(args)}
		<Button {...args}>Create New</Button>
	{/snippet}
</Story>

<Story name="Tertiary" args={{ variant: 'tertiary', iconLeft: Plus, iconRight: Plus }}>
	{#snippet template(args)}
		<Button {...args}>Add Tool</Button>
	{/snippet}
</Story>

<!-- Overview: every variant, enabled and disabled, with and without icons.
     Hover, pressed and focus are interactive: hover, click or Tab through the buttons to see them. -->
<Story name="All variants and states" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="grid grid-cols-4 items-center justify-items-start gap-16">
			<span></span>
			<span class="type-ui-overline-1 text-brand-text-secondary">Idle</span>
			<span class="type-ui-overline-1 text-brand-text-secondary">No icons</span>
			<span class="type-ui-overline-1 text-brand-text-secondary">Disabled</span>
			{#each variants as variant (variant)}
				<span class="type-ui-overline-1 text-brand-text-secondary">{variant}</span>
				<Button {variant} iconLeft={Plus} iconRight={Plus}>Add Tool</Button>
				<Button {variant}>Add Tool</Button>
				<Button {variant} iconLeft={Plus} iconRight={Plus} disabled>Add Tool</Button>
			{/each}
		</div>
	{/snippet}
</Story>

<!-- A caret after the label uses a line drawing (chevron): Bold here, as on the Report Card home. -->
<Story name="With chevron" args={{ iconRight: CaretRightIcon, iconWeight: 'bold' }}>
	{#snippet template(args)}
		<Button {...args}>Grade my site</Button>
	{/snippet}
</Story>

<!-- Behaviour test: keyboard focus, activation and disabled state. Runs with `npm run test`. -->
<Story
	name="Keyboard and disabled behaviour"
	args={{ onclick: fn() }}
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const [enabled, disabled] = canvas.getAllByRole('button');

		await userEvent.tab();
		await expect(enabled).toHaveFocus();

		await userEvent.keyboard('{Enter}');
		await expect(args.onclick).toHaveBeenCalledTimes(1);

		// A disabled button is skipped by Tab and ignores clicks.
		await userEvent.tab();
		await expect(disabled).not.toHaveFocus();
		await expect(disabled).toBeDisabled();
	}}
>
	{#snippet template(args)}
		<div class="flex gap-16">
			<Button onclick={args.onclick}>Enabled</Button>
			<Button disabled onclick={args.onclick}>Disabled</Button>
		</div>
	{/snippet}
</Story>
