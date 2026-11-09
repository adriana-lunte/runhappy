<!--
	Self Onboarding · 2 Venue (Figma V2 node 78:3640). As in staging, Continue stays disabled until the address,
	city, state and ZIP code are filled; showing what is missing was proposed and is still to confirm.
-->
<script lang="ts">
	import { Card } from '#components/Card';
	import { Dropdown } from '#components/Dropdown';
	import { TextField } from '#components/TextField';
	import { Textarea } from '#components/Textarea';
	import { intros, timeZones, type OnboardingData } from '#lib/self-onboarding/sample.ts';
	import StepFooter from './StepFooter.svelte';
	import StepIntro from './StepIntro.svelte';

	interface Props {
		/** The venue fields (edited in place). */
		venue: OnboardingData['venue'];
		onback: () => void;
		onnext: () => void;
	}

	let { venue, onback, onnext }: Props = $props();

	const complete = $derived(
		[venue.street, venue.city, venue.state, venue.zip].every((value) => value.trim())
	);
</script>

<StepIntro {...intros.venue} />
<Card tone="muted" class="flex flex-col gap-16">
	<Textarea label="What do you offer?" maxlength={2000} bind:value={venue.offer} />
	<hr class="border-ui-base-border" />
	<TextField label="Location name" bind:value={venue.locationName} />
	<TextField label="Street address" autocomplete="street-address" bind:value={venue.street} />
	<div class="flex gap-12">
		<TextField
			label="City"
			autocomplete="address-level2"
			bind:value={venue.city}
			class="basis-1/2"
		/>
		<TextField
			label="State"
			autocomplete="address-level1"
			bind:value={venue.state}
			class="min-w-0 flex-1"
		/>
		<TextField
			label="ZIP code"
			autocomplete="postal-code"
			bind:value={venue.zip}
			class="min-w-0 flex-1"
		/>
	</div>
	<Dropdown label="Time zone" options={timeZones} bind:value={venue.timeZone} />
</Card>
<StepFooter {onback} oncontinue={onnext} continueDisabled={!complete} />
