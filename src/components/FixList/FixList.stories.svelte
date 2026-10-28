<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import FixList from './FixList.svelte';

	const items = [
		{ headline: 'Parties are booked on another company’s site', gain: 7 },
		{ headline: 'Your phone or address is missing from your homepage', gain: 2 },
		{ headline: 'Your birthday page is 2 clicks from your homepage', gain: 1 },
		{ headline: 'Google can’t read your business details', gain: 1 },
		{ headline: 'Your page title doesn’t say what you offer', gain: 1 },
		{ headline: 'Link previews aren’t set up', gain: 1 },
		{ headline: 'Parents can’t find your opening hours', gain: 1 }
	];

	const { Story } = defineMeta({
		title: 'Report Card/FixList',
		component: FixList,
		tags: ['autodocs'],
		args: { items, visible: 5 },
		argTypes: { items: { control: false }, footer: { control: false } },
		parameters: {
			docs: {
				description: {
					component:
						'Failed checks, biggest gain first, with the points each fix adds. Shows the first few. Not in Figma yet.'
				}
			}
		}
	});
</script>

<!-- Test: the title counts all fixes, the list shows 5 and counts the rest. -->
<Story
	name="Default"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole('heading', { name: '7 things to fix' })).toBeInTheDocument();
		await expect(canvas.getAllByRole('listitem')).toHaveLength(5);
		await expect(canvas.getByText('And 2 more below')).toBeInTheDocument();
	}}
>
	{#snippet template(args)}
		<div class="max-w-sm bg-ui-surface-surface-100 p-20"><FixList {...args} /></div>
	{/snippet}
</Story>
