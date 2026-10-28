<!--
	Example for Storybook and for developers: a required checkbox validated with Zod.
-->
<script lang="ts">
	import { z } from 'zod';
	import { Button } from '#components/Button';
	import Checkbox from './Checkbox.svelte';

	const schema = z.object({
		terms: z.literal(true, 'Accept the terms to continue')
	});

	let terms = $state(false);
	let error = $state<string>();
	let submitted = $state(false);

	function validate(): boolean {
		const result = schema.safeParse({ terms });
		error = result.success ? undefined : result.error.issues[0]?.message;
		return result.success;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		submitted = validate();
	}
</script>

<form onsubmit={handleSubmit} novalidate class="flex max-w-sm flex-col gap-16">
	<Checkbox
		label="I accept the terms"
		name="terms"
		bind:checked={terms}
		{error}
		onchange={validate}
	/>
	<Button type="submit">Submit</Button>
	{#if submitted}
		<p role="status" class="type-ui-body-4-regular text-ui-base-foreground">Valid</p>
	{/if}
</form>
