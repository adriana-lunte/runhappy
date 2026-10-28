<script lang="ts">
	import { resolve } from '$app/paths';
	import HomePage from '#pages/HomePage.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Runhappy Report Card — how bookable is your venue?</title>
	<meta
		name="description"
		content="Enter your website. We walk through booking a party the way a parent would, check your ads and tracking, and grade what we find."
	/>
</svelte:head>

<HomePage homeHref={resolve('/')} values={form?.values} errors={form?.errors} />
