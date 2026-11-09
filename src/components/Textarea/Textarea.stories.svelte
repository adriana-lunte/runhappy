<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import Textarea from './Textarea.svelte';

	const offer =
		'Lunte Studio is an indie design team that partners with innovative early-stage startups. It provides product, UX/UI, web, app, and branding design through close, ongoing collaboration.';

	const { Story } = defineMeta({
		title: 'Components/Textarea',
		component: Textarea,
		tags: ['autodocs'],
		args: { label: 'What do you offer?', maxlength: 2000, value: offer },
		parameters: {
			docs: {
				description: {
					component: [
						'Long text with an optional counter. Same label, box, focus ring, error and help text as TextField (shared Field parts).',
						'Not drawn in Figma yet: Self Onboarding uses text_field as a stand-in. To confirm.'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Default" args={{ class: 'w-(--size-onboarding-column)' }} />

<!-- Empty with help text, filled, error and disabled. -->
<Story
	name="All states"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const greeting = canvas.getByLabelText('Greeting');
		await userEvent.type(greeting, 'Hi!');
		await expect(canvas.getByText('3/1000')).toBeInTheDocument();
		await expect(canvas.getByLabelText('Notes')).toHaveAttribute('aria-invalid', 'true');
	}}
>
	{#snippet template()}
		<div class="flex w-(--size-onboarding-column) flex-col gap-24">
			<Textarea
				label="Greeting"
				maxlength={1000}
				helperText="What it says when it picks up. Leave it blank and we'll write one in your tone."
			/>
			<Textarea label="What do you offer?" maxlength={2000} value={offer} />
			<Textarea label="Notes" error="Add at least one note." />
			<Textarea label="Disabled" value={offer} disabled />
		</div>
	{/snippet}
</Story>
