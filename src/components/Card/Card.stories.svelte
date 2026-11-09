<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';

	const { Story } = defineMeta({
		title: 'Report Card/Card',
		component: Card,
		tags: ['autodocs'],
		argTypes: {
			children: { control: false }
		},
		parameters: {
			docs: {
				description: {
					component:
						'Static box that groups content: no border, radius sm, 20 px padding. Tone "default" (surface-100, white) is used by the home form and by FeatureCard; tone "muted" (ui/ui elements/card, light gray) by the Self Onboarding cards. Not clickable, so it has no hover or focus states.'
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="max-w-xs bg-ui-surface-surface-200 p-16">
			<Card class="flex flex-col gap-6">
				<p class="type-ui-subtitle-3 text-ui-base-foreground">Card title</p>
				<p class="type-ui-body-4-regular text-brand-text-secondary">
					Any content goes inside; the layout comes from the class.
				</p>
			</Card>
		</div>
	{/snippet}
</Story>

<!-- Muted tone on the page background, as in Self Onboarding. -->
<Story name="Muted">
	{#snippet template()}
		<div class="max-w-xs bg-ui-base-background p-16">
			<Card tone="muted" class="flex flex-col gap-6">
				<p class="type-ui-subtitle-3 text-ui-base-foreground">Card title</p>
				<p class="type-ui-body-4-regular text-brand-text-secondary">
					Light gray box for forms and lists on a white page.
				</p>
			</Card>
		</div>
	{/snippet}
</Story>
