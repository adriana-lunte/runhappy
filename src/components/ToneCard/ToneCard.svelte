<!--
	ToneCard — Runhappy design system
	Figma: UI Library | Runhappy → Components → tone-card
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-771

	One radio option shown as a card (Self Onboarding: the tone). A native radio with the Radio look (shared Choice
	classes), the option name, a description and an optional "Recommended" chip. Padding 16, gap 6, radius sm,
	ui/ui elements/card background. Not chosen: 1 px ui/base/input border. Chosen: 3 px ui/base/primary border.
	The whole card is the click target. Put the cards in a <fieldset> with a <legend> (the group name) and give them
	the same `name`. Hover (none) and focus (the radio's shared ring) follow Radio — to confirm in Figma.
-->
<script lang="ts" module>
	export interface ToneCardProps {
		/** Option name, e.g. "Polished". */
		label: string;
		/** Line under the name. */
		description: string;
		/** Value sent with the form. */
		value: string;
		/** Same name for every card in the group. */
		name: string;
		/** This option is the chosen one. */
		selected?: boolean;
		/** Shows the "Recommended" chip. */
		recommended?: boolean;
		/** Called when the user chooses this option. */
		onselect?: (value: string) => void;
		/** Layout classes (width, flex). */
		class?: string;
	}
</script>

<script lang="ts">
	import { choiceInputClasses } from '#components/Choice';
	import { Chip } from '#components/Chip';

	let {
		label,
		description,
		value,
		name,
		selected = false,
		recommended = false,
		onselect,
		class: className
	}: ToneCardProps = $props();
</script>

<label
	class={[
		'flex cursor-pointer flex-col items-start gap-6 rounded-sm bg-ui-ui-elements-card p-16',
		selected
			? 'inset-ring-(length:--border-selected) inset-ring-ui-base-primary'
			: 'inset-ring inset-ring-ui-base-input',
		className
	]}
>
	<span class="flex items-center gap-12">
		<span class="grid h-lh shrink-0 place-items-center type-ui-body-2-regular">
			<input
				type="radio"
				{name}
				{value}
				checked={selected}
				onchange={() => onselect?.(value)}
				class={choiceInputClasses('radio', 'medium')}
			/>
			<span
				class="pointer-events-none invisible col-start-1 row-start-1 size-8 rounded-full bg-ui-base-primary-foreground peer-checked:visible"
			></span>
		</span>
		<span class="type-ui-body-2-regular text-ui-base-foreground">{label}</span>
	</span>
	<span class="type-ui-body-4-regular text-ui-ui-elements-muted-foreground">{description}</span>
	{#if recommended}<Chip>Recommended</Chip>{/if}
</label>
