<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import TimeField from './TimeField.svelte';

	const { Story } = defineMeta({
		title: 'Components/TimeField',
		component: TimeField,
		tags: ['autodocs'],
		args: { label: 'Opens at', value: '10:00' },
		parameters: {
			docs: {
				description: {
					component: [
						'Native time input inside the shared field box, with a Clock icon. The value is 24-hour "HH:MM"; the browser shows it in the user\'s format.',
						'Not drawn in Figma yet: day-row uses text_field + Clock as a stand-in. To confirm.'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default" args={{ class: 'w-(--size-time-field)' }} />

<!-- Filled, empty, error and disabled. -->
<Story
	name="All states"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByLabelText('Opens at')).toHaveValue('10:00');
		await expect(canvas.getByLabelText('Closes at')).toHaveAttribute('aria-invalid', 'true');
	}}
>
	{#snippet template()}
		<div class="flex flex-col gap-24">
			<TimeField label="Opens at" value="10:00" class="w-(--size-time-field)" />
			<TimeField label="Empty" class="w-(--size-time-field)" />
			<TimeField label="Closes at" value="09:00" error="Closing time must be after opening time." />
			<TimeField label="Disabled" value="18:00" disabled class="w-(--size-time-field)" />
		</div>
	{/snippet}
</Story>
