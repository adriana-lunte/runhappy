<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Callout from './Callout.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/Callout',
		component: Callout,
		tags: ['autodocs'],
		args: { label: 'What to do' },
		argTypes: { icon: { control: false }, children: { control: false } },
		parameters: {
			docs: {
				description: {
					component:
						'Tinted box with an icon, a small uppercase label and a text ("What to do"). Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-sm">
			<Callout label={args.label}>Add a “Book a party” button to your menu and homepage.</Callout>
		</div>
	{/snippet}
</Story>
