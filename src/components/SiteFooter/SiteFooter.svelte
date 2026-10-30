<!--
	SiteFooter — Runhappy design system (Report Card)
	Not in Figma yet: modeled on the Runhappy brand guidelines footer (Adriana, 2026-10-30).

	Bottom of a standalone Runhappy page, on brand yellow (brand/background/yellow-accent): the logo, a dotted line,
	then small texts. Text is ui/base/primary-foreground (dark on yellow in both themes). The page above ends in
	rounded corners (radius sm) that sit on the yellow: the footer draws them itself, in the page's background color.
-->
<script lang="ts" module>
	export interface SiteFooterProps {
		/** Texts on the bottom left, in order (e.g. year and site, place). */
		details: string[];
		/** Product name on the bottom right, e.g. "Report Card". */
		product: string;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { Logo } from '#components/Logo';

	let { details, product, class: className }: SiteFooterProps = $props();
</script>

<footer class={['bg-brand-background-yellow-accent text-ui-base-primary-foreground', className]}>
	<!-- The page's rounded bottom corners, over the yellow. -->
	<div class="h-12 rounded-b-sm bg-ui-surface-surface-200" aria-hidden="true"></div>
	<div class="mx-auto max-w-(--size-page) px-16 py-48">
		<Logo class="h-32" />
	</div>
	<div class="border-t-2 border-dotted border-ui-base-primary-foreground">
		<div
			class="mx-auto flex max-w-(--size-page) flex-wrap items-center justify-between gap-x-48 gap-y-8 px-16 py-24"
		>
			<ul class="flex flex-wrap gap-x-48 gap-y-8 type-ui-body-2-regular">
				{#each details as detail (detail)}
					<li>{detail}</li>
				{/each}
			</ul>
			<p class="type-ui-body-2-medium">{product}</p>
		</div>
	</div>
</footer>
