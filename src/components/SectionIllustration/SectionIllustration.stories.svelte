<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { categories, reportSections } from '#lib/report/categories.ts';
	import SectionIllustration from './SectionIllustration.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/SectionIllustration',
		component: SectionIllustration,
		tags: ['autodocs'],
		parameters: {
			docs: {
				description: {
					component:
						'Small picture of what a report section checks, shown next to its "What do we check?" text on the section page. Decorative (hidden from screen readers). Drawn with library colors and Phosphor icons, so it follows light and dark. Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="All sections">
	{#snippet template()}
		<div class="grid max-w-2xl gap-16 bg-ui-surface-surface-150 p-16 sm:grid-cols-2">
			{#each reportSections as category (category)}
				<div class="flex flex-col gap-6">
					<p class="type-ui-body-4-medium text-ui-base-foreground">{categories[category].name}</p>
					<SectionIllustration {category} />
				</div>
			{/each}
		</div>
	{/snippet}
</Story>
