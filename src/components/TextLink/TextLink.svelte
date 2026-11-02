<!--
	TextLink — Runhappy design system (Report Card)
	Not in Figma yet: the underlined text link of the report (Adriana, 2026-11-02, when it appeared a third time).

	An underlined link with an optional caret before or after the text. It takes the text style and color of where
	it sits (pass a type-* and text-* class to change them). Hover: no underline. Focus: focus-ring.
	`external` opens it in a new tab.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface TextLinkProps {
		/** Destination. Internal links come already resolved by the route. */
		href: string;
		/** The link text. */
		children: Snippet;
		/** A caret before ("left", e.g. "Back") or after ("right", e.g. "Next") the text. */
		caret?: 'left' | 'right';
		/** Opens in a new tab (for links outside Report Card). */
		external?: boolean;
		/** Text style, color and layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import { CaretLeftIcon, CaretRightIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let { href, children, caret, external = false, class: className }: TextLinkProps = $props();
</script>

<!-- The href comes resolved from the page (or is external). -->
<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
	class={[
		'inline-flex items-center gap-4 rounded-xs underline underline-offset-2 focus-ring hover:no-underline',
		className
	]}
>
	{#if caret === 'left'}<Icon icon={CaretLeftIcon} regular class="size-16" />{/if}
	{@render children()}
	{#if caret === 'right'}<Icon icon={CaretRightIcon} regular class="size-16" />{/if}
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
