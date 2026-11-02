<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { ArrowCounterClockwiseIcon } from 'phosphor-svelte';
	import SiteHeader from './SiteHeader.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/SiteHeader',
		component: SiteHeader,
		tags: ['autodocs'],
		args: {
			product: 'Report Card',
			homeHref: '#home',
			action: { label: 'Book a call', href: 'https://www.runhappy.ai/contact', external: true }
		},
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component:
						'Top bar of a standalone Runhappy page: logo, divider, product name (a link home) and one action on the right. Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="With action" />

<Story
	name="Start over"
	args={{
		action: { label: 'Start over', href: '#home', icon: ArrowCounterClockwiseIcon, quiet: true }
	}}
/>

<Story name="Without action" args={{ action: undefined, product: 'Report card · yourvenue.com' }} />
