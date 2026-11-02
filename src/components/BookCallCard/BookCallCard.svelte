<!--
	BookCallCard — Runhappy design system (Report Card)
	Not in Figma yet: the yellow card at the end of the report (modeled on report-card.runhappyapps.com,
	2026-10-28). A component since 2026-11-02 (Adriana), when it appeared on the report and on each section page.

	Brand yellow (ui/base/primary) box: "Want to fix what we found?" in UI/Subtitle/2, then "Book a demo from the
	email we sent to <email>" in UI/Body/2, text in ui/base/primary-foreground. No button since 2026-11-02 (Adriana):
	the demo is booked from the email, so the card only says where to look. (Before: "Want help fixing what we
	found?", a paragraph and a "Book a call" button.)
-->
<script lang="ts" module>
	export interface BookCallCardProps {
		/** The address the report was sent to, shown at the end of the text. */
		email: string;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	let { email, class: className }: BookCallCardProps = $props();
</script>

<section
	class={[
		'flex flex-col gap-12 rounded-sm bg-ui-base-primary px-20 py-24 text-ui-base-primary-foreground',
		className
	]}
>
	<h2 class="type-ui-subtitle-2">Want to fix what we found?</h2>
	<p class="type-ui-body-2-regular">
		Book a demo from the email we sent to <span class="type-ui-body-2-semibold break-all"
			>{email}</span
		>
	</p>
</section>
