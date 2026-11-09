<!-- Self Onboarding · 5 Hours (Figma V2 node 78:3590). Staff phone is optional. -->
<script lang="ts">
	import { DayRow } from '#components/DayRow';
	import { TextField } from '#components/TextField';
	import { intros, type OnboardingData } from '#lib/self-onboarding/sample.ts';
	import StepFooter from './StepFooter.svelte';
	import StepIntro from './StepIntro.svelte';

	interface Props {
		/** One entry per day (edited in place). */
		hours: OnboardingData['hours'];
		/** Staff phone. Use `bind:staffPhone`. */
		staffPhone: string;
		onback: () => void;
		onnext: () => void;
	}

	let { hours, staffPhone = $bindable(), onback, onnext }: Props = $props();
</script>

<StepIntro {...intros.hours} />
<!-- Same look as Card tone="muted", with the tighter padding from Figma (4/8): each DayRow has its own 16/8. -->
<div class="flex flex-col gap-4 rounded-sm bg-ui-ui-elements-card px-4 py-8">
	{#each hours as entry (entry.day)}
		<DayRow day={entry.day} bind:open={entry.open} bind:from={entry.from} bind:to={entry.to} />
	{/each}
</div>
<TextField
	label="Staff phone"
	type="tel"
	autocomplete="tel"
	placeholder="+12025551234"
	helperText="Where callers go when they need a person."
	bind:value={staffPhone}
/>
<StepFooter {onback} oncontinue={onnext} />
