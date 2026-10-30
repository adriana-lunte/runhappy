<!--
	ReportPage — the graded report (modeled on report-card.runhappyapps.com, 2026-10-28).
	1. Summary: grade ring, verdict, "Get help fixing this", one ScoreRow per category.
	2. Things to fix (FixList).
	3. Website area: total, then each category with its explainer, main FindingCard and FindingRow list.
	4. Ads and tracking area (not graded until ads run).
	5. "Book a call" card and footer.
-->
<script lang="ts" module>
	import type { Report } from '#lib/schemas/report.ts';

	export interface ReportPageProps {
		/** The report to show. */
		report: Report;
		/** Link to the home page (logo and "Check this site again"). */
		homeHref: string;
	}
</script>

<script lang="ts">
	import { CaretRightIcon } from 'phosphor-svelte';
	import { buttonClasses } from '#components/Button';
	import { FindingCard, FindingRow } from '#components/Finding';
	import { FixList } from '#components/FixList';
	import { Icon } from '#components/Icon';
	import { ScoreRing } from '#components/ScoreRing';
	import { ScoreRow } from '#components/ScoreRow';
	import { SiteFooter } from '#components/SiteFooter';
	import { SiteHeader } from '#components/SiteHeader';
	import { categories, webCategories } from '#lib/report/categories.ts';
	import { bookCallUrl, footerDetails } from '#lib/report/config.ts';
	import { categoryScore, outcomeCounts, pointsToGain, thingsToFix } from '#lib/report/score.ts';
	import type { Category } from '#lib/schemas/report.ts';

	let { report, homeHref }: ReportPageProps = $props();

	const { overall } = $derived(report);
	const webFindings = $derived(report.findings.filter((f) => f.category !== 'ads'));
	const adsFindings = $derived(report.findings.filter((f) => f.category === 'ads'));
	const fixes = $derived(thingsToFix(webFindings));
	const webCounts = $derived(outcomeCounts(webFindings));
	const adsCounts = $derived(outcomeCounts(adsFindings));
	const checked = $derived(
		new Date(report.scannedAt).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
	);
	const host = $derived(new URL(report.venue.url).hostname.replace(/^www\./, ''));

	const inCategory = (category: Category) => report.findings.filter((f) => f.category === category);
	const helpUrl = (content: string) => `${bookCallUrl}&utm_content=${content}`;
</script>

<svelte:head><title>{report.venue.name} · Report Card</title></svelte:head>

<!-- Links here are external (Book a call) or already resolved by the route (homeHref). -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->

{#snippet categoryBlock(category: Category)}
	{@const info = categories[category]}
	{@const score = categoryScore(report.findings, category)}
	{@const findings = inCategory(category)}
	{@const main = findings.filter((f) => f.highlight)}
	{@const rows = findings.filter((f) => !f.highlight)}
	<section
		id={category}
		aria-labelledby={`${category}-title`}
		class="flex scroll-mt-16 flex-col gap-16"
	>
		<div class="flex items-start justify-between gap-16">
			<div class="flex flex-col gap-2">
				<p class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">{info.name}</p>
				<h3
					id={`${category}-title`}
					class="type-ui-subtitle-1 text-balance text-ui-base-foreground"
				>
					{info.title}
				</h3>
			</div>
			{#if score.possible}
				<span class="flex items-center gap-8">
					<span class="type-ui-body-2-semibold">{score.earned}/{score.possible}</span>
					<ScoreRing earned={score.earned} possible={score.possible} />
				</span>
			{/if}
		</div>
		<div class="flex flex-col gap-4">
			<p class="type-ui-body-3-medium text-ui-base-foreground">{info.question}</p>
			<p class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">{info.answer}</p>
		</div>
		{#each main as finding (finding.ruleId)}
			<FindingCard {finding} />
		{/each}
		{#if rows.length}
			<div class="rounded-sm bg-ui-surface-surface-100 px-20">
				{#each rows as finding (finding.ruleId)}
					<FindingRow {finding} />
				{/each}
			</div>
		{/if}
	</section>
{/snippet}

<div class="min-h-dvh bg-ui-surface-surface-200">
	<SiteHeader product="Report Card" {homeHref} />

	<main class="mx-auto flex max-w-2xl flex-col gap-16 px-16 py-32">
		<h1 class="sr-only">Report card for {report.venue.name}</h1>

		<!-- 1. Summary -->
		<section
			aria-label="Summary"
			class="flex flex-col gap-24 rounded-sm bg-ui-surface-surface-100 px-20 py-24"
		>
			<div class="flex items-center gap-20">
				<ScoreRing
					earned={overall.earned}
					possible={overall.possible}
					size="large"
					label={`Grade ${overall.grade}, ${overall.earned} of ${overall.possible} points`}
				>
					<span class="type-ui-headline-6 text-ui-base-foreground">{overall.grade}</span>
					<span class="type-ui-body-4-regular font-mono text-brand-text-secondary">
						{overall.earned} of {overall.possible}
					</span>
				</ScoreRing>
				<div class="flex flex-col gap-8">
					<p class="type-ui-subtitle-2 text-ui-base-foreground">{overall.verdict}</p>
					<p class="type-ui-body-4-regular text-brand-text-secondary">{overall.note}</p>
				</div>
			</div>
			<a
				href={helpUrl('summary')}
				target="_blank"
				rel="noopener"
				class={[buttonClasses('primary'), 'w-full']}
			>
				Get help fixing this
				<Icon icon={CaretRightIcon} regular class="size-20" />
			</a>
			<div class="flex flex-col gap-4">
				<div class="flex items-baseline justify-between">
					<h2 class="type-ui-body-2-semibold text-ui-base-foreground">Website</h2>
					<span class="type-ui-body-2-semibold">
						{overall.earned}
						<span class="font-mono text-brand-text-secondary">of {overall.possible}</span>
					</span>
				</div>
				{#each webCategories as category (category)}
					<ScoreRow
						name={categories[category].name}
						href={`#${category}`}
						score={categoryScore(report.findings, category)}
					/>
				{/each}
				<div class="mt-8 border-t border-ui-base-border pt-8">
					<ScoreRow
						name={categories.ads.name}
						href="#ads"
						note={report.ads.graded ? undefined : 'Not running yet, so not graded'}
						score={report.ads.graded ? categoryScore(report.findings, 'ads') : undefined}
					/>
				</div>
			</div>
		</section>

		<!-- 2. Things to fix -->
		<div class="rounded-sm bg-ui-surface-surface-100 px-20 py-20">
			<FixList items={fixes.map((f) => ({ headline: f.headline, gain: pointsToGain(f) }))}>
				{#snippet footer()}
					<a
						href={helpUrl('fix-list')}
						target="_blank"
						rel="noopener"
						class="inline-flex items-center gap-4 rounded-xs type-ui-body-3-medium text-ui-base-foreground underline underline-offset-2 focus-ring"
					>
						Want these fixed? Book a call <Icon icon={CaretRightIcon} regular class="size-16" />
					</a>
				{/snippet}
			</FixList>
		</div>

		<!-- 3. Website area. On the sunken panel (surface-150) secondary text uses muted-foreground: brand/text/secondary is 4.47:1 there. -->
		<section
			aria-labelledby="web-title"
			class="flex flex-col gap-32 rounded-sm bg-ui-surface-surface-150 p-16"
		>
			<h2 id="web-title" class="type-ui-overline-1 text-ui-ui-elements-muted-foreground uppercase">
				Website, search &amp; booking
			</h2>
			<div class="flex items-start gap-16 rounded-sm bg-ui-surface-surface-100 p-20">
				<p class="flex flex-col items-center">
					<span class="type-ui-headline-6 text-ui-base-foreground">{overall.earned}</span>
					<span class="type-ui-overline-1 text-brand-text-secondary uppercase"
						>of {overall.possible}</span
					>
				</p>
				<div class="flex flex-col gap-4">
					<p class="type-ui-subtitle-3 text-ui-base-foreground">{report.web.summary}</p>
					<p class="type-ui-overline-1 text-brand-text-secondary uppercase">
						{webCounts.toFix} to fix · {webCounts.working} working · {webCounts.couldntCheck} couldn’t
						check
					</p>
				</div>
			</div>
			{#each webCategories as category (category)}
				{@render categoryBlock(category)}
			{/each}
			<p class="type-ui-body-4-regular text-ui-ui-elements-muted-foreground">
				Anything marked “couldn’t check” or “not applicable” is left out of your points, so it never
				lowers your grade.
			</p>
		</section>

		<!-- 4. Ads and tracking -->
		<section
			aria-labelledby="ads-area-title"
			class="flex flex-col gap-32 rounded-sm bg-ui-surface-surface-150 p-16"
		>
			<h2
				id="ads-area-title"
				class="type-ui-overline-1 text-ui-ui-elements-muted-foreground uppercase"
			>
				Ads &amp; tracking
			</h2>
			<div class="flex flex-col gap-4 rounded-sm bg-ui-surface-surface-100 p-20">
				<p class="type-ui-subtitle-3 text-ui-base-foreground">{report.ads.summary}</p>
				<p class="type-ui-overline-1 text-brand-text-secondary uppercase">
					{report.ads.graded ? 'Graded' : 'Not graded'} · {adsCounts.opportunities} opportunities · {adsCounts.inPlace}
					already in place
				</p>
			</div>
			{@render categoryBlock('ads')}
		</section>

		<!-- 5. Call to action -->
		<section
			class="flex flex-col gap-12 rounded-sm bg-ui-base-primary px-20 py-24 text-ui-base-primary-foreground"
		>
			<h2 class="type-ui-subtitle-2">Want help fixing what we found?</h2>
			<p class="type-ui-body-2-regular">
				Book a call. We’ll walk through this report with you and show how Runhappy answers every
				inquiry and gets it booked.
			</p>
			<a
				href={helpUrl('footer')}
				target="_blank"
				rel="noopener"
				class={[buttonClasses('secondary'), 'self-start']}
			>
				Book a call
			</a>
		</section>

		<footer
			class="flex flex-col items-center gap-4 py-16 text-center type-ui-body-4-regular text-brand-text-secondary"
		>
			<p>{host} · Checked {checked}</p>
			<a href={homeHref} class="rounded-xs underline underline-offset-2 focus-ring">
				Changed something? Check this site again →
			</a>
		</footer>
	</main>
	<SiteFooter details={footerDetails} product="Report Card" />
</div>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
