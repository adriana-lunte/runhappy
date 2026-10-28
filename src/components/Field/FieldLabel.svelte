<!--
	FieldLabel — shared building block for form fields (TextField, SearchField…).
	Figma "Label" frame: label text + optional "Info" icon that opens a Tooltip, gap 6.
-->
<script lang="ts" module>
	export interface FieldLabelProps {
		/** id of the input this label belongs to. */
		for: string;
		/** Label text. */
		label: string;
		/** Hides the row visually but keeps the label for screen readers (Figma: Label = No). */
		hideLabel?: boolean;
		/** Text for the tooltip of the "Info" icon. No icon when empty. */
		info?: string;
	}
</script>

<script lang="ts">
	import { InfoIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';
	import { Tooltip } from '#components/Tooltip';

	let { for: inputId, label, hideLabel = false, info }: FieldLabelProps = $props();
</script>

<div class={['flex items-center gap-6', hideLabel && 'sr-only']}>
	<label for={inputId} class="type-ui-body-4-medium text-ui-base-foreground">{label}</label>
	{#if info}
		<Tooltip text={info}>
			{#snippet trigger(props)}
				<!-- Touch target of at least 24 × 24 (WCAG 2.5.8); negative margins keep the row as tall as in Figma. -->
				<button
					type="button"
					{...props}
					aria-label={`More information about ${label}`}
					class="-m-4 inline-flex size-24 cursor-help items-center justify-center rounded-full focus-ring"
				>
					<!-- Figma "Info": Phosphor duotone, yellow layer + dark drawing (size-14 = Figma size). -->
					<Icon icon={InfoIcon} duotone class="size-14 text-ui-base-primary-foreground" />
				</button>
			{/snippet}
		</Tooltip>
	{/if}
</div>
