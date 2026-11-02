<!--
	SectionIllustration — Runhappy design system (Report Card)
	Not in Figma yet: drawn in code with library colors and Phosphor icons (Adriana, 2026-11-02).

	A small picture of what a report section checks, next to its "What do we check?" text. It shows what the
	section looks at, not the result, so it stays true whatever the grade. Decorative: the text says the same,
	so screen readers skip it. Light and dark follow the theme (every color is a token).
	- booking: your site → another company's site with a calendar (parents leave to book)
	- search: a search with a list of results, your venue lower down
	- ai: a parent asks a chat "party place near me?" and the assistant answers
	- basics: your page with dashed gaps for phone, address and price
	- ads: an ad on a phone → a booking page
-->
<script lang="ts" module>
	import type { Category } from '#lib/schemas/report.ts';

	export interface SectionIllustrationProps {
		/** The section to illustrate. */
		category: Category;
		/** Layout classes. */
		class?: string;
	}
</script>

<script lang="ts">
	import {
		ArrowRightIcon,
		CalendarCheckIcon,
		CalendarDotsIcon,
		MagnifyingGlassIcon,
		MapPinIcon,
		MegaphoneIcon,
		PhoneIcon,
		SparkleIcon,
		StorefrontIcon,
		TagIcon
	} from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let { category, class: className }: SectionIllustrationProps = $props();

	// Shared pieces: a placeholder line of text, a small screen, a yellow badge and the arrow between screens.
	const line = 'h-4 rounded-full bg-ui-ui-elements-muted-foreground';
	const screen = 'flex flex-col gap-6 rounded-xs bg-ui-surface-surface-150 p-10';
	const badge = 'flex size-24 items-center justify-center rounded-full bg-ui-base-primary';
	const gap =
		'flex size-24 items-center justify-center rounded-xs border border-dashed border-ui-base-input';
</script>

<div
	class={['flex items-center justify-center rounded-sm bg-ui-surface-surface-100 p-16', className]}
	aria-hidden="true"
>
	{#if category === 'booking'}
		<div class="flex w-full items-center gap-8">
			<div class={[screen, 'flex-1']}>
				<Icon icon={StorefrontIcon} class="size-20 text-ui-base-foreground" />
				<span class={[line, 'w-full']}></span>
				<span class={[line, 'w-2/3']}></span>
			</div>
			<Icon icon={ArrowRightIcon} class="size-20 text-ui-ui-elements-muted-foreground" />
			<div class={[screen, 'flex-1']}>
				<span class={badge}>
					<Icon icon={CalendarDotsIcon} class="size-14 text-ui-base-primary-foreground" />
				</span>
				<span class={[line, 'w-full']}></span>
				<span class={[line, 'w-1/2']}></span>
			</div>
		</div>
	{:else if category === 'search'}
		<div class={[screen, 'w-full']}>
			<div class="flex items-center gap-6 rounded-full bg-ui-surface-surface-100 px-8 py-4">
				<Icon icon={MagnifyingGlassIcon} class="size-14 text-ui-ui-elements-muted-foreground" />
				<span class={[line, 'w-1/2']}></span>
			</div>
			{#each [false, false, true] as you, i (i)}
				<div class="flex items-center gap-6">
					<span
						class={[
							'size-8 shrink-0 rounded-full',
							you ? 'bg-ui-base-primary' : 'bg-ui-ui-elements-muted-foreground'
						]}
					></span>
					<span class={[line, you ? 'w-1/2' : 'w-full']}></span>
				</div>
			{/each}
		</div>
	{:else if category === 'ai'}
		<div class="flex w-full flex-col gap-8">
			<div class="flex w-2/3 flex-col gap-4 self-end rounded-xs bg-ui-surface-surface-150 p-8">
				<span class={[line, 'w-full']}></span>
				<span class={[line, 'w-1/2']}></span>
			</div>
			<div class="flex w-3/4 items-start gap-6">
				<span class={badge}>
					<Icon icon={SparkleIcon} class="size-14 text-ui-base-primary-foreground" />
				</span>
				<div class="flex flex-1 flex-col gap-4 rounded-xs bg-ui-surface-surface-150 p-8">
					<span class={[line, 'w-full']}></span>
					<span class={[line, 'w-full']}></span>
					<span class={[line, 'w-1/3']}></span>
				</div>
			</div>
		</div>
	{:else if category === 'basics'}
		<div class={[screen, 'w-full']}>
			<span class={[line, 'w-2/3']}></span>
			<span class={[line, 'w-full']}></span>
			<div class="flex gap-6">
				<span class={gap}>
					<Icon icon={PhoneIcon} class="size-14 text-ui-ui-elements-muted-foreground" />
				</span>
				<span class={gap}>
					<Icon icon={MapPinIcon} class="size-14 text-ui-ui-elements-muted-foreground" />
				</span>
				<span class={gap}>
					<Icon icon={TagIcon} class="size-14 text-ui-ui-elements-muted-foreground" />
				</span>
			</div>
		</div>
	{:else}
		<div class="flex w-full items-center gap-8">
			<div class={[screen, 'w-1/3 rounded-sm']}>
				<span class={badge}>
					<Icon icon={MegaphoneIcon} class="size-14 text-ui-base-primary-foreground" />
				</span>
				<span class={[line, 'w-full']}></span>
				<span class={[line, 'w-2/3']}></span>
			</div>
			<Icon icon={ArrowRightIcon} class="size-20 text-ui-ui-elements-muted-foreground" />
			<div class={[screen, 'flex-1']}>
				<Icon icon={CalendarCheckIcon} class="size-20 text-ui-base-foreground" />
				<span class={[line, 'w-full']}></span>
				<span class={[line, 'w-1/2']}></span>
			</div>
		</div>
	{/if}
</div>
