<!--
	FieldMessage — shared building block for form fields (TextField, SearchField…).
	Figma "Supporting text" frame: the help text, or the error message (with icon) instead of it.
	aria-live: the error is announced as soon as it appears.
-->
<script lang="ts" module>
	export interface FieldMessageProps {
		/** Help text. Hidden while there is an error. */
		helperText?: string;
		/** Error message. */
		error?: string;
		/** id for the help text, so the input can point to it with aria-describedby. */
		helperId: string;
		/** id for the error message, so the input can point to it with aria-describedby. */
		errorId: string;
	}
</script>

<script lang="ts">
	import { WarningCircleIcon } from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let { helperText, error, helperId, errorId }: FieldMessageProps = $props();
</script>

<div aria-live="polite">
	{#if error}
		<p
			id={errorId}
			class="flex items-center gap-6 type-ui-body-5-regular text-ui-status-destructive-foreground"
		>
			<Icon icon={WarningCircleIcon} class="size-14" />
			{error}
		</p>
	{:else if helperText}
		<p id={helperId} class="type-ui-body-5-regular text-ui-ui-elements-muted-foreground">
			{helperText}
		</p>
	{/if}
</div>
