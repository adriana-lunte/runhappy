<!--
	Self Onboarding · 0 Welcome (Figma V2 node 78:3743, updated 2026-11-10): the illustration on the left and the
	title on the right (gap 12): "Welcome!" in UI/Headline Serif/5 Compact Semibold, then two lines in
	UI/Headline Serif/5 Compact. Below (gap 20), indented 12: the description and "Get started" (gap 24), left-aligned.
-->
<script lang="ts">
	import { CaretRightIcon } from 'phosphor-svelte';
	import { Button } from '#components/Button';
	import { intros, welcomeTitle } from '#lib/self-onboarding/sample.ts';
	import StepIllustration from './StepIllustration.svelte';

	let { onnext }: { onnext: () => void } = $props();

	const { illustration, illustrationDark, description } = intros.welcome;
</script>

<div class="flex flex-col gap-20">
	<div class="flex items-center gap-12">
		<StepIllustration src={illustration} dark={illustrationDark} />
		<h1 class="text-ui-base-foreground">
			<span class="block type-ui-headline-serif-5-compact-semibold">{welcomeTitle.lead}</span>
			{#each welcomeTitle.lines as line (line)}
				<span class="block type-ui-headline-serif-5-compact">{line}</span>
			{/each}
		</h1>
	</div>
	<div class="flex flex-col items-start gap-24 px-12">
		<p class="type-ui-body-1-regular text-ui-ui-elements-muted-foreground">{description}</p>
		<Button iconRight={CaretRightIcon} iconRegular onclick={onnext}>Get started</Button>
	</div>
</div>
