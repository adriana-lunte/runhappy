<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ScoreRing from './ScoreRing.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/ScoreRing',
		component: ScoreRing,
		tags: ['autodocs'],
		args: { earned: 15, possible: 23, size: 'small' },
		argTypes: {
			size: { control: 'inline-radio', options: ['small', 'large'] },
			children: { control: false }
		},
		parameters: {
			docs: {
				description: {
					component:
						'Share of points earned. Half or less = red, under 80% = yellow dark, otherwise green (thresholds to confirm). Decorative unless `label` is set: the numbers are always written as text too. Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Small" />

<Story
	name="Large with grade"
	args={{ earned: 25, possible: 43, size: 'large', label: 'Grade C−, 25 of 43 points' }}
>
	{#snippet template(args)}
		<ScoreRing {...args}>
			<span class="type-ui-headline-6 text-ui-base-foreground">C−</span>
			<span class="type-ui-body-4-regular font-mono text-brand-text-secondary">25 of 43</span>
		</ScoreRing>
	{/snippet}
</Story>

<!-- The three tones. -->
<Story name="Tones" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="flex gap-16">
			<ScoreRing earned={2} possible={4} />
			<ScoreRing earned={15} possible={23} />
			<ScoreRing earned={9} possible={10} />
		</div>
	{/snippet}
</Story>
