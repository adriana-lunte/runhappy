<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import VoiceCard from './VoiceCard.svelte';

	const { Story } = defineMeta({
		title: 'Components/VoiceCard',
		component: VoiceCard,
		tags: ['autodocs'],
		args: {
			name: 'Lauren - Friendly Customer Care Agent',
			meta: 'American · Female · Conversational',
			value: 'lauren',
			group: 'voice',
			selected: true,
			recommended: true,
			onplay: fn(),
			onselect: fn(),
			class: 'w-(--size-onboarding-column)'
		},
		parameters: {
			docs: {
				description: {
					component: [
						'One voice option: play button, name, accent · gender · style, optional "Recommended" chip and a yellow check when chosen. A hidden radio holds the state; the play button never nests in it.',
						'Missing in Figma: hover, focus and "playing" (to confirm).',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-808)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story
	name="Chosen"
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /^Play Lauren/ }));
		await expect(args.onplay).toHaveBeenCalledWith('lauren');
		await expect(canvas.getByRole('radio', { name: /Lauren/ })).toBeChecked();
	}}
/>

<Story name="Not chosen" args={{ selected: false, recommended: false }} />

<!-- A list, as in Self Onboarding step 6. Choose Katie. -->
<Story
	name="List"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByText('Katie - Authentic and versatile'));
		await expect(canvas.getByRole('radio', { name: /Katie/ })).toBeChecked();
	}}
>
	{#snippet template()}
		<fieldset class="flex w-(--size-onboarding-column) flex-col gap-12">
			<legend class="mb-12 type-ui-body-3-medium text-ui-base-foreground">Voice</legend>
			<VoiceCard
				name="Lauren - Friendly Customer Care Agent"
				meta="American · Female · Conversational"
				value="lauren"
				group="voice-list"
				selected
				recommended
			/>
			<VoiceCard
				name="Katie - Authentic and versatile"
				meta="American · Female · Conversational"
				value="katie"
				group="voice-list"
			/>
			<VoiceCard
				name="Adam - Dominant, Firm"
				meta="American · Male · Social Media"
				value="adam"
				group="voice-list"
			/>
		</fieldset>
	{/snippet}
</Story>
