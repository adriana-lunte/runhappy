<!--
	VoiceCard — Runhappy design system
	Figma: UI Library | Runhappy → Components → voice-card (look as used in Platform | Runhappy → V2)
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-808

	One voice option (Self Onboarding step 6): a play button to hear it, the name, accent · gender · style, an
	optional "Recommended" chip and, when chosen, a yellow check. Padding 12/16, gap 12, radius sm.
	  Not chosen: ui/base/border background, 1 px ui/base/hover border.
	  Chosen:     ui/ui elements/card background, 3 px ui/base/primary border, yellow check.
	It is a radio (hidden, the card shows the state): put the cards in a <fieldset> with the same `name`.
	The play button sits outside the radio's label, so the two never nest. Missing in Figma: hover, focus and
	"playing" — focus shows the shared ring around the name area; to confirm.
-->
<script lang="ts" module>
	export interface VoiceCardProps {
		/** Voice name, e.g. "Lauren - Friendly Customer Care Agent". */
		name: string;
		/** Accent · gender · style, e.g. "American · Female · Conversational". */
		meta: string;
		/** Value sent with the form. */
		value: string;
		/** Same name for every card in the group (the radio group name). */
		group: string;
		/** This voice is the chosen one. */
		selected?: boolean;
		/** Shows the "Recommended" chip. */
		recommended?: boolean;
		/** Called when the user chooses this voice. */
		onselect?: (value: string) => void;
		/** Called when the user presses play. */
		onplay?: (value: string) => void;
		/** Layout classes (width). */
		class?: string;
	}
</script>

<script lang="ts">
	import { CheckIcon, PlayIcon } from 'phosphor-svelte';
	import { Chip } from '#components/Chip';
	import { Icon } from '#components/Icon';
	import { IconButton } from '#components/IconButton';

	let {
		name,
		meta,
		value,
		group,
		selected = false,
		recommended = false,
		onselect,
		onplay,
		class: className
	}: VoiceCardProps = $props();
</script>

<div
	class={[
		'flex items-center gap-4 rounded-sm py-12 pr-16 pl-16',
		selected
			? 'bg-ui-ui-elements-card inset-ring-(length:--border-selected) inset-ring-ui-base-primary'
			: 'bg-ui-base-border inset-ring inset-ring-ui-base-hover',
		className
	]}
>
	<IconButton
		icon={PlayIcon}
		label={`Play ${name}`}
		onclick={() => onplay?.(value)}
		class="bg-brand-accent-yellow-background"
	/>
	<label
		class="flex min-w-0 flex-1 cursor-pointer items-center gap-12 rounded-xs px-8 py-4 focus-ring-within"
	>
		<input
			type="radio"
			name={group}
			{value}
			checked={selected}
			onchange={() => onselect?.(value)}
			class="sr-only"
		/>
		<span class="flex min-w-0 flex-1 flex-col items-start gap-4">
			<span class="type-ui-body-3-medium text-ui-base-foreground">{name}</span>
			<span class="type-ui-body-4-regular text-ui-ui-elements-muted-foreground">{meta}</span>
			{#if recommended}<Chip>Recommended</Chip>{/if}
		</span>
		{#if selected}
			<span class="grid size-24 shrink-0 place-items-center rounded-full bg-ui-base-primary">
				<Icon icon={CheckIcon} class="size-16 text-ui-base-primary-foreground" />
			</span>
		{/if}
	</label>
</div>
