<!--
	StepFooter — bottom of a Self Onboarding screen (Figma V2 "Footer"): "‹ Back" (tertiary) on the left and the
	main action (primary, with a caret) on the right. Without `onback` the action sits alone on the right.
-->
<script lang="ts" module>
	export interface StepFooterProps {
		/** Goes to the previous screen. No Back button when empty. */
		onback?: () => void;
		/** The main action. */
		oncontinue?: () => void;
		/** Text of the main action. */
		continueLabel?: string;
		/** The main action can't be used yet (the step is not complete). */
		continueDisabled?: boolean;
	}
</script>

<script lang="ts">
	import { CaretLeftIcon, CaretRightIcon } from 'phosphor-svelte';
	import { Button } from '#components/Button';

	let {
		onback,
		oncontinue,
		continueLabel = 'Continue',
		continueDisabled = false
	}: StepFooterProps = $props();
</script>

<div class="flex items-center justify-between gap-16">
	{#if onback}
		<Button variant="tertiary" iconLeft={CaretLeftIcon} iconRegular onclick={onback}>Back</Button>
	{:else}
		<span></span>
	{/if}
	<Button iconRight={CaretRightIcon} iconRegular disabled={continueDisabled} onclick={oncontinue}>
		{continueLabel}
	</Button>
</div>
