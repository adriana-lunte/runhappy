<!--
	SelfOnboardingPage — Self Onboarding, the front desk setup (formerly "setup flow"; renamed 2026-11-09).
	Figma: Platform | Runhappy → V2, section "v2"
	https://www.figma.com/design/jxizwQMDvY8jc0sD9UpG21/Platform-%7C-Runhappy?node-id=78-4394

	Eight screens in one page: welcome, website, reading (simulated), venue, knowledge, packages, hours and voice.
	Front end only, with the sample data from the recorded staging session (decided 2026-11-09): what the user
	types is kept while they move between screens and lost on reload. Layout: SiteHeader "flow" with "Step N of 6",
	then a 560 column with a 24 gap. The first three screens start lower (64; Figma 120 is off the spacing scale,
	Adriana chose 64).
-->
<script lang="ts" module>
	import type { Screen } from '#lib/self-onboarding/sample.ts';

	export interface SelfOnboardingPageProps {
		/** Link to the home page (logo). */
		homeHref: string;
		/** Screen to start on (stories, deep links). */
		start?: Screen;
		/** Time per page on the reading screen in milliseconds. 0 = stay still (stories). */
		readingTickMs?: number;
	}
</script>

<script lang="ts">
	import { SiteHeader } from '#components/SiteHeader';
	import {
		intros,
		sampleOnboarding,
		sampleSite,
		screens,
		totalSteps
	} from '#lib/self-onboarding/sample.ts';
	import HoursScreen from './self-onboarding/HoursScreen.svelte';
	import KnowledgeScreen from './self-onboarding/KnowledgeScreen.svelte';
	import PackagesScreen from './self-onboarding/PackagesScreen.svelte';
	import ReadingScreen from './self-onboarding/ReadingScreen.svelte';
	import VenueScreen from './self-onboarding/VenueScreen.svelte';
	import VoiceScreen from './self-onboarding/VoiceScreen.svelte';
	import WebsiteScreen from './self-onboarding/WebsiteScreen.svelte';
	import WelcomeScreen from './self-onboarding/WelcomeScreen.svelte';

	let { homeHref, start = 'welcome', readingTickMs = 400 }: SelfOnboardingPageProps = $props();

	const data = $state(sampleOnboarding());
	// Starts on `start`; the buttons move it on from there.
	let screen: Screen = $derived(start);

	const step = $derived(intros[screen].step);
	// The reading screen shows the site the user typed (or the sample one in stories).
	const site = $derived(data.site.trim() || sampleSite);

	function go(next: Screen) {
		screen = next;
		// New screen: start at the top, as a new page would.
		window.scrollTo({ top: 0 });
	}
	const back = (from: Screen) => go(screens[Math.max(0, screens.indexOf(from) - 1)]);
	const next = (from: Screen) =>
		go(screens[Math.min(screens.length - 1, screens.indexOf(from) + 1)]);
	const top = $derived(['welcome', 'website', 'reading'].includes(screen) ? 'pt-64' : 'pt-32');
</script>

<svelte:head><title>Set up your front desk · Runhappy</title></svelte:head>

<div class="flex min-h-dvh flex-col bg-ui-base-background">
	<SiteHeader variant="flow" {homeHref} step={step ? `Step ${step} of ${totalSteps}` : undefined} />

	<main
		class={['mx-auto flex w-full max-w-(--size-onboarding-column) flex-col gap-24 px-4 pb-64', top]}
	>
		{#if screen === 'welcome'}
			<WelcomeScreen onnext={() => next('welcome')} />
		{:else if screen === 'website'}
			<WebsiteScreen
				bind:site={data.site}
				onnext={() => next('website')}
				onskip={() => go('venue')}
			/>
		{:else if screen === 'reading'}
			<ReadingScreen {site} tickMs={readingTickMs} ondone={() => next('reading')} />
		{:else if screen === 'venue'}
			<!-- Back from the venue skips the reading screen. -->
			<VenueScreen venue={data.venue} onback={() => go('website')} onnext={() => next('venue')} />
		{:else if screen === 'knowledge'}
			<KnowledgeScreen
				docs={data.docs}
				onback={() => back('knowledge')}
				onnext={() => next('knowledge')}
			/>
		{:else if screen === 'packages'}
			<PackagesScreen
				packages={data.packages}
				onback={() => back('packages')}
				onnext={() => next('packages')}
			/>
		{:else if screen === 'hours'}
			<HoursScreen
				hours={data.hours}
				bind:staffPhone={data.staffPhone}
				onback={() => back('hours')}
				onnext={() => next('hours')}
			/>
		{:else}
			<VoiceScreen
				bind:assistantName={data.assistantName}
				bind:greeting={data.greeting}
				bind:tone={data.tone}
				bind:voice={data.voice}
				onback={() => back('voice')}
			/>
		{/if}
	</main>
</div>
