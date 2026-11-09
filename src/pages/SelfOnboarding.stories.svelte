<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import SelfOnboardingPage from './SelfOnboardingPage.svelte';

	const { Story } = defineMeta({
		title: 'Pages/Self Onboarding',
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: [
						'Self Onboarding (formerly the setup flow), front end only with sample data (2026-11-09). One story per screen; the reading screen is paused halfway.',
						'[Open in Figma](https://www.figma.com/design/jxizwQMDvY8jc0sD9UpG21/Platform-%7C-Runhappy?node-id=78-4394)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story
	name="Welcome"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Get started' }));
		await expect(canvas.getByRole('heading', { name: "What's your website?" })).toBeInTheDocument();
		await expect(canvas.getByText('Step 1 of 6')).toBeInTheDocument();
		await expect(canvas.getByRole('button', { name: 'Continue' })).toBeDisabled();
	}}
>
	{#snippet template()}<SelfOnboardingPage homeHref="#" />{/snippet}
</Story>

<Story name="Website">
	{#snippet template()}<SelfOnboardingPage homeHref="#" start="website" />{/snippet}
</Story>

<Story name="Reading the website">
	{#snippet template()}<SelfOnboardingPage
			homeHref="#"
			start="reading"
			readingTickMs={0}
		/>{/snippet}
</Story>

<Story
	name="Venue"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const next = canvas.getByRole('button', { name: 'Continue' });
		await expect(next).toBeDisabled();
		await userEvent.type(canvas.getByLabelText('Street address'), '123 Main St');
		await userEvent.type(canvas.getByLabelText('City'), 'Austin');
		await userEvent.type(canvas.getByLabelText('State'), 'TX');
		await userEvent.type(canvas.getByLabelText('ZIP code'), '78701');
		await expect(next).toBeEnabled();
	}}
>
	{#snippet template()}<SelfOnboardingPage homeHref="#" start="venue" />{/snippet}
</Story>

<Story
	name="Knowledge"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Remove Selected work' }));
		await expect(canvas.queryByText('Selected work')).not.toBeInTheDocument();
	}}
>
	{#snippet template()}<SelfOnboardingPage homeHref="#" start="knowledge" />{/snippet}
</Story>

<Story name="Packages">
	{#snippet template()}<SelfOnboardingPage homeHref="#" start="packages" />{/snippet}
</Story>

<Story name="Hours">
	{#snippet template()}<SelfOnboardingPage homeHref="#" start="hours" />{/snippet}
</Story>

<Story name="Voice">
	{#snippet template()}<SelfOnboardingPage homeHref="#" start="voice" />{/snippet}
</Story>
