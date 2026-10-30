<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SiteFooter from './SiteFooter.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/SiteFooter',
		component: SiteFooter,
		tags: ['autodocs'],
		args: {
			details: ['2026, Runhappy.ai', 'New York City, New York'],
			product: 'Report Card'
		},
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component:
						'Bottom of a standalone Runhappy page on brand yellow: logo, dotted line, small texts on the left and the product name on the right. It draws the page’s rounded bottom corners over the yellow. Static, no links. Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="bg-ui-surface-surface-200">
			<div class="h-64"></div>
			<SiteFooter {...args} />
		</div>
	{/snippet}
</Story>
