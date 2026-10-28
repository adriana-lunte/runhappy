<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { CursorClickIcon } from 'phosphor-svelte';
	import FeatureCard from './FeatureCard.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/FeatureCard',
		component: FeatureCard,
		tags: ['autodocs'],
		args: {
			icon: CursorClickIcon,
			title: 'Booking a party',
			text: 'We go from your homepage to your birthday and group-event pages, on desktop and on a phone.'
		},
		argTypes: {
			icon: { control: false },
			step: { control: 'number' },
			level: { control: 'inline-radio', options: [2, 3] }
		},
		parameters: {
			docs: {
				description: {
					component:
						'White card with an icon, a title and a short text. Static. With `step`, a yellow circle shows the step number (use the cards inside an <ol>). Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-xs bg-ui-surface-surface-200 p-16"><FeatureCard {...args} /></div>
	{/snippet}
</Story>

<Story name="Step" args={{ step: 1, title: 'Try to book a party' }}>
	{#snippet template(args)}
		<ol class="max-w-xs bg-ui-surface-surface-200 p-16"><li><FeatureCard {...args} /></li></ol>
	{/snippet}
</Story>
