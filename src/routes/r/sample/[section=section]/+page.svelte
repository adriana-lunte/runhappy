<script lang="ts">
	import { resolve } from '$app/paths';
	import ReportSectionPage from '#pages/ReportSectionPage.svelte';
	import type { Category } from '#lib/schemas/report.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ReportSectionPage
	report={data.report}
	category={data.section}
	homeHref={resolve('/')}
	reportHref={resolve('/r/sample')}
	sectionHref={(section: Category) => resolve('/r/sample/[section=section]', { section })}
/>
