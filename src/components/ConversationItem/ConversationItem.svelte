<!--
	ConversationItem — Runhappy design system
	Figma: UI Library | Runhappy → Components → conversation-item
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=171-354

	A link that opens a conversation (decided 2026-10-27). The open conversation is "active":
	strong yellow background, dark text; screen readers hear "current page" (aria-current).
	Unread: a dot, plus the word "Unread" for screen readers. An active conversation is never unread.
	Long names and details are cut with "…" (decided 2026-10-27).
-->
<script lang="ts" module>
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export interface ConversationItemProps extends HTMLAnchorAttributes {
		/** Page of the conversation. */
		href: string;
		/** Contact name (first line). */
		name: string;
		/** Second line: email or phone number. */
		detail?: string;
		/** Has messages the user has not read. Ignored while the conversation is open. */
		unread?: boolean;
		/** This conversation is open. */
		current?: boolean;
	}
</script>

<script lang="ts">
	let {
		href,
		name,
		detail,
		unread = false,
		current = false,
		class: className,
		...rest
	}: ConversationItemProps = $props();

	// Opening a conversation reads it (decided 2026-10-27).
	const showUnread = $derived(unread && !current);
</script>

<!-- The page passes `href` already resolved (SvelteKit `resolve()`), so the component does not resolve it again. -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	aria-current={current ? 'page' : undefined}
	class={[
		// Layout: Figma auto layout — padding 16 (12 on the right), gap 6, fills the list width.
		'flex w-full items-start gap-6 rounded-sm py-16 pr-12 pl-16',
		'cursor-pointer focus-ring transition-colors duration-150 motion-reduce:transition-none',
		// Active: text on yellow uses ui-base-primary-foreground (color rule 1; Figma's foreground was 1.4:1 in dark mode).
		current
			? 'bg-brand-accent-yellow text-ui-base-primary-foreground'
			: 'text-ui-base-foreground hover:bg-brand-accent-yellow-background',
		className
	]}
	{...rest}
>
	<span class="flex min-w-0 flex-1 flex-col gap-2">
		{#if showUnread}
			<span class="sr-only">Unread:</span>
		{/if}
		<span class="truncate type-ui-body-1-medium">{name}</span>
		{#if detail}
			<span class="truncate type-ui-caption">{detail}</span>
		{/if}
	</span>
	{#if showUnread}
		<!-- Decorative: the "Unread" word above says it to screen readers. -->
		<span aria-hidden="true" class="flex pt-6">
			<span class="size-10 rounded-full bg-ui-base-foreground"></span>
		</span>
	{/if}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
