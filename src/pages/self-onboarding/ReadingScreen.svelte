<!--
	Self Onboarding · 1b Reading the website (Figma V2 node 78:3720). Simulated: the status line moves on and the
	pages get a check one by one; then `ondone` opens the venue. Read pages use the inverse chip, pending ones
	the neutral chip (Adriana, 2026-11-06). The status is announced to screen readers.
	The spinner next to the status is not drawn yet (to confirm).
-->
<script lang="ts">
	import { Card } from '#components/Card';
	import { Chip } from '#components/Chip';
	import { ProgressBar } from '#components/ProgressBar';
	import { intros, pagesFound, readingStatus } from '#lib/self-onboarding/sample.ts';
	import StepIntro from './StepIntro.svelte';

	interface Props {
		/** The website being read, e.g. "lunte.studio". */
		site: string;
		/** Time per page in milliseconds (simulation). 0 = stay still (stories). */
		tickMs?: number;
		/** Pages already read when the screen opens (stories). */
		startAt?: number;
		/** Called when everything is read. */
		ondone?: () => void;
	}

	let { site, tickMs = 400, startAt = 0, ondone }: Props = $props();

	// One tick per page, plus one for "Finding" and one for "Writing".
	const totalTicks = pagesFound.length + 2;
	let tick = $derived(startAt);

	const read = $derived(Math.max(0, Math.min(pagesFound.length, tick - 1)));
	const status = $derived(
		tick === 0
			? readingStatus[0]
			: read < pagesFound.length
				? readingStatus[1]
				: tick < totalTicks
					? readingStatus[2]
					: readingStatus[3]
	);

	$effect(() => {
		if (!tickMs) return;
		const timer = setInterval(() => {
			if (tick < totalTicks) tick += 1;
			else {
				clearInterval(timer);
				ondone?.();
			}
		}, tickMs);
		return () => clearInterval(timer);
	});

	const intro = $derived({
		...intros.reading,
		title: intros.reading.title.replace('{site}', site)
	});
</script>

<StepIntro {...intro} />
<Card tone="muted" class="flex flex-col gap-12">
	<p aria-live="polite" class="type-ui-body-3-medium text-ui-base-foreground">{status}</p>
	<ul class="flex flex-wrap gap-8" aria-label="Pages found">
		{#each pagesFound as pageName, index (pageName)}
			<li>
				<Chip
					tone={index < read ? 'inverse' : 'neutral'}
					showCheck={index < read}
					checkLabel="Read"
				>
					{pageName}
				</Chip>
			</li>
		{/each}
	</ul>
	<ProgressBar value={(tick / totalTicks) * 100} label={`Reading ${site}`} />
</Card>
<p class="type-ui-body-4-regular text-ui-ui-elements-muted-foreground">
	This takes about a minute. You can leave this page; we keep going.
</p>
