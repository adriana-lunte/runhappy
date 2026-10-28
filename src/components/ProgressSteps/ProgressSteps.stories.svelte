<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import ProgressSteps from './ProgressSteps.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/ProgressSteps',
		component: ProgressSteps,
		tags: ['autodocs'],
		args: { current: 2, total: 7, stepName: 'Visiting your site', hint: 'Usually 1–2 minutes' },
		parameters: {
			docs: {
				description: {
					component:
						'One segment per step (done = dark, to do = gray), "Step 2 of 7" and a hint. A progress bar for screen readers. Not in Figma yet.'
				}
			}
		}
	});
</script>

<!-- Test: the progress bar says which step it is on. -->
<Story
	name="Default"
	play={async ({ canvasElement }) => {
		const bar = within(canvasElement).getByRole('progressbar');
		await expect(bar).toHaveAttribute('aria-valuenow', '2');
		await expect(bar).toHaveAttribute('aria-valuetext', 'Step 2 of 7: Visiting your site');
	}}
>
	{#snippet template(args)}
		<div class="max-w-sm"><ProgressSteps {...args} /></div>
	{/snippet}
</Story>
