<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BookCallCard from './BookCallCard.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/BookCallCard',
		component: BookCallCard,
		tags: ['autodocs'],
		args: { href: 'https://www.runhappy.ai/contact' },
		parameters: {
			docs: {
				description: {
					component:
						'The "Book a call" card at the end of the report and of each section page: brand yellow box, title, text and a secondary button that opens the contact page in a new tab. Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Default" />
