<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import Chip from './Chip.svelte';

	const tones = ['neutral', 'accent', 'inverse'] as const;

	const { Story } = defineMeta({
		title: 'Components/Chip',
		component: Chip,
		tags: ['autodocs'],
		args: { tone: 'neutral', showCheck: false },
		argTypes: {
			tone: { control: 'inline-radio', options: tones },
			showCheck: { control: 'boolean' },
			children: { control: false }
		},
		parameters: {
			docs: {
				description: {
					component: [
						'Small static pill (not clickable): pages on the Self Onboarding loading screen and source tags ("Drafted from your site", "Recommended").',
						'Three tones: neutral (quiet), accent (yellow tint) and inverse (dark pill that stands out on a card).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-696)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Chip tone={args.tone} showCheck={args.showCheck}>Drafted from your site</Chip>
	{/snippet}
</Story>

<!-- Every tone, with and without the check, on the page and on a card. -->
<Story
	name="All tones"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getAllByText('Read:')[0]).toHaveClass('sr-only');
	}}
>
	{#snippet template()}
		<div class="flex flex-col gap-16">
			{#each ['bg-ui-base-background', 'bg-ui-ui-elements-card'] as surface (surface)}
				<div class={['flex flex-wrap gap-8 rounded-sm p-16', surface]}>
					{#each tones as tone (tone)}
						<Chip {tone}>Mxv rebranding</Chip>
						<Chip {tone} showCheck checkLabel="Read">Home</Chip>
					{/each}
				</div>
			{/each}
		</div>
	{/snippet}
</Story>
