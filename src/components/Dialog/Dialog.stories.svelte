<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, waitFor, within } from 'storybook/test';
	import { Button } from '#components/Button';
	import { TextField } from '#components/TextField';
	import Dialog from './Dialog.svelte';

	// Shared open state for the story below.
	const state = $state({ open: false });

	const { Story } = defineMeta({
		title: 'Components/Dialog',
		component: Dialog,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component: [
						'Modal window built on the native <dialog>: focus moves in and stays in, Escape closes it, the page behind is blocked.',
						'No library component in Figma yet (drawn in the Self Onboarding V2 screens). The dark layer behind it has no token: browser default, to confirm.',
						'[Open in Figma](https://www.figma.com/design/jxizwQMDvY8jc0sD9UpG21/Platform-%7C-Runhappy?node-id=78-3687)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<!-- Open it: focus moves inside. Close it with Cancel. (Escape is the browser's own behavior and can't be
     simulated by the test runner.) -->
<Story
	name="Edit document"
	play={async ({ canvasElement }) => {
		// The open state is shared by every render of this story: start closed, or the modal blocks the button.
		state.open = false;
		const canvas = within(canvasElement);
		await waitFor(() => expect(canvas.queryByRole('dialog')).not.toBeInTheDocument());
		await userEvent.click(canvas.getByRole('button', { name: 'Edit About Lunte Studio' }));
		const dialog = await canvas.findByRole('dialog', { name: 'About Lunte Studio' });
		await expect(dialog).toHaveAttribute('open');
		await expect(dialog.contains(document.activeElement)).toBe(true);
		await userEvent.click(within(dialog).getByRole('button', { name: 'Cancel' }));
		await waitFor(() => expect(dialog).not.toHaveAttribute('open'));
	}}
>
	{#snippet template()}
		<Button variant="secondary" onclick={() => (state.open = true)}>Edit About Lunte Studio</Button>
		<Dialog bind:open={state.open} title="About Lunte Studio" class="flex flex-col gap-16">
			<TextField label="Title" value="About Lunte Studio" />
			{#snippet actions()}
				<Button variant="tertiary" onclick={() => (state.open = false)}>Cancel</Button>
				<Button onclick={() => (state.open = false)}>Save</Button>
			{/snippet}
		</Dialog>
	{/snippet}
</Story>
