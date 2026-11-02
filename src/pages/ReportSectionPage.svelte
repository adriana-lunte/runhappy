<!--
	ReportSectionPage — one section of the graded report on its own page (Adriana, 2026-11-02).
	Opened from a row of the report summary (/r/sample/booking, /search, /ai, /basics, /ads).
	1. "Back to report".
	2. The area it belongs to ("Website, search & booking" or "Ads & tracking") with the area summary, then the
	   section: name, title, explainer with its SectionIllustration (2026-11-02), main FindingCard and FindingRow list (as it was on the report page).
	3. Previous / next section.
	4. "Book a call" card and footer.
-->
<script lang="ts" module>
	import type { Category, Report } from '#lib/schemas/report.ts';

	export interface ReportSectionPageProps {
		/** The report to show. */
		report: Report;
		/** The section on this page. */
		category: Category;
		/** Link to the home page (logo). */
		homeHref: string;
		/** Link back to the report summary. */
		reportHref: string;
		/** Link to another section's page (previous / next). */
		sectionHref: (category: Category) => string;
	}
</script>

<script lang="ts">
	import { BookCallCard } from '#components/BookCallCard';
	import { FindingCard, FindingRow } from '#components/Finding';
	import { ScoreRing } from '#components/ScoreRing';
	import { SectionIllustration } from '#components/SectionIllustration';
	import { SiteFooter } from '#components/SiteFooter';
	import { SiteHeader } from '#components/SiteHeader';
	import { TextLink } from '#components/TextLink';
	import { categories, reportSections } from '#lib/report/categories.ts';
	import { footerDetails } from '#lib/report/config.ts';
	import { categoryScore, outcomeCounts } from '#lib/report/score.ts';

	let { report, category, homeHref, reportHref, sectionHref }: ReportSectionPageProps = $props();

	const info = $derived(categories[category]);
	const isAds = $derived(category === 'ads');
	const score = $derived(categoryScore(report.findings, category));
	const findings = $derived(report.findings.filter((f) => f.category === category));
	const main = $derived(findings.filter((f) => f.highlight));
	const rows = $derived(findings.filter((f) => !f.highlight));
	const areaFindings = $derived(report.findings.filter((f) => (f.category === 'ads') === isAds));
	const areaCounts = $derived(outcomeCounts(areaFindings));
	const index = $derived(reportSections.indexOf(category));
	const previous = $derived(reportSections[index - 1]);
	const next = $derived(reportSections[index + 1]);
</script>

<svelte:head><title>{info.name} · {report.venue.name} · Report Card</title></svelte:head>

<div class="flex min-h-dvh flex-col bg-ui-surface-surface-200">
	<SiteHeader product="Report Card" {homeHref} />

	<main class="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-16 px-16 py-32">
		<TextLink
			href={reportHref}
			caret="left"
			class="self-start type-ui-body-3-medium text-ui-base-foreground"
		>
			Back to report
		</TextLink>

		<!-- On the sunken panel (surface-150) secondary text uses muted-foreground: brand/text/secondary is 4.47:1 there. -->
		<div class="flex flex-col gap-32 rounded-sm bg-ui-surface-surface-150 p-16">
			<p class="type-ui-overline-1 text-ui-ui-elements-muted-foreground uppercase">
				{isAds ? 'Ads & tracking' : 'Website, search & booking'}
			</p>
			{#if isAds}
				<div class="flex flex-col gap-4 rounded-sm bg-ui-surface-surface-100 p-20">
					<p class="type-ui-subtitle-3 text-ui-base-foreground">{report.ads.summary}</p>
					<p class="type-ui-overline-1 text-brand-text-secondary uppercase">
						{report.ads.graded ? 'Graded' : 'Not graded'} · {areaCounts.opportunities} opportunities ·
						{areaCounts.inPlace} already in place
					</p>
				</div>
			{:else}
				<div class="flex items-start gap-16 rounded-sm bg-ui-surface-surface-100 p-20">
					<p class="flex flex-col items-center">
						<span class="type-ui-headline-6 text-ui-base-foreground">{report.overall.earned}</span>
						<span class="type-ui-overline-1 text-brand-text-secondary uppercase"
							>of {report.overall.possible}</span
						>
					</p>
					<div class="flex flex-col gap-4">
						<p class="type-ui-subtitle-3 text-ui-base-foreground">{report.web.summary}</p>
						<p class="type-ui-overline-1 text-brand-text-secondary uppercase">
							{areaCounts.toFix} to fix · {areaCounts.working} working · {areaCounts.couldntCheck}
							couldn’t check
						</p>
					</div>
				</div>
			{/if}

			<section aria-labelledby="section-title" class="flex flex-col gap-16">
				<div class="flex items-start justify-between gap-16">
					<div class="flex flex-col gap-2">
						<p class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">{info.name}</p>
						<h1 id="section-title" class="type-ui-subtitle-1 text-balance text-ui-base-foreground">
							{info.title}
						</h1>
					</div>
					{#if score.possible}
						<span class="flex items-center gap-8">
							<span class="type-ui-body-2-semibold">{score.earned}/{score.possible}</span>
							<ScoreRing earned={score.earned} possible={score.possible} />
						</span>
					{/if}
				</div>
				<div class="flex flex-col gap-16 sm:flex-row sm:items-center">
					<div class="flex flex-1 flex-col gap-4">
						<p class="type-ui-body-3-medium text-ui-base-foreground">{info.question}</p>
						<p class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">{info.answer}</p>
					</div>
					<SectionIllustration {category} class="sm:w-1/3" />
				</div>
				{#each main as finding (finding.ruleId)}
					<FindingCard {finding} level={2} />
				{/each}
				{#if rows.length}
					<div class="rounded-sm bg-ui-surface-surface-100 px-20">
						{#each rows as finding (finding.ruleId)}
							<FindingRow {finding} />
						{/each}
					</div>
				{/if}
			</section>

			{#if !isAds}
				<p class="type-ui-body-4-regular text-ui-ui-elements-muted-foreground">
					Anything marked “couldn’t check” or “not applicable” is left out of your points, so it
					never lowers your grade.
				</p>
			{/if}
		</div>

		<nav
			aria-label="Report sections"
			class="flex flex-wrap justify-between gap-x-16 gap-y-8 type-ui-body-3-medium text-ui-base-foreground"
		>
			{#if previous}
				<TextLink href={sectionHref(previous)} caret="left">
					Previous: {categories[previous].name}
				</TextLink>
			{/if}
			{#if next}
				<TextLink href={sectionHref(next)} caret="right" class="ml-auto">
					Next: {categories[next].name}
				</TextLink>
			{/if}
		</nav>

		<BookCallCard email={report.email} />
	</main>
	<SiteFooter details={footerDetails()} product="Report Card" />
</div>
