<!--
	StepIllustration — the "R" illustration of a Self Onboarding screen (decorative). Files are cropped like Figma
	and saved at 2x; `srcset … 2x` shows them at their Figma size. In dark mode it shows `dark` (light outlines)
	when there is one (Adriana, 2026-11-09); otherwise the same image in both modes.
-->
<script lang="ts">
	interface Props {
		/** Image URL, 2x. */
		src: string;
		/** Dark-mode version (light outlines), 2x. */
		dark?: string;
	}

	let { src, dark }: Props = $props();
</script>

{#if dark}
	<img {src} srcset="{src} 2x" alt="" class="shrink-0 dark:hidden" />
	<img src={dark} srcset="{dark} 2x" alt="" class="hidden shrink-0 dark:block" />
{:else}
	<img {src} srcset="{src} 2x" alt="" class="shrink-0" />
{/if}
