<!--
	Self Onboarding · 4 Packages (Figma V2 node 78:3565). The trash removes a package; the form adds one at the
	end of the list (no source chip). Price is collected but the row does not show it (as in the design).
-->
<script lang="ts">
	import { Button } from '#components/Button';
	import { Card } from '#components/Card';
	import { SourceRow } from '#components/SourceRow';
	import { TextField } from '#components/TextField';
	import { intros, type Package } from '#lib/self-onboarding/sample.ts';
	import StepFooter from './StepFooter.svelte';
	import StepIntro from './StepIntro.svelte';

	interface Props {
		/** The packages (edited in place). */
		packages: Package[];
		onback: () => void;
		onnext: () => void;
	}

	let { packages, onback, onnext }: Props = $props();

	let name = $state('');
	let minutes = $state('90');
	let guests = $state('20');
	let price = $state('');

	function remove(id: string) {
		const index = packages.findIndex((item) => item.id === id);
		if (index >= 0) packages.splice(index, 1);
	}

	function add(event: SubmitEvent) {
		event.preventDefault();
		packages.push({
			id: crypto.randomUUID(),
			name: name.trim(),
			minutes: Number(minutes) || 0,
			guests: Number(guests) || 0
		});
		name = '';
		price = '';
	}
</script>

<StepIntro {...intros.packages} />

<ul class="flex flex-col gap-8">
	{#each packages as item (item.id)}
		<li>
			<SourceRow
				title={item.name}
				detail={`${item.minutes} minutes, up to ${item.guests} guests`}
				source={item.source}
				showIcon={false}
				onremove={() => remove(item.id)}
			/>
		</li>
	{/each}
</ul>

<Card tone="muted">
	<form class="flex flex-col gap-16" onsubmit={add}>
		<TextField label="Package name" placeholder="Basic Party" bind:value={name} />
		<div class="flex gap-12">
			<TextField
				label="Length in minutes"
				type="number"
				min="1"
				bind:value={minutes}
				class="flex-1"
			/>
			<TextField label="Most guests" type="number" min="1" bind:value={guests} class="flex-1" />
		</div>
		<div class="flex items-end gap-12">
			<TextField
				label="Price"
				type="number"
				min="0"
				step="0.01"
				bind:value={price}
				class="flex-1"
			/>
			<Button type="submit" variant="secondary" disabled={!name.trim()} class="flex-1">
				Add package
			</Button>
		</div>
	</form>
</Card>

<StepFooter {onback} oncontinue={onnext} />
