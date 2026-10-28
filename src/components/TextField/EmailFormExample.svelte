<!--
	Example for Storybook and for developers: how a form validates a TextField with Zod.
	The schema decides what is valid; the TextField only shows the message it receives in `error`.
-->
<script lang="ts">
	import { z } from 'zod';
	import { Button } from '#components/Button';
	import TextField from './TextField.svelte';

	const schema = z.object({
		email: z.email('Enter a valid email address')
	});

	let email = $state('');
	let error = $state<string>();
	let submitted = $state(false);

	function validate(): boolean {
		const result = schema.safeParse({ email });
		error = result.success ? undefined : result.error.issues[0]?.message;
		return result.success;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = validate();
	}
</script>

<!-- novalidate: Zod handles validation, so the browser's own popups do not appear. -->
<form onsubmit={handleSubmit} novalidate class="flex max-w-sm flex-col gap-16">
	<TextField
		label="Email"
		type="email"
		name="email"
		autocomplete="email"
		placeholder="name@example.com"
		bind:value={email}
		{error}
		onblur={validate}
	/>
	<Button type="submit">Submit</Button>
	{#if submitted}
		<p role="status" class="type-ui-body-4-regular text-ui-base-foreground">Valid: {email}</p>
	{/if}
</form>
