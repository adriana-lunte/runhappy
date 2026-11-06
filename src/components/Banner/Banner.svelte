<!--
	Banner — Runhappy design system
	Figma: UI Library | Runhappy → Components → banners (created 2026-11-06, replaces found-banner)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=241-771

	A short message inside a page: an icon and a text, with an optional title, an action link after the text
	and a close (X) button. Three types (decided by Adriana 2026-11-06):
	  info    → brand/secondary/green background, Info icon
	  warning → brand/accent/yellow background, Warning icon
	  neutral → brand/background/muted, Smiley icon
	Text brand/text/primary on every type (color rule: light tints → primary text). Hugs its content, like Figma.
	Info and warning tell screen readers the type before the text ("Warning: …"), like Tag.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type BannerType = 'info' | 'warning' | 'neutral';

	export interface BannerProps {
		/** Sets the background color, the icon and the word screen readers hear first. */
		type?: BannerType;
		/** Optional bold line above the text. */
		title?: string;
		/** Optional underlined link right after the text, e.g. { label: 'Review', href: '/setup/hours' }. */
		action?: { label: string; href: string };
		/** Shows the close (X) button. Clicking it hides the banner. */
		dismissible?: boolean;
		/** Called after the user closes the banner (e.g. to remember it was dismissed). */
		ondismiss?: () => void;
		/** The text. */
		children: Snippet;
		/** Layout classes (margin, width). */
		class?: string;
	}
</script>

<script lang="ts">
	import { InfoIcon, SmileyIcon, WarningIcon, XIcon } from 'phosphor-svelte';
	import { Icon, type PhosphorIcon } from '#components/Icon';
	import { TextLink } from '#components/TextLink';

	let {
		type = 'info',
		title,
		action,
		dismissible = false,
		ondismiss,
		children,
		class: className
	}: BannerProps = $props();

	let open = $state(true);

	const typeClasses: Record<BannerType, string> = {
		info: 'bg-brand-secondary-green-background',
		warning: 'bg-brand-accent-yellow-background',
		neutral: 'bg-brand-background-muted'
	};

	const typeIcons: Record<BannerType, PhosphorIcon> = {
		info: InfoIcon,
		warning: WarningIcon,
		neutral: SmileyIcon
	};

	// Read by screen readers only, before the text. Neutral has no meaning to announce.
	const typeLabels: Record<BannerType, string | undefined> = {
		info: 'Info',
		warning: 'Warning',
		neutral: undefined
	};

	function dismiss() {
		open = false;
		ondismiss?.();
	}
</script>

{#if open}
	<div
		class={[
			// Layout: Figma auto layout — padding 8/12, gap 8, top-aligned, hug content.
			'flex w-fit max-w-full items-start gap-8 rounded-xs px-12 py-8 text-brand-text-primary',
			typeClasses[type],
			className
		]}
	>
		<Icon icon={typeIcons[type]} class="size-16" />
		<div class="flex min-w-0 flex-col gap-2">
			{#if title}
				<p class="type-ui-body-4-semibold">{title}</p>
			{/if}
			<p class="type-ui-body-4-regular">
				{#if typeLabels[type]}<span class="sr-only">{typeLabels[type]}:</span>{/if}
				{@render children()}
				{#if action}<TextLink href={action.href}>{action.label}</TextLink>{/if}
			</p>
		</div>
		{#if dismissible}
			<!-- 24×24 target (WCAG 2.2 minimum); hover look borrowed from IconButton (to confirm). -->
			<button
				type="button"
				aria-label="Close"
				onclick={dismiss}
				class={[
					'grid size-24 shrink-0 cursor-pointer place-items-center rounded-full focus-ring',
					'hover:bg-brand-neutral-warm-gray-mid',
					'transition duration-150 active:scale-98 motion-reduce:transition-none motion-reduce:active:scale-100'
				]}
			>
				<Icon icon={XIcon} class="size-16" />
			</button>
		{/if}
	</div>
{/if}
