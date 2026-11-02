<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextLink from './TextLink.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/TextLink',
		component: TextLink,
		tags: ['autodocs'],
		argTypes: {
			children: { control: false }
		},
		parameters: {
			docs: {
				description: {
					component:
						'Underlined text link with an optional caret before or after the text. It takes the text style and color of where it sits. Hover removes the underline; keyboard focus shows the focus ring. Used in the report for "Back to report", previous / next section and "Book a call". Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="All">
	{#snippet template()}
		<div class="flex flex-col items-start gap-16 type-ui-body-3-medium text-ui-base-foreground">
			<TextLink href="#">Plain link</TextLink>
			<TextLink href="#" caret="left">Back to report</TextLink>
			<TextLink href="#" caret="right">Next: Search results</TextLink>
			<TextLink href="https://www.runhappy.ai" external caret="right">
				Want these fixed? Book a call
			</TextLink>
			<p class="type-ui-body-4-regular text-brand-text-secondary">
				<TextLink href="#">Inside secondary text →</TextLink>
			</p>
		</div>
	{/snippet}
</Story>
