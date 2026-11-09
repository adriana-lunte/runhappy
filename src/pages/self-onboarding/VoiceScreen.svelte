<!--
	Self Onboarding · 6 Voice (Figma V2 node 78:3611). Name, greeting, tone (three cards) and voice (searchable
	list). Only the recommended tone (Polished) shows "Recommended" (Adriana, 2026-11-09).
	Play does nothing yet (no audio in this front-end version). The last Continue does not go anywhere yet
	(to confirm what comes after the setup).
-->
<script lang="ts">
	import { Card } from '#components/Card';
	import { SearchField } from '#components/SearchField';
	import { TextField } from '#components/TextField';
	import { Textarea } from '#components/Textarea';
	import { ToneCard } from '#components/ToneCard';
	import { VoiceCard } from '#components/VoiceCard';
	import { intros, tones, voices } from '#lib/self-onboarding/sample.ts';
	import StepFooter from './StepFooter.svelte';
	import StepIntro from './StepIntro.svelte';

	interface Props {
		assistantName: string;
		greeting: string;
		tone: string;
		voice: string;
		onback: () => void;
		oncontinue?: () => void;
	}

	let {
		assistantName = $bindable(),
		greeting = $bindable(),
		tone = $bindable(),
		voice = $bindable(),
		onback,
		oncontinue
	}: Props = $props();

	let search = $state('');
	const shown = $derived(
		voices.filter((item) =>
			`${item.name} ${item.meta}`.toLowerCase().includes(search.trim().toLowerCase())
		)
	);
</script>

<StepIntro {...intros.voice} />
<Card tone="muted" class="flex flex-col gap-16">
	<TextField
		label="Name it introduces itself with"
		placeholder="Riley"
		bind:value={assistantName}
	/>
	<Textarea
		label="Greeting"
		maxlength={1000}
		rows={2}
		helperText="What it says when it picks up. Leave it blank and we'll write one in your tone."
		bind:value={greeting}
	/>

	<fieldset class="flex flex-col gap-16">
		<legend class="mb-16 type-ui-body-3-medium text-ui-base-foreground">Tone</legend>
		<div class="flex items-start gap-12">
			{#each tones as option (option.value)}
				<ToneCard
					{...option}
					name="tone"
					selected={tone === option.value}
					onselect={(value) => (tone = value)}
					class="flex-1"
				/>
			{/each}
		</div>
	</fieldset>

	<fieldset class="flex flex-col gap-12">
		<legend class="mb-16 type-ui-body-3-medium text-ui-base-foreground">Voice</legend>
		<SearchField label="Search voices" hideLabel placeholder="Search voices" bind:value={search} />
		{#each shown as item (item.value)}
			<VoiceCard
				{...item}
				group="voice"
				selected={voice === item.value}
				recommended={item.recommended}
				onselect={(value) => (voice = value)}
			/>
		{:else}
			<p class="type-ui-body-3-regular text-ui-ui-elements-muted-foreground">No results</p>
		{/each}
	</fieldset>
</Card>
<StepFooter {onback} {oncontinue} />
