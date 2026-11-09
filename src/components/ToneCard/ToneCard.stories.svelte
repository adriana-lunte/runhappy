<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import ToneCard from './ToneCard.svelte';

	const tones = [
		{
			value: 'warm',
			label: 'Warm',
			description: 'Warm, upbeat and efficient. Friendly with families, never pushy.'
		},
		{
			value: 'playful',
			label: 'Playful',
			description: 'Playful and energetic. Matches the excitement of a party, keeps answers short.'
		},
		{
			value: 'polished',
			label: 'Polished',
			description: 'Calm, polished and precise. Courteous, clear and to the point.'
		}
	];

	const { Story } = defineMeta({
		title: 'Components/ToneCard',
		component: ToneCard,
		tags: ['autodocs'],
		args: { ...tones[2], name: 'tone', selected: true, recommended: true },
		parameters: {
			docs: {
				description: {
					component: [
						'A radio option shown as a card. The whole card is the click target; put the cards in a fieldset with the same `name`.',
						'Hover and focus follow Radio (to confirm in Figma).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-771)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default" args={{ class: 'w-(--size-hero-image)' }} />

<!-- A group of three, as in Self Onboarding step 6. Choose "Warm". -->
<Story
	name="Group"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByText('Warm'));
		await expect(canvas.getByRole('radio', { name: /Warm/ })).toBeChecked();
		await expect(canvas.getByRole('radio', { name: /Polished/ })).not.toBeChecked();
	}}
>
	{#snippet template()}
		<fieldset class="flex w-(--size-onboarding-column) flex-col gap-12">
			<legend class="mb-12 type-ui-body-3-medium text-ui-base-foreground">Tone</legend>
			<div class="flex items-start gap-12">
				{#each tones as tone (tone.value)}
					<ToneCard
						{...tone}
						name="tone-group"
						selected={tone.value === 'polished'}
						recommended
						class="flex-1"
					/>
				{/each}
			</div>
		</fieldset>
	{/snippet}
</Story>
