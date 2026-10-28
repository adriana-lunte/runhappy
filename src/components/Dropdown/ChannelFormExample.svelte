<!--
	Example for Storybook and for developers: a required Dropdown validated with Zod.
-->
<script lang="ts">
	import { z } from 'zod';
	import { EnvelopeIcon, HouseIcon } from 'phosphor-svelte';
	import { Button } from '#components/Button';
	import Dropdown from './Dropdown.svelte';

	const options = [
		{ value: 'instagram', label: '@instagram_user', icon: HouseIcon },
		{ value: 'facebook', label: 'Facebook User', icon: HouseIcon },
		{ value: 'whatsapp', label: 'WhatsApp +123456789', icon: HouseIcon },
		{ value: 'email', label: 'Email', icon: EnvelopeIcon, disabled: true }
	];

	const schema = z.object({ channel: z.string('Choose a channel').min(1, 'Choose a channel') });

	let channel = $state<string>();
	let error = $state<string>();
	let submitted = $state(false);

	function validate(): boolean {
		const result = schema.safeParse({ channel });
		error = result.success ? undefined : result.error.issues[0]?.message;
		return result.success;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = validate();
	}
</script>

<form onsubmit={handleSubmit} novalidate class="flex max-w-sm flex-col gap-16">
	<Dropdown
		label="Channel"
		name="channel"
		{options}
		bind:value={channel}
		{error}
		onchange={validate}
	/>
	<Button type="submit">Submit</Button>
	{#if submitted}
		<p role="status" class="type-ui-body-4-regular text-ui-base-foreground">Valid: {channel}</p>
	{/if}
</form>
