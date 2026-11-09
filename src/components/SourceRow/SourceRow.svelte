<!--
	SourceRow — Runhappy design system
	Figma: UI Library | Runhappy → Components → source-row
	https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=233-702

	An item found on the website (Self Onboarding: a knowledge document or a package): optional file icon, title,
	source chip, one-line detail and a remove button. Background ui/ui elements/card, radius sm, padding 12/16.
	Two separate buttons, never nested: the text area opens the item (`onopen`, e.g. the edit dialog) and the trash
	removes it. Figma has no hover / focus: hover tints the row (ui/base/hover) and focus uses the shared ring —
	to confirm in Figma.
-->
<script lang="ts" module>
	export interface SourceRowProps {
		/** Item name, e.g. "About Lunte Studio". */
		title: string;
		/** One line under the title (cut with "…" when too long). */
		detail: string;
		/** Text of the source chip, e.g. "Drafted from your site". No chip when empty. */
		source?: string;
		/** Shows the file icon (knowledge documents). Packages have none. */
		showIcon?: boolean;
		/** Called when the user opens the item. Without it the text is not a button. */
		onopen?: () => void;
		/** Called when the user removes the item. Without it there is no remove button. */
		onremove?: () => void;
		/** Layout classes (width, margin). */
		class?: string;
	}
</script>

<script lang="ts">
	import { FileTextIcon, TrashIcon } from 'phosphor-svelte';
	import { Chip } from '#components/Chip';
	import { Icon } from '#components/Icon';
	import { IconButton } from '#components/IconButton';

	let {
		title,
		detail,
		source,
		showIcon = true,
		onopen,
		onremove,
		class: className
	}: SourceRowProps = $props();
</script>

{#snippet body()}
	{#if showIcon}
		<Icon icon={FileTextIcon} class="size-20 shrink-0 text-ui-ui-elements-muted-foreground" />
	{/if}
	<span class="flex min-w-0 flex-1 flex-col gap-4">
		<span class="flex flex-wrap items-center gap-8">
			<span class="type-ui-body-3-medium text-ui-base-foreground">{title}</span>
			{#if source}<Chip>{source}</Chip>{/if}
		</span>
		<span class="truncate type-ui-body-4-regular text-ui-ui-elements-muted-foreground">
			{detail}
		</span>
	</span>
{/snippet}

<div
	class={[
		'flex items-center gap-8 rounded-sm bg-ui-ui-elements-card py-12 pr-16 pl-4',
		onopen && 'transition-colors duration-150 hover:bg-ui-base-hover motion-reduce:transition-none',
		className
	]}
>
	{#if onopen}
		<button
			type="button"
			class="flex min-w-0 flex-1 cursor-pointer items-center gap-12 rounded-xs px-12 py-4 text-left focus-ring"
			onclick={onopen}
		>
			{@render body()}
		</button>
	{:else}
		<div class="flex min-w-0 flex-1 items-center gap-12 px-12 py-4">{@render body()}</div>
	{/if}
	{#if onremove}
		<IconButton icon={TrashIcon} label={`Remove ${title}`} onclick={onremove} />
	{/if}
</div>
