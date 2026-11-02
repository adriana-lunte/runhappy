<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BookCallCard from './BookCallCard.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/BookCallCard',
		component: BookCallCard,
		tags: ['autodocs'],
		args: { email: 'sam@example.com' },
		parameters: {
			docs: {
				description: {
					component:
						'The yellow card at the end of the report and of each section page: "Want to fix what we found?" and where to book a demo (the email the report was sent to). Static, no button. Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Default" />
