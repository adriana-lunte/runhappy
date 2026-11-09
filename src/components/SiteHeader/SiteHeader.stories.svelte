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
						'Top bar of a standalone Runhappy page: logo, divider, product name (a link home) and one action on the right. Variant "flow" is the Self Onboarding bar (Figma: self-onboarding-header): logo only, no divider, "Step N of 6" on the right.\n\n[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-811)'
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

<!-- Self Onboarding: logo only and the step on the right (Figma self-onboarding-header). -->
<Story
	name="Flow with step"
	args={{ variant: 'flow', product: undefined, action: undefined, step: 'Step 2 of 6' }}
/>
