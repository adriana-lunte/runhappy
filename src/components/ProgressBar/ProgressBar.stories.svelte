<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import ProgressBar from './ProgressBar.svelte';

	const { Story } = defineMeta({
		title: 'Components/ProgressBar',
		component: ProgressBar,
		tags: ['autodocs'],
		args: { value: 25, label: 'Reading your website' },
		argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } },
		parameters: {
			docs: {
				description: {
					component: [
						'Continuous progress bar (Self Onboarding loading screen). Screen readers hear the name and the percentage.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-809)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ProgressBar value={args.value} label={args.label} class="w-(--size-onboarding-column)" />
	{/snippet}
</Story>

<!-- Empty, partway and full. Values outside 0–100 are clamped. -->
<Story
	name="Values"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const bars = within(canvasElement).getAllByRole('progressbar');
		await expect(bars[3]).toHaveAttribute('aria-valuenow', '100');
	}}
>
	{#snippet template()}
		<div class="flex w-(--size-onboarding-column) flex-col gap-16">
			<ProgressBar value={0} label="Empty" />
			<ProgressBar value={25} label="A quarter" />
			<ProgressBar value={100} label="Full" />
			<ProgressBar value={140} label="Clamped" />
		</div>
	{/snippet}
</Story>
