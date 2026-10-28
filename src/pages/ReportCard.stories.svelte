<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { sampleReport } from '#lib/report/sample.ts';
	import CheckingPage from './CheckingPage.svelte';
	import HomePage from './HomePage.svelte';
	import ReportPage from './ReportPage.svelte';

	const { Story } = defineMeta({
		title: 'Pages/Report Card',
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component:
						'The three Report Card screens with sample data: home, checking (paused on step 1 here) and the report. Modeled on report-card.runhappyapps.com (2026-10-28).'
				}
			}
		}
	});
</script>

<Story name="Home">
	{#snippet template()}<HomePage homeHref="#" />{/snippet}
</Story>

<Story name="Home with error">
	{#snippet template()}<HomePage
			homeHref="#"
			values={{ firstName: '', lastName: 'Rivera', email: 'sam@', url: 'not a site' }}
			errors={{
				firstName: 'Enter your first name',
				email: 'Enter an email like name@yourvenue.com',
				url: 'Enter a website like yourvenue.com'
			}}
		/>{/snippet}
</Story>

<Story name="Checking">
	{#snippet template()}<CheckingPage
			homeHref="#"
			site="https://yourvenue.com"
			stepMs={0}
		/>{/snippet}
</Story>

<Story name="Report">
	{#snippet template()}<ReportPage homeHref="#" report={sampleReport} />{/snippet}
</Story>
