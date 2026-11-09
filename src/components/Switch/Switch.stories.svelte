<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import Switch from './Switch.svelte';

	const { Story } = defineMeta({
		title: 'Components/Switch',
		component: Switch,
		tags: ['autodocs'],
		args: { label: 'Monday', checked: true },
		parameters: {
			docs: {
				description: {
					component: [
						'On / off control: a native checkbox with role="switch". The label is part of the click target.',
						'Figma has only on / off; hover, focus and disabled follow the Checkbox (to confirm).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-701)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default" />

<!-- On, off and disabled. Tab to a switch to see the focus ring. -->
<Story
	name="All states"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const tuesday = canvas.getByRole('switch', { name: 'Tuesday' });
		await expect(tuesday).not.toBeChecked();
		// Clicking the label turns it on; Space turns it off again.
		await userEvent.click(canvas.getByText('Tuesday'));
		await expect(tuesday).toBeChecked();
		await userEvent.keyboard(' ');
		await expect(tuesday).not.toBeChecked();
		await expect(canvas.getByRole('switch', { name: 'Sunday' })).toBeDisabled();
	}}
>
	{#snippet template()}
		<div class="flex flex-col gap-16">
			<Switch label="Monday" checked />
			<Switch label="Tuesday" />
			<Switch label="Saturday" checked disabled />
			<Switch label="Sunday" disabled />
		</div>
	{/snippet}
</Story>
