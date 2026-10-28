<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import StatusIcon from './StatusIcon.svelte';

	const outcomes = [
		'fail',
		'pass',
		'info',
		'opportunity',
		'couldnt_check',
		'not_applicable'
	] as const;

	const { Story } = defineMeta({
		title: 'Report Card/StatusIcon',
		component: StatusIcon,
		tags: ['autodocs'],
		args: { outcome: 'fail' },
		argTypes: { outcome: { control: 'select', options: outcomes } },
		parameters: {
			docs: {
				description: {
					component:
						'Result of one check: the icon shape and color change, and screen readers hear a word ("Needs work", "Working"…). Not in Figma yet.'
				}
			}
		}
	});
</script>

<Story name="Default" />

<!-- Every outcome + test: each one has its spoken word. -->
<Story
	name="All outcomes"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByLabelText('Needs work')).toBeInTheDocument();
		await expect(canvas.getByLabelText('Couldn’t check')).toBeInTheDocument();
	}}
>
	{#snippet template()}
		<ul class="flex flex-col gap-8">
			{#each outcomes as outcome (outcome)}
				<li class="flex items-center gap-8 type-ui-body-3-regular text-ui-base-foreground">
					<StatusIcon {outcome} />
					<span aria-hidden="true">{outcome}</span>
				</li>
			{/each}
		</ul>
	{/snippet}
</Story>
