<!--
	BookCallCard — Runhappy design system (Report Card)
	Not in Figma yet: the "Book a call" card at the end of the report (modeled on report-card.runhappyapps.com,
	2026-10-28). A component since 2026-11-02 (Adriana), when it appeared on the report and on each section page.

	Brand yellow (ui/base/primary) box, title UI/Subtitle/2, text UI/Body/2, and a secondary button that opens the
	"Book a call" page in a new tab. Text in ui/base/primary-foreground.
-->
<script lang="ts" module>
	export interface BookCallCardProps {
		/** The "Book a call" link, with its tracking parameters. */
		href: string;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { buttonClasses } from '#components/Button';

	let { href, class: className }: BookCallCardProps = $props();
</script>

<section
	class={[
		'flex flex-col gap-12 rounded-sm bg-ui-base-primary px-20 py-24 text-ui-base-primary-foreground',
		className
	]}
>
	<h2 class="type-ui-subtitle-2">Want help fixing what we found?</h2>
	<p class="type-ui-body-2-regular">
		Book a call. We’ll walk through this report with you and show how Runhappy answers every inquiry
		and gets it booked.
	</p>
	<!-- External link: nothing to resolve. -->
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a {href} target="_blank" rel="noopener" class={[buttonClasses('secondary'), 'self-start']}>
		Book a call
	</a>
</section>
