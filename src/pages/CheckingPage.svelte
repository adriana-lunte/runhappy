<!--
	CheckingPage — the screen while a site is being checked (modeled on report-card.runhappyapps.com, 2026-10-28).
	Shows the current step in a card with a browser window and the step bar. For now the steps are simulated
	(sample data): when they finish, `ondone` is called and the route opens the sample report.
	The original's map background is left out on purpose (decided 2026-10-28).
-->
<script lang="ts" module>
	export interface CheckingPageProps {
		/** Link to the home page (logo). */
		homeHref: string;
		/** The site being checked, e.g. "https://yourvenue.com". */
		site: string;
		/** Time per step in milliseconds (simulation). 0 = stay on the first step (stories). */
		stepMs?: number;
		/** Called after the last step. */
		ondone?: () => void;
	}
</script>

<script lang="ts">
	import { BrowserFrame } from '#components/BrowserFrame';
	import { ProgressSteps } from '#components/ProgressSteps';
	import { SiteFooter } from '#components/SiteFooter';
	import { SiteHeader } from '#components/SiteHeader';
	import { checkSteps, footerDetails } from '#lib/report/config.ts';

	let { homeHref, site, stepMs = 1500, ondone }: CheckingPageProps = $props();

	const host = $derived(URL.canParse(site) ? new URL(site).hostname.replace(/^www\./, '') : site);
	let current = $state(1);
	const step = $derived(checkSteps[current - 1]);

	$effect(() => {
		if (!stepMs) return;
		const timer = setInterval(() => {
			if (current < checkSteps.length) current += 1;
			else {
				clearInterval(timer);
				ondone?.();
			}
		}, stepMs);
		return () => clearInterval(timer);
	});
</script>

<svelte:head><title>Checking your site… · Report Card</title></svelte:head>

<div class="flex min-h-dvh flex-col bg-ui-surface-surface-200">
	<SiteHeader product={`Report card · ${host}`} {homeHref} />

	<main class="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-24 px-16 py-32">
		<!-- Announced to screen readers each time the step changes. -->
		<section aria-live="polite" class="flex flex-col gap-8">
			<p class="type-ui-overline-1 text-brand-text-secondary uppercase">{step.area}</p>
			<h1 class="type-ui-subtitle-1 text-ui-base-foreground">{step.title}</h1>
			<p class="type-ui-body-2-regular text-brand-text-secondary">{step.text}</p>
		</section>

		<BrowserFrame address={host} class="aspect-video">
			<p class="px-16 text-center type-ui-body-3-regular text-ui-ui-elements-muted-foreground">
				Checking {host}…
			</p>
		</BrowserFrame>

		<ProgressSteps
			{current}
			total={checkSteps.length}
			stepName={step.title}
			hint="Usually 1–2 minutes"
		/>
	</main>
	<SiteFooter details={footerDetails} product="Report Card" />
</div>
