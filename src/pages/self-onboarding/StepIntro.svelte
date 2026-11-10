<!--
	StepIntro — top of the Self Onboarding steps (Figma V2 "Intro", updated 2026-11-10): the "R" illustration on
	top (left-aligned, decorative), then the headline (UI/Headline Serif/5) with the description right under it
	(UI/Body/1, muted). Gap 8 between the illustration and the text.
	The illustration is StepIllustration (2x files, dark-mode version when there is one).
	Page part, not a design-system component: it only exists in this flow.
-->
<script lang="ts" module>
	export interface StepIntroProps {
		/** Headline (the page's h1). */
		title: string;
		/** Line under the headline. */
		description: string;
		/** Illustration image URL, 2x (light mode, and dark mode when there is no dark version). */
		illustration: string;
		/** Dark-mode version of the illustration (light outlines), 2x. */
		illustrationDark?: string;
	}
</script>

<script lang="ts">
	import StepIllustration from './StepIllustration.svelte';

	let { title, description, illustration, illustrationDark }: StepIntroProps = $props();
</script>

<div class="flex flex-col items-start gap-8">
	<StepIllustration src={illustration} dark={illustrationDark} />
	<div class="flex flex-col">
		<h1 class="type-ui-headline-serif-5 text-ui-base-foreground">{title}</h1>
		<p class="type-ui-body-1-regular text-ui-ui-elements-muted-foreground">{description}</p>
	</div>
</div>
