<script lang="ts">
	import { resolve } from '$app/paths';
	import ReportPage from '#pages/ReportPage.svelte';
	import type { Category } from '#lib/schemas/report.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ReportPage
	report={data.report}
	homeHref={resolve('/')}
	sectionHref={(section: Category) => resolve('/r/sample/[section=section]', { section })}
/>
