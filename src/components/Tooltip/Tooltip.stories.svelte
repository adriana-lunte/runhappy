<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, waitFor, within } from 'storybook/test';
	import { Button } from '#components/Button';
	import Tooltip from './Tooltip.svelte';

	const { Story } = defineMeta({
		title: 'Components/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		args: { text: 'Distance is measured from the start line.' },
		argTypes: { trigger: { control: false } },
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: [
						'Short explanation that appears on hover, keyboard focus or tap. Closes with Escape.',
						'Not in Figma yet — design approved by Adriana on 2026-10-23.'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="pt-64">
			<Tooltip {...args}>
				{#snippet trigger(props)}
					<Button variant="secondary" {...props}>Hover or focus me</Button>
				{/snippet}
			</Tooltip>
		</div>
	{/snippet}
</Story>

<!-- Behaviour test: hover, keyboard focus and Escape (WCAG 1.4.13). Runs with `npm run test`. -->
<Story
	name="Hover, focus and Escape"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole('button', { name: 'Trigger' });
		const tooltip = canvas.getByRole('tooltip', { hidden: true });

		await expect(trigger).toHaveAccessibleDescription('Distance is measured from the start line.');
		await expect(tooltip).not.toBeVisible();

		await userEvent.hover(trigger);
		await waitFor(() => expect(tooltip).toBeVisible());
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(tooltip).not.toBeVisible());
		await userEvent.unhover(trigger);

		await userEvent.tab();
		await expect(trigger).toHaveFocus();
		await waitFor(() => expect(tooltip).toBeVisible());
		await userEvent.tab();
		await waitFor(() => expect(tooltip).not.toBeVisible());
	}}
>
	{#snippet template()}
		<div class="flex gap-16 pt-64">
			<Tooltip text="Distance is measured from the start line.">
				{#snippet trigger(props)}
					<Button variant="secondary" {...props}>Trigger</Button>
				{/snippet}
			</Tooltip>
			<Button variant="tertiary">Next element</Button>
		</div>
	{/snippet}
</Story>
