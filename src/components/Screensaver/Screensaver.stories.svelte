<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, fn, userEvent, within } from 'storybook/test';
	import Screensaver from './Screensaver.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/Screensaver',
		component: Screensaver,
		tags: ['autodocs'],
		args: { title: 'How easy is it to book a party with you?', onclose: fn() },
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: [
						'Full-screen intro before the Report Card home: "Runhappy." labels fall, pile up under the title and drop away, in a 12-second loop. Any click, tap or key closes it. Hidden when the visitor asks for reduced motion.',
						'[Open in Figma](https://www.figma.com/design/ple2zsyYjnhOhYJw8MxTkj/Marketing?node-id=26-2)'
					].join('\n\n')
				},
				story: { inline: false, height: '40rem' }
			}
		}
	});
</script>

<!-- Behaviour test: the hint button gets focus, and a key or a click closes the intro. -->
<Story
	name="Default"
	play={async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const dialog = canvas.getByRole('dialog', { name: args.title });
		await expect(canvas.getByRole('button', { name: 'Click anywhere to start' })).toHaveFocus();

		await userEvent.keyboard('{Enter}');
		await expect(args.onclose).toHaveBeenCalledTimes(1);

		await userEvent.click(dialog);
		await expect(args.onclose).toHaveBeenCalledTimes(2);
	}}
/>
