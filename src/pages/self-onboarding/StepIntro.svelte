<!--
	StepIntro — top of every Self Onboarding screen (Figma V2 "Intro"): headline (UI/Headline Serif/5), then the
	description (UI/Body/1, muted) next to the "R" illustration (240 × 130, decorative). Gap 8, row gap 12.
	Page part, not a design-system component: it only exists in this flow.
-->
<script lang="ts" module>
	export interface StepIntroProps {
		/** Headline (the page's h1). */
		title: string;
		/** Line next to the illustration. */
		description: string;
		/** Illustration image URL. */
		illustration: string;
	}
</script>

<script lang="ts">
	let { title, description, illustration }: StepIntroProps = $props();
</script>

<div class="flex flex-col gap-8">
	<h1 class="type-ui-headline-serif-5 text-ui-base-foreground">{title}</h1>
	<div class="flex items-center gap-12">
		<p class="flex-1 type-ui-body-1-regular text-ui-ui-elements-muted-foreground">{description}</p>
		<img
			src={illustration}
			alt=""
			class="h-(--size-onboarding-illustration-height) w-(--size-hero-image) shrink-0 object-cover"
		/>
	</div>
</div>
