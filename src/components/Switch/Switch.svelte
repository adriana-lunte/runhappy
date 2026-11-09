<!--
	Switch — Runhappy design system
	Figma: UI Library | Runhappy → Components → switch
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-701

	An on / off control (Self Onboarding: a day open or closed). A native checkbox with role="switch", drawn as a
	36 × 20 track with a 16 px knob: on = ui/base/primary track + primary-foreground knob, off = ui/base/input track +
	ui/base/background knob. The label sits to the right and is part of the click target (WCAG 2.2 target size).
	Figma has only on / off: hover (none), focus (shared focus ring) and disabled (warm gray) follow the
	Checkbox — to confirm in Figma.
-->
<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface SwitchProps extends Omit<
		HTMLInputAttributes,
		'type' | 'role' | 'checked' | 'class'
	> {
		/** Label text. Always required: screen readers need it even when it is hidden. */
		label: string;
		/** Hides the label visually but keeps it for screen readers. */
		hideLabel?: boolean;
		/** On or off. Use `bind:checked` to read it. */
		checked?: boolean;
		/** Classes for the label text (e.g. a fixed width so columns line up). */
		labelClass?: string;
		/** Layout classes for the whole control. */
		class?: string;
	}
</script>

<script lang="ts">
	let {
		label,
		hideLabel = false,
		checked = $bindable(false),
		labelClass,
		disabled = false,
		class: className,
		...rest
	}: SwitchProps = $props();
</script>

<label
	class={[
		'inline-flex items-center gap-12',
		disabled ? 'cursor-not-allowed' : 'cursor-pointer',
		className
	]}
>
	<span class="grid shrink-0 place-items-center">
		<input
			type="checkbox"
			role="switch"
			bind:checked
			{disabled}
			class={[
				'peer col-start-1 row-start-1 m-0 h-20 w-(--size-switch-track) cursor-pointer appearance-none rounded-full focus-ring disabled:cursor-not-allowed',
				'bg-ui-base-input checked:bg-ui-base-primary',
				'disabled:bg-brand-neutral-warm-gray-light disabled:checked:bg-brand-neutral-warm-gray-mid',
				'transition-colors duration-150 motion-reduce:transition-none'
			]}
			{...rest}
		/>
		<span
			class={[
				'pointer-events-none col-start-1 row-start-1 size-16 -translate-x-8 rounded-full bg-ui-base-background',
				'peer-checked:translate-x-8 peer-checked:bg-ui-base-primary-foreground',
				'transition duration-150 motion-reduce:transition-none'
			]}
		></span>
	</span>
	<span
		class={[
			'type-ui-body-3-medium text-ui-base-foreground',
			disabled && 'text-ui-ui-elements-muted-foreground',
			hideLabel && 'sr-only',
			labelClass
		]}
	>
		{label}
	</span>
</label>
