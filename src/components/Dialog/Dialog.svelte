<!--
	Dialog — Runhappy design system
	Figma: no library component yet. Drawn in Platform | Runhappy → V2 → "3b · Edit document (dialog)".
	https://www.figma.com/design/jxizwQMDvY8jc0sD9UpG21/Platform-%7C-Runhappy?node-id=78-3687

	A modal window: the native <dialog> opened with showModal(), so focus moves in (to the first field) and stays
	in, Escape closes it and the page behind can't be used. Layout from Figma: 560 wide, padding 24, gap 16, radius sm,
	ui/ui elements/popover background, shadow/overlay. Title bar: title (UI/Subtitle/2) and a close button.
	The dark layer behind it has no token yet: the browser default is used — to confirm.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface DialogProps {
		/** Open or closed. Use `bind:open`; it turns false when the user closes the dialog. */
		open?: boolean;
		/** Title at the top. Also the dialog's name for screen readers. */
		title: string;
		/** Called after the dialog closes (close button, Escape or code). */
		onclose?: () => void;
		/** Content between the title and the actions. */
		children: Snippet;
		/** Buttons at the bottom right, e.g. Cancel and Save. */
		actions?: Snippet;
		/** Layout classes for the content area. */
		class?: string;
	}
</script>

<script lang="ts">
	import { XIcon } from 'phosphor-svelte';
	import { IconButton } from '#components/IconButton';

	let {
		open = $bindable(false),
		title,
		onclose,
		children,
		actions,
		class: className
	}: DialogProps = $props();

	const uid = $props.id();
	const titleId = `${uid}-title`;
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
			// Start in the first field rather than on the close button (which would also open its tooltip).
			dialog.querySelector<HTMLElement>('input, textarea, select')?.focus();
		}
		if (!open && dialog.open) dialog.close();
	});
</script>

<dialog
	bind:this={dialog}
	aria-labelledby={titleId}
	onclose={() => {
		open = false;
		onclose?.();
	}}
	class="m-auto w-(--size-onboarding-column) max-w-full rounded-sm bg-ui-ui-elements-popover p-24 text-ui-base-foreground shadow-overlay"
>
	<div class="flex flex-col gap-16">
		<div class="flex items-center justify-between gap-16">
			<h2 id={titleId} class="type-ui-subtitle-2 text-ui-base-foreground">{title}</h2>
			<IconButton icon={XIcon} label="Close" onclick={() => (open = false)} />
		</div>
		<div class={className}>{@render children()}</div>
		{#if actions}
			<div class="flex justify-end gap-8">{@render actions()}</div>
		{/if}
	</div>
</dialog>
