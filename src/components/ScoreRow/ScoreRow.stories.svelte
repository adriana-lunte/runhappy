<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ScoreRow from './ScoreRow.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/ScoreRow',
		component: ScoreRow,
		tags: ['autodocs'],
		args: { name: 'Party booking', href: '#booking', score: { earned: 15, possible: 23 } },
		parameters: {
			docs: {
				description: {
					component:
						'A category in the report summary: name, points and a small ring; jumps to the category. Poor scores in red. Without a score it shows a note. Not in Figma yet.'
				}
			}
		}
	});
</script>

<!-- Every state. Hover or Tab to see hover and focus. -->
<Story name="All states">
	{#snippet template()}
		<div class="flex max-w-sm flex-col gap-4 bg-ui-surface-surface-100 p-16">
			<ScoreRow name="Party booking" href="#booking" score={{ earned: 15, possible: 23 }} />
			<ScoreRow name="Search results" href="#search" score={{ earned: 3, possible: 7 }} />
			<ScoreRow name="Ads and tracking" href="#ads" note="Not running yet, so not graded" />
		</div>
	{/snippet}
</Story>
