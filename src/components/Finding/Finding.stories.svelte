<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import { sampleReport } from '#lib/report/sample.ts';
	import FindingCard from './FindingCard.svelte';
	import FindingRow from './FindingRow.svelte';

	const byId = (id: string) => sampleReport.findings.find((f) => f.ruleId === id)!;

	const { Story } = defineMeta({
		title: 'Report Card/Finding',
		component: FindingCard,
		tags: ['autodocs'],
		args: { finding: byId('birthday.booking_mode') },
		argTypes: { finding: { control: false } },
		parameters: {
			docs: {
				description: {
					component: [
						'**FindingCard**: the main finding of a category: status badge, points, headline, what is happening, "What to do" and "What we saw".',
						'**FindingRow**: one check in a category list; opens (native disclosure) to show the details. Not in Figma yet.'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Card: needs work">
	{#snippet template(args)}
		<div class="max-w-md bg-ui-surface-surface-150 p-16"><FindingCard {...args} /></div>
	{/snippet}
</Story>

<Story name="Card: opportunity" args={{ finding: byId('ads.google_active') }}>
	{#snippet template(args)}
		<div class="max-w-md bg-ui-surface-surface-150 p-16"><FindingCard {...args} /></div>
	{/snippet}
</Story>

<!-- Rows in every state + test: a row opens and shows what to do. -->
<Story
	name="Rows"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const summary = canvas.getByText('Your page title doesn’t say what you offer');
		await userEvent.click(summary);
		await expect(canvas.getByText(/Start the title with what you offer/)).toBeVisible();
	}}
>
	{#snippet template()}
		<div class="max-w-md rounded-sm bg-ui-surface-surface-100 px-20">
			<FindingRow finding={byId('seo.titles')} />
			<FindingRow finding={byId('search.party_page')} />
			<FindingRow finding={byId('search.reviews')} />
			<FindingRow finding={byId('corporate.booking_mode')} />
			<FindingRow finding={byId('tags.ga4')} />
		</div>
	{/snippet}
</Story>
