<!--
	DayRow — Runhappy design system
	Figma: UI Library | Runhappy → Components → day-row
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-751

	Opening hours for one day (Self Onboarding): Switch with the day name, then "from" TimeField, "to", "to"
	TimeField. Closed shows "Closed" instead of the times. The day name has a fixed width (96) so the "to" column
	lines up from row to row (staging does not). Padding 8/16, gap 12.
-->
<script lang="ts" module>
	export interface DayRowProps {
		/** Day name, e.g. "Monday". Also the switch label. */
		day: string;
		/** Open that day. Use `bind:open` to read it. */
		open?: boolean;
		/** Opening time, "HH:MM" (24 h). Use `bind:from`. */
		from?: string;
		/** Closing time, "HH:MM" (24 h). Use `bind:to`. */
		to?: string;
		/** Layout classes (width, margin). */
		class?: string;
	}
</script>

<script lang="ts">
	import { Switch } from '#components/Switch';
	import { TimeField } from '#components/TimeField';

	let {
		day,
		open = $bindable(true),
		from = $bindable('10:00'),
		to = $bindable('18:00'),
		class: className
	}: DayRowProps = $props();
</script>

<div class={['flex items-center gap-12 px-16 py-8', className]}>
	<Switch label={day} bind:checked={open} labelClass="w-(--size-day-label)" />
	{#if open}
		<TimeField
			label={`${day} opens at`}
			hideLabel
			bind:value={from}
			class="w-(--size-time-field)"
		/>
		<span class="type-ui-body-4-regular text-ui-ui-elements-muted-foreground" aria-hidden="true"
			>to</span
		>
		<TimeField label={`${day} closes at`} hideLabel bind:value={to} class="w-(--size-time-field)" />
	{:else}
		<span class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">Closed</span>
	{/if}
</div>
