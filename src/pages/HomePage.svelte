<!--
	HomePage — Report Card home (modeled on report-card.runhappyapps.com, 2026-10-28).
	Hero with the website field, "What we check, step by step" (three numbered cards) and the "we never book" note.
	The form posts to the route's action, which validates with Zod (src/lib/schemas/report.ts).
-->
<script lang="ts" module>
	export interface HomePageProps {
		/** Link to this page (logo). */
		homeHref: string;
		/** What the visitor typed, kept when the form comes back with an error. */
		url?: string;
		/** Error from the server validation. */
		error?: string;
	}
</script>

<script lang="ts">
	import {
		CalendarCheckIcon,
		CaretRightIcon,
		CursorClickIcon,
		MegaphoneIcon
	} from 'phosphor-svelte';
	import { Button } from '#components/Button';
	import { FeatureCard } from '#components/FeatureCard';
	import { SiteHeader } from '#components/SiteHeader';
	import { TextField } from '#components/TextField';
	import { bookCallUrl } from '#lib/report/config.ts';

	let { homeHref, url = '', error }: HomePageProps = $props();

	const features = [
		{
			icon: CursorClickIcon,
			title: 'Try to book a party',
			text: 'We go from your homepage to your birthday and group-event pages, on desktop and on a phone, and see whether a parent can pick a date, see a price and book.'
		},
		{
			icon: CalendarCheckIcon,
			title: 'Check your tracking',
			text: 'We check which tracking tags your site loads — Meta, Google Analytics, Google Ads — and whether they reach the booking page.'
		},
		{
			icon: MegaphoneIcon,
			title: 'Look up your ads',
			text: 'We look up what you’re running in the Meta Ad Library and Google’s Ads Transparency Center, and where those ads send people.'
		}
	];
</script>

<div class="min-h-dvh bg-ui-surface-surface-200">
	<SiteHeader
		product="Report Card"
		{homeHref}
		action={{ label: 'Book a call', href: `${bookCallUrl}&utm_content=header`, external: true }}
	/>

	<main class="mx-auto flex max-w-2xl flex-col gap-48 px-16 py-48">
		<section class="flex flex-col items-center gap-16 text-center">
			<p class="type-ui-overline-1 text-brand-text-secondary uppercase">Runhappy report card</p>
			<h1 class="type-ui-headline-6 text-balance text-ui-base-foreground">
				How easy is it to book a party with you?
			</h1>
			<p class="type-ui-body-1-regular text-brand-text-secondary">
				Enter your website and get a graded report card in about two minutes, with a clear fix for
				every problem we find.
			</p>
		</section>

		<form
			method="post"
			novalidate
			class="flex flex-col gap-12 rounded-sm bg-ui-surface-surface-100 p-12"
		>
			<TextField
				label="Your venue’s website"
				hideLabel
				name="url"
				type="url"
				inputmode="url"
				autocomplete="url"
				placeholder="yourvenue.com"
				value={url}
				{error}
				required
			/>
			<Button type="submit" iconRight={CaretRightIcon} iconRegular class="w-full"
				>Grade my site</Button
			>
		</form>

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
</div>
