<!--
	ProgressSteps — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (checking screen, 2026-10-28).

	A bar split into one segment per step: done = ui/base/foreground, to do = warm gray mid. Under it,
	"Step 2 of 7" and an optional hint ("Usually 1–2 minutes"). Screen readers get a progress bar with the
	step and the name of the current step.
-->
<script lang="ts" module>
	export interface ProgressStepsProps {
		/** Current step, from 1. */
		current: number;
		/** Number of steps. */
		total: number;
		/** Name of the current step, read by screen readers (e.g. "Visiting your site"). */
		stepName?: string;
		/** Text on the right, e.g. "Usually 1–2 minutes". */
		hint?: string;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	let { current, total, stepName, hint, class: className }: ProgressStepsProps = $props();

	const steps = $derived(Array.from({ length: total }, (_, index) => index + 1));
	const label = $derived(`Step ${current} of ${total}`);
</script>

<div class={['flex flex-col gap-8', className]}>
	<div
		role="progressbar"
		aria-valuemin={1}
		aria-valuemax={total}
		aria-valuenow={current}
		aria-valuetext={stepName ? `${label}: ${stepName}` : label}
		aria-label="Checking your site"
		class="flex gap-4"
	>
		{#each steps as step (step)}
			<span
				class={[
					'h-4 flex-1 rounded-full transition-colors duration-150 motion-reduce:transition-none',
					step <= current ? 'bg-ui-base-foreground' : 'bg-brand-neutral-warm-gray-mid'
				]}
			></span>
		{/each}
	</div>
	<div class="flex justify-between gap-16 type-ui-body-4-regular text-brand-text-secondary">
		<span class="font-mono">{label}</span>
		{#if hint}<span>{hint}</span>{/if}
	</div>
</div>
