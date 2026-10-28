<!--
	Internal building blocks shared by TextField, SearchField and the next form fields.
	Pages do not use them directly: use TextField / SearchField.
-->
<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FieldBox from './FieldBox.svelte';
	import FieldLabel from './FieldLabel.svelte';
	import FieldMessage from './FieldMessage.svelte';

	const { Story } = defineMeta({
		title: 'Components/Field parts (internal)',
		parameters: {
			docs: {
				description: {
					component:
						'FieldLabel (label + Info tooltip), FieldBox (the box: border, focus ring, error, hover) and FieldMessage (help text or error). Use them to build new fields.'
				}
			}
		}
	});
</script>

<Story name="Parts">
	{#snippet template()}
		<div class="flex max-w-sm flex-col gap-32 pt-48">
			<div class="flex flex-col gap-8">
				<FieldLabel for="demo-1" label="FieldLabel with info" info="Tooltip text." />
				<FieldBox>
					<input
						id="demo-1"
						class="min-w-0 flex-1 bg-transparent type-ui-body-3-regular outline-hidden"
						placeholder="Inside FieldBox"
					/>
				</FieldBox>
				<FieldMessage
					helperText="FieldMessage: help text"
					helperId="demo-1-help"
					errorId="demo-1-err"
				/>
			</div>
			<div class="flex flex-col gap-8">
				<FieldLabel for="demo-2" label="Error state" />
				<FieldBox invalid>
					<input
						id="demo-2"
						aria-invalid="true"
						aria-describedby="demo-2-err"
						class="min-w-0 flex-1 bg-transparent type-ui-body-3-regular outline-hidden"
						value="Typed"
					/>
				</FieldBox>
				<FieldMessage error="FieldMessage: error" helperId="demo-2-help" errorId="demo-2-err" />
			</div>
		</div>
	{/snippet}
</Story>
