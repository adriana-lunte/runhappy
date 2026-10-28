<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Logo from './Logo.svelte';

	const { Story } = defineMeta({
		title: 'Components/Logo',
		component: Logo,
		tags: ['autodocs'],
		args: { variant: 'wordmark', class: 'h-24 text-ui-base-foreground' },
		argTypes: { variant: { control: 'inline-radio', options: ['wordmark', 'symbol'] } },
		parameters: {
			docs: {
				description: {
					component: [
						'Runhappy logo: the full wordmark, or the symbol for tight spaces (collapsed sidebar). Drawn in the text color, so it follows dark mode.',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=60-5209)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Wordmark" />

<Story name="Symbol" args={{ variant: 'symbol' }} />
