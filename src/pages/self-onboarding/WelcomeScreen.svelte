<!-- Self Onboarding · 0 Welcome (Figma V2 node 78:3743). -->
<script lang="ts">
	import { intros } from '#lib/self-onboarding/sample.ts';
	import StepFooter from './StepFooter.svelte';
	import StepIntro from './StepIntro.svelte';

	let { onnext }: { onnext: () => void } = $props();
</script>

<StepIntro {...intros.welcome} />
<StepFooter continueLabel="Get started" oncontinue={onnext} />
