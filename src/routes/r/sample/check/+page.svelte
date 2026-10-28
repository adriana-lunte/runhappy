<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import CheckingPage from '#pages/CheckingPage.svelte';

	// Sample mode: the check is simulated and always opens the sample report.
	const site = $derived(page.url.searchParams.get('site') ?? 'yourvenue.com');
</script>

<CheckingPage homeHref={resolve('/')} {site} ondone={() => goto(resolve('/r/sample'))} />
