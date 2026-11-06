<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import Banner from './Banner.svelte';

	const types = ['info', 'warning', 'neutral'] as const;
	const text = 'Found on your website. Check it looks right.';

	const { Story } = defineMeta({
		title: 'Components/Banner',
		component: Banner,
		tags: ['autodocs'],
		args: { type: 'info', dismissible: false },
		argTypes: {
			type: { control: 'inline-radio', options: types },
			title: { control: 'text' },
			dismissible: { control: 'boolean' },
			action: { control: 'object' },
			children: { control: false }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Short message inside a page: icon + text, with an optional title, an underlined action link after the text and a close (X) button that hides it.',
						'Types: info (green, Info icon), warning (yellow, Warning icon), neutral (gray, Smiley icon). Screen readers hear "Info:" or "Warning:" before the text. Replaces found-banner (= warning).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=241-771)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Banner type={args.type} title={args.title} action={args.action} dismissible={args.dismissible}
			>{text}</Banner
		>
	{/snippet}
</Story>

<!-- Every type, text only. Switch the theme in the toolbar to check dark mode. -->
<Story
	name="All types"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText('Warning:')).toHaveClass('sr-only');
		await expect(canvas.queryByText('Neutral:')).toBeNull();
	}}
>
	{#snippet template()}
		<div class="flex flex-col gap-16">
			{#each types as type (type)}
				<Banner {type}>{text}</Banner>
			{/each}
		</div>
	{/snippet}
</Story>

<!-- Every type with title, action link and close button. -->
<Story name="With title, action and close" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="flex flex-col gap-16">
			{#each types as type (type)}
				<Banner {type} title="Title" action={{ label: 'Action', href: '#' }} dismissible
					>{text}</Banner
				>
			{/each}
		</div>
	{/snippet}
</Story>

<!-- Keyboard: Tab reaches the link, then the close button; Enter closes the banner. -->
<Story
	name="Close"
	args={{ ondismiss: fn() }}
	parameters={{ controls: { disable: true } }}
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.tab();
		await expect(canvas.getByRole('link', { name: 'Action' })).toHaveFocus();
		await userEvent.tab();
		const close = canvas.getByRole('button', { name: 'Close' });
		await expect(close).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await expect(canvas.queryByText(text)).toBeNull();
		await expect(args.ondismiss).toHaveBeenCalledOnce();
	}}
>
	{#snippet template(args)}
		<Banner
			type="warning"
			action={{ label: 'Action', href: '#' }}
			dismissible
			ondismiss={args.ondismiss}>{text}</Banner
		>
	{/snippet}
</Story>
