<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import Tag from './Tag.svelte';

	const types = ['consultation', 'soon', 'later', 'overdue'] as const;

	const { Story } = defineMeta({
		title: 'Components/Tag',
		component: Tag,
		tags: ['autodocs'],
		args: { type: 'consultation' },
		argTypes: {
			type: { control: 'inline-radio', options: types },
			children: { control: false }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Small static label (not clickable). Four types from Figma; the color carries meaning, so screen readers hear the type first ("Overdue: in 3 days").',
						'Text on brand colors stays dark in dark mode (color rule 1).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=88-1966)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Tag type={args.type}>Call today</Tag>
	{/snippet}
</Story>

<!-- Every type. Switch the theme in the toolbar to check dark mode. -->
<Story
	name="All types"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		// The hidden word is read before the visible text.
		await expect(canvas.getByText('Overdue:')).toHaveClass('sr-only');
		await expect(canvas.getByText('Overdue:').parentElement).toHaveTextContent(
			/^Overdue:\s*in 3 days$/
		);
	}}
>
	{#snippet template()}
		<div class="flex flex-wrap gap-16">
			{#each types as type (type)}
				<Tag {type}>in 3 days</Tag>
			{/each}
		</div>
	{/snippet}
</Story>
