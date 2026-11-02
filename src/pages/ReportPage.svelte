<!--
	ReportPage — the graded report (modeled on report-card.runhappyapps.com, 2026-10-28).
	1. Summary: grade ring, verdict, one ScoreRow per category. ("Get help fixing this" hidden on 2026-11-02, Adriana.)
	2. "Book a call" card and footer.
	"Things to fix" (FixList) was hidden on 2026-11-02 (Adriana); the component stays in the design system.
	Each summary row opens that category's own page (ReportSectionPage, since 2026-11-02), which holds what used
	to be the Website and Ads areas here.
-->
<script lang="ts" module>
	import type { Category, Report } from '#lib/schemas/report.ts';

	export interface ReportPageProps {
		/** The report to show. */
		report: Report;
		/** Link to the home page (logo and "Check this site again"). */
		homeHref: string;
		/** Link to a category's own page, opened from its summary row. */
		sectionHref: (category: Category) => string;
	}
</script>

<script lang="ts">
	import { BookCallCard } from '#components/BookCallCard';
	import { ScoreRing } from '#components/ScoreRing';
	import { ScoreRow } from '#components/ScoreRow';
	import { SiteFooter } from '#components/SiteFooter';
	import { SiteHeader } from '#components/SiteHeader';
	import { startOver } from '#lib/intro.ts';
	import { TextLink } from '#components/TextLink';
	import { categories, webCategories } from '#lib/report/categories.ts';
	import { footerDetails } from '#lib/report/config.ts';
	import { categoryScore, fixSummary, verdictReason } from '#lib/report/score.ts';

	let { report, homeHref, sectionHref }: ReportPageProps = $props();

	const { overall } = $derived(report);
	const reason = $derived(verdictReason(report.findings));
	const checked = $derived(
		new Date(report.scannedAt).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
	);
	const host = $derived(new URL(report.venue.url).hostname.replace(/^www\./, ''));
</script>

<svelte:head><title>{report.venue.name} · Report Card</title></svelte:head>

<!-- Links here are already resolved by the route (homeHref, sectionHref). -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->

<div class="flex min-h-dvh flex-col bg-ui-surface-surface-200">
	<SiteHeader product="Report Card" {homeHref} action={startOver(homeHref)} />

	<main class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-16 px-16 py-32">
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
					{#if reason}
						<p class="type-ui-body-4-regular text-brand-text-secondary">{reason}</p>
					{/if}
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex items-baseline justify-between">
					<h2 class="type-ui-body-2-semibold text-ui-base-foreground">Website</h2>
					<span class="type-ui-body-2-semibold">
						{overall.earned}
						<span class="font-mono text-brand-text-secondary">of {overall.possible}*</span>
					</span>
				</div>
				{#each webCategories as category (category)}
					<ScoreRow
						name={categories[category].name}
						href={sectionHref(category)}
						score={categoryScore(report.findings, category)}
						note={fixSummary(report.findings.filter((f) => f.category === category))}
					/>
				{/each}
				<div class="mt-8 border-t border-ui-base-border pt-8">
					<ScoreRow
						name={categories.ads.name}
						href={sectionHref('ads')}
						note={report.ads.graded ? undefined : 'Not running yet, so not graded'}
						score={report.ads.graded ? categoryScore(report.findings, 'ads') : undefined}
					/>
				</div>
			</div>
			<!-- How the points are counted, as a footnote at the end of the card for the "*" on the Website total (Adriana, 2026-11-02). -->
			<p class="type-ui-body-4-regular text-brand-text-secondary">* {overall.note}</p>
		</section>

		<!-- 2. Call to action -->
		<BookCallCard email={report.email} />

		<footer
			class="flex flex-col items-center gap-4 py-16 text-center type-ui-body-4-regular text-brand-text-secondary"
		>
			<p>{host} · Checked {checked}</p>
			<TextLink href={homeHref}>Changed something? Check this site again →</TextLink>
		</footer>
	</main>
	<SiteFooter details={footerDetails()} product="Report Card" />
</div>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
