<!--
	SiteHeader — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (2026-10-28).

	Top bar of a standalone Runhappy page: logo, a divider and the product name on the left; one action on the
	right: a link that looks like a tertiary button, with an optional icon. `quiet` makes it plain gray text
	(UI/Body/3, ui/ui elements/muted-foreground, 16 px icon, foreground on hover), for a secondary action like
	"Start over" (Adriana, 2026-11-02). Divider under it: ui/base/border.

	Self Onboarding (2026-11-09, Adriana chose to extend this header instead of a new one):
	Figma UI Library | Runhappy → self-onboarding-header. `variant="flow"` drops the divider line and the page width
	limit, uses a 24 px logo and 24/32 padding, and `step` shows "Step 2 of 6" on the right (UI/Body/3, muted).
	Without `product` there is no divider and no product name next to the logo.
-->
<script lang="ts" module>
	import type { PhosphorIcon } from '#components/Icon';

	export type SiteHeaderVariant = 'page' | 'flow';

	export interface SiteHeaderProps {
		/** Product name next to the logo, e.g. "Report Card". Leave it out to show the logo alone. */
		product?: string;
		/** Where the logo and product name go (usually the home page). */
		homeHref: string;
		/**
		 * The action on the right: a link styled as a tertiary button. Opens in a new tab when `external`; `onclick`
		 * runs before it navigates (e.g. to reset the intro).
		 */
		action?: {
			label: string;
			href: string;
			external?: boolean;
			icon?: PhosphorIcon;
			/** Plain gray text instead of a button, for a less important action. */
			quiet?: boolean;
			onclick?: () => void;
		};
		/** Progress text on the right instead of an action, e.g. "Step 2 of 6" (Self Onboarding). */
		step?: string;
		/**
		 * "page" (default): Report Card bar with a divider under it, inside the page width.
		 * "flow": Self Onboarding bar, full width, no divider, bigger logo.
		 */
		variant?: SiteHeaderVariant;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { buttonClasses } from '#components/Button';
	import { Icon } from '#components/Icon';
	import { Logo } from '#components/Logo';

	let {
		product,
		homeHref,
		action,
		step,
		variant = 'page',
		class: className
	}: SiteHeaderProps = $props();

	const flow = $derived(variant === 'flow');
</script>

<!-- The page passes `homeHref` and internal `action` links already resolved (SvelteKit `resolve()`). -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<header class={[!flow && 'border-b border-ui-base-border', className]}>
	<div
		class={[
			'flex items-center justify-between gap-16',
			flow ? 'px-32 py-24' : 'mx-auto max-w-(--size-page) px-16 py-8'
		]}
	>
		<a href={homeHref} class="flex items-center gap-12 rounded-xs focus-ring">
			<Logo class={flow ? 'h-24 text-ui-base-foreground' : 'h-20 text-ui-base-foreground'} />
			{#if product}
				<span class="block h-20 border-l border-ui-base-border" aria-hidden="true"></span>
				<span class="type-ui-body-3-regular text-ui-base-foreground">{product}</span>
			{/if}
		</a>
		{#if step}
			<p class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">{step}</p>
		{/if}
		{#if action}
			<a
				href={action.href}
				class={action.quiet
					? 'inline-flex items-center gap-4 rounded-xs py-4 type-ui-body-3-regular text-ui-ui-elements-muted-foreground focus-ring transition-colors duration-150 hover:text-ui-base-foreground motion-reduce:transition-none'
					: buttonClasses('tertiary')}
				target={action.external ? '_blank' : undefined}
				rel={action.external ? 'noopener' : undefined}
				onclick={action.onclick}
			>
				{#if action.icon}<Icon
						icon={action.icon}
						class={action.quiet ? 'size-16' : 'size-20'}
					/>{/if}
				{action.label}
			</a>
		{/if}
	</div>
</header>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
