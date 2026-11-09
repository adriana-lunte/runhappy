<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import DayRow from './DayRow.svelte';

	const { Story } = defineMeta({
		title: 'Components/DayRow',
		component: DayRow,
		tags: ['autodocs'],
		args: { day: 'Monday', open: true, from: '10:00', to: '18:00' },
		parameters: {
			docs: {
				description: {
					component: [
						'Opening hours for one day: switch with the day name, opening and closing time. Closed shows "Closed". The fixed day width keeps the "to" column aligned.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-751)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default" />

<!-- A week inside a muted card, as in Self Onboarding step 5. Turn Tuesday off. -->
<Story
	name="Week"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByLabelText('Tuesday opens at')).toBeInTheDocument();
		await userEvent.click(canvas.getByRole('switch', { name: 'Tuesday' }));
		await expect(canvas.queryByLabelText('Tuesday opens at')).not.toBeInTheDocument();
		await expect(canvas.getAllByText('Closed')).toHaveLength(2);
	}}
>
	{#snippet template()}
		<div
			class="flex w-(--size-onboarding-column) flex-col gap-4 rounded-sm bg-ui-ui-elements-card py-8"
		>
			<DayRow day="Monday" />
			<DayRow day="Tuesday" />
			<DayRow day="Wednesday" />
			<DayRow day="Sunday" open={false} />
		</div>
	{/snippet}
</Story>
