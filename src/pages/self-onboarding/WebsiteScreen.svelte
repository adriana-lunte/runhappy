<!--
	Self Onboarding · 1 Website (Figma V2 node 78:3705). Continue stays disabled while the field is empty.
	"We don't have a website" skips the reading screen and goes to the venue (to confirm).
-->
<script lang="ts">
	import { Button } from '#components/Button';
	import { Card } from '#components/Card';
	import { TextField } from '#components/TextField';
	import { intros } from '#lib/self-onboarding/sample.ts';
	import StepFooter from './StepFooter.svelte';
	import StepIntro from './StepIntro.svelte';

	interface Props {
		/** The website. Use `bind:site`. */
		site: string;
		/** Continue with the website. */
		onnext: () => void;
		/** "We don't have a website". */
		onskip: () => void;
	}

	let { site = $bindable(), onnext, onskip }: Props = $props();
</script>

<StepIntro {...intros.website} />
<Card tone="muted" class="flex flex-col items-start gap-16">
	<TextField
		label="Website"
		placeholder="fun-zone.com"
		inputmode="url"
		autocomplete="url"
		bind:value={site}
		class="self-stretch"
	/>
	<Button variant="tertiary" onclick={onskip}>We don't have a website</Button>
</Card>
<StepFooter continueDisabled={!site.trim()} oncontinue={onnext} />
