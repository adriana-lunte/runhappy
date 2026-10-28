<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import ThemeSwitch from './ThemeSwitch.svelte';

	const { Story } = defineMeta({
		title: 'Components/ThemeSwitch',
		component: ThemeSwitch,
		tags: ['autodocs'],
		args: { placement: 'bottom' },
		argTypes: {
			placement: { control: 'inline-radio', options: ['top', 'bottom'] },
			align: { control: 'inline-radio', options: ['start', 'end'] }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Choose the color mode: System (follows the device, default), Light or Dark. The button shows the current choice (Monitor, Sun, Moon).',
						'The choice is applied at once and remembered in the browser. In the app it sits in the sidebar footer and opens upwards.',
						'Note: choosing here changes the whole Storybook page, like in the app.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=205-2794)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="min-h-(--size-dropdown-panel) pt-48"><ThemeSwitch {...args} /></div>
	{/snippet}
</Story>

<!-- Test: choosing Dark applies it to the page and remembers it; System goes back to the device setting. -->
<Story
	name="Choosing a mode"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Theme' });

		await userEvent.click(button);
		await userEvent.click(canvas.getByRole('menuitemradio', { name: 'Dark' }));
		await expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
		await expect(localStorage.getItem('runhappy-theme')).toBe('dark');

		await userEvent.click(button);
		await expect(canvas.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute(
			'aria-checked',
			'true'
		);
		await userEvent.click(canvas.getByRole('menuitemradio', { name: 'System' }));
		await expect(localStorage.getItem('runhappy-theme')).toBeNull();
	}}
>
	{#snippet template()}
		<div class="min-h-(--size-dropdown-panel) pt-48"><ThemeSwitch placement="bottom" /></div>
	{/snippet}
</Story>
