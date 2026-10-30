<!--
	HomePage — Report Card home (modeled on report-card.runhappyapps.com, 2026-10-28).
	Hero (report card illustration, title, text) with the form (first and last name, email, website),
	"What we check, step by step" (three numbered cards) and the "we never book" note.
	Before it, once per visit, the Screensaver intro covers the page until a click, tap or key.
	The form posts to the route's action, which validates with Zod (src/lib/schemas/report.ts).
-->
<script lang="ts" module>
	import type { GradeFormValues } from '#lib/schemas/report.ts';

	export interface HomePageProps {
		/** Link to this page (logo). */
		homeHref: string;
		/** What the visitor typed, kept when the form comes back with an error. */
		values?: GradeFormValues;
		/** One error per field, from the server validation. */
		errors?: GradeFormValues;
		/** Shows the screensaver intro first (once per visit, see src/lib/intro.ts). Off in stories. */
		intro?: boolean;
	}
</script>

<script lang="ts">
	import { CaretRightIcon } from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import reportCardImage from '#lib/assets/report-card.webp';
	import { Button } from '#components/Button';
	import { Card } from '#components/Card';
	import { FeatureCard } from '#components/FeatureCard';
	import { Screensaver } from '#components/Screensaver';
	import { SiteFooter } from '#components/SiteFooter';
	import { SiteHeader } from '#components/SiteHeader';
	import { footerDetails } from '#lib/report/config.ts';
	import { TextField } from '#components/TextField';
	import { markIntroSeen, shouldSkipIntro } from '#lib/intro.ts';

	let { homeHref, values = {}, errors = {}, intro = true }: HomePageProps = $props();

	const heading = 'How easy is it to book a party with you?';

	// Rendered on the server too, so a first visit never flashes the page; hidden at once when skipped.
	// svelte-ignore state_referenced_locally
	let showIntro = $state(intro);
	onMount(() => {
		if (shouldSkipIntro()) showIntro = false;
	});
	function closeIntro() {
		markIntroSeen();
		showIntro = false;
	}

	const features = [
		{
			title: 'Try to book a party',
			text: 'We go from your homepage to your birthday and group-event pages, on desktop and on a phone, and see whether a parent can pick a date, see a price and book.'
		},
		{
			title: 'Check your tracking',
			text: 'We check which tracking tags your site loads — Meta, Google Analytics, Google Ads — and whether they reach the booking page.'
		},
		{
			title: 'Look up your ads',
			text: 'We look up what you’re running in the Meta Ad Library and Google’s Ads Transparency Center, and where those ads send people.'
		}
	];
</script>

{#if showIntro}
	<Screensaver title={heading} onclose={closeIntro} />
{/if}

<!-- The page stays out of reach (inert) while the intro covers it. -->
<div class="min-h-dvh bg-ui-surface-surface-200" inert={showIntro}>
	<SiteHeader product="Report Card" {homeHref} />

	<main class="mx-auto flex max-w-2xl flex-col gap-48 px-16 py-48">
		<section class="flex flex-col items-center gap-16 text-center">
			<!-- Decorative: the title already says what the page is. -->
			<img src={reportCardImage} alt="" class="size-(--size-hero-image)" />
			<h1 class="type-ui-headline-serif-5 text-balance text-ui-base-foreground">
				{heading}
			</h1>
			<p class="type-ui-body-1-regular text-brand-text-secondary">
				Enter your website and get a graded report card in about two minutes, with a clear fix for
				every problem we find.
			</p>
		</section>

		<Card>
			<form method="post" novalidate class="flex flex-col gap-12">
				<div class="grid gap-12 sm:grid-cols-2">
					<TextField
						label="First name"
						name="firstName"
						autocomplete="given-name"
						value={values.firstName}
						error={errors.firstName}
						required
					/>
					<TextField
						label="Last name"
						name="lastName"
						autocomplete="family-name"
						value={values.lastName}
						error={errors.lastName}
						required
					/>
				</div>
				<TextField
					label="Email"
					name="email"
					type="email"
					autocomplete="email"
					value={values.email}
					error={errors.email}
					required
				/>
				<TextField
					label="Your venue’s website"
					name="url"
					type="url"
					inputmode="url"
					autocomplete="url"
					placeholder="yourvenue.com"
					value={values.url}
					error={errors.url}
					required
				/>
				<Button type="submit" iconRight={CaretRightIcon} iconRegular class="w-full"
					>Grade my site</Button
				>
			</form>
		</Card>

		<section aria-labelledby="steps-title" class="flex flex-col gap-16">
			<h2 id="steps-title" class="text-center type-ui-subtitle-2 text-ui-base-foreground">
				What we check, step by step
			</h2>
			<ol class="grid gap-12 sm:grid-cols-3">
				{#each features as feature, i (feature.title)}
					<li><FeatureCard {...feature} step={i + 1} level={3} class="h-full" /></li>
				{/each}
			</ol>
		</section>

		<p class="text-center type-ui-body-3-regular text-brand-text-secondary">
			We never submit a form or make a booking on your site. Every grade comes from the same fixed
			checks, and anything we can’t check is marked as such — it never counts against you.
		</p>
	</main>
	<SiteFooter details={footerDetails()} product="Report Card" />
</div>
