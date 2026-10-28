<!--
	SiteHeader — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (2026-10-28).

	Top bar of a standalone Runhappy page: logo, a divider and the product name on the left; one action on the
	right (e.g. "Book a call", a link that looks like a tertiary button). Divider under it: ui/base/border.
-->
<script lang="ts" module>
	export interface SiteHeaderProps {
		/** Product name next to the logo, e.g. "Report Card". */
		product: string;
		/** Where the logo and product name go (usually the home page). */
		homeHref: string;
		/** The action on the right. Opens in a new tab when it leaves the site. */
		action?: { label: string; href: string; external?: boolean };
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { buttonClasses } from '#components/Button';
	import { Logo } from '#components/Logo';

	let { product, homeHref, action, class: className }: SiteHeaderProps = $props();
</script>

<!-- The page passes `homeHref` already resolved (SvelteKit `resolve()`); `action` is an external link. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<header class={['border-b border-ui-base-border', className]}>
	<div class="mx-auto flex max-w-(--size-page) items-center justify-between gap-16 px-16 py-8">
		<a href={homeHref} class="flex items-center gap-12 rounded-xs focus-ring">
			<Logo class="h-20 text-ui-base-foreground" />
			<span class="block h-20 border-l border-ui-base-border" aria-hidden="true"></span>
			<span class="type-ui-body-3-regular text-ui-base-foreground">{product}</span>
		</a>
		{#if action}
			<a
				href={action.href}
				class={buttonClasses('tertiary')}
				target={action.external ? '_blank' : undefined}
				rel={action.external ? 'noopener' : undefined}
			>
				{action.label}
			</a>
		{/if}
	</div>
</header>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
