<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import SourceRow from './SourceRow.svelte';

	const { Story } = defineMeta({
		title: 'Components/SourceRow',
		component: SourceRow,
		tags: ['autodocs'],
		args: {
			title: 'About Lunte Studio',
			detail:
				'What it is — Lunte Studio is an independent design team partnering with innovative early-stage startups…',
			source: 'Drafted from your site',
			showIcon: true,
			onopen: fn(),
			onremove: fn(),
			class: 'w-(--size-onboarding-column)'
		},
		parameters: {
			docs: {
				description: {
					component: [
						'An item found on the website (knowledge document or package). The text opens it; the trash removes it (two separate buttons).',
						'Figma has no hover / focus yet: hover tints the row, focus uses the shared ring. To confirm.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-702)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story
	name="Document"
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: /^About Lunte Studio/ }));
		await expect(args.onopen).toHaveBeenCalledOnce();
		await userEvent.click(canvas.getByRole('button', { name: 'Remove About Lunte Studio' }));
		await expect(args.onremove).toHaveBeenCalledOnce();
	}}
/>

<!-- A package: no file icon, the detail is the length and guests. -->
<Story
	name="Package"
	args={{
		title: 'Free consultation',
		detail: '90 minutes, up to 20 guests',
		source: 'From your website',
		showIcon: false
	}}
/>

<!-- Read-only: no open action and no remove button. -->
<Story name="Read only" args={{ onopen: undefined, onremove: undefined }} />
