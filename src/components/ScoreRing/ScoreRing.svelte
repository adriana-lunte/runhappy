<!--
	ScoreRing — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (2026-10-28).

	A ring that fills with the share of points earned. Large (the overall grade, with the grade in the middle)
	or small (next to each category). Color by tone: poor = red, fair = yellow dark, good = green; the track is
	warm gray mid. The ring is decorative: the numbers are always written as text, so it is hidden from screen
	readers unless a `label` is given.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { ScoreTone } from '#lib/report/score.ts';

	export interface ScoreRingProps {
		/** Points earned. */
		earned: number;
		/** Points possible. */
		possible: number;
		/** "large" (grade, 128) or "small" (category, 36). */
		size?: 'large' | 'small';
		/** Text for screen readers, e.g. "Grade C−, 25 of 43". Without it the ring is decorative. */
		label?: string;
		/** Content in the middle (large ring), e.g. the grade. */
		children?: Snippet;
		/** Layout classes. */
		class?: string;
	}

	const toneColor: Record<ScoreTone, string> = {
		poor: 'text-ui-status-destructive-foreground',
		fair: 'text-brand-accent-yellow-dark',
		good: 'text-ui-status-success-border'
	};
</script>

<script lang="ts">
	import { scoreTone } from '#lib/report/score.ts';

	let {
		earned,
		possible,
		size = 'small',
		label,
		children,
		class: className
	}: ScoreRingProps = $props();

	// Drawing units (SVG viewBox), not CSS sizes. Same proportions as the original: radius 52 / 15, stroke 9 / 3.5.
	const geometry = $derived(
		size === 'large' ? { box: 128, r: 52, stroke: 9 } : { box: 36, r: 15, stroke: 3.5 }
	);
	const circumference = $derived(2 * Math.PI * geometry.r);
	const share = $derived(possible ? Math.min(earned / possible, 1) : 0);
	const tone = $derived(toneColor[scoreTone({ earned, possible })]);
</script>

<span
	class={[
		'relative inline-grid shrink-0 place-items-center',
		size === 'large' ? 'size-(--size-score-ring)' : 'size-(--size-score-ring-small)',
		className
	]}
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
>
	<svg
		viewBox={`0 0 ${geometry.box} ${geometry.box}`}
		class="col-start-1 row-start-1 size-full -rotate-90"
	>
		<circle
			cx={geometry.box / 2}
			cy={geometry.box / 2}
			r={geometry.r}
			fill="none"
			stroke-width={geometry.stroke}
			class="stroke-brand-neutral-warm-gray-mid"
		/>
		<circle
			cx={geometry.box / 2}
			cy={geometry.box / 2}
			r={geometry.r}
			fill="none"
			stroke-width={geometry.stroke}
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={circumference * (1 - share)}
			class={['stroke-current', tone]}
		/>
	</svg>
	{#if children}
		<span class="col-start-1 row-start-1 flex flex-col items-center">{@render children()}</span>
	{/if}
</span>
