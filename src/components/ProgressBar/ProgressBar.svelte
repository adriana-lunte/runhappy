<!--
	ProgressBar — Runhappy design system
	Figma: UI Library | Runhappy → Components → progress-bar
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-809

	A continuous 4 px bar (Self Onboarding loading screen): ui/ui elements/muted track, ui/base/primary fill.
	Screen readers get a progress bar with its name and percentage. ProgressSteps is the segmented one
	(Report Card); which one wins is to confirm.
-->
<script lang="ts" module>
	export interface ProgressBarProps {
		/** Progress from 0 to 100. */
		value: number;
		/** Name read by screen readers, e.g. "Reading your website". */
		label: string;
		/** Layout classes (width, margin). */
		class?: string;
	}
</script>

<script lang="ts">
	let { value, label, class: className }: ProgressBarProps = $props();

	const percent = $derived(Math.min(100, Math.max(0, Math.round(value))));
</script>

<div
	role="progressbar"
	aria-label={label}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuenow={percent}
	class={['h-4 overflow-hidden rounded-full bg-ui-ui-elements-muted', className]}
>
	<div
		class="h-full rounded-full bg-ui-base-primary transition-all duration-300 motion-reduce:transition-none"
		style:width="{percent}%"
	></div>
</div>
