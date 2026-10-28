<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import BrowserFrame from './BrowserFrame.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/BrowserFrame',
		component: BrowserFrame,
		tags: ['autodocs'],
		args: { address: 'yourvenue.com' },
		argTypes: { children: { control: false } },
		parameters: {
			docs: {
				description: {
					component:
						'A simple browser window (dots + address bar) around a screenshot or a status text. Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BrowserFrame address={args.address} class="aspect-video max-w-md">
			<p class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">
				Opening your homepage…
			</p>
		</BrowserFrame>
	{/snippet}
</Story>
