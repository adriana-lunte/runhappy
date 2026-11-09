<!--
	Self Onboarding · 3 Knowledge (Figma V2 nodes 78:3662 and 78:3687 for the dialog). Each document opens in the
	edit dialog; the trash removes it. The add panel has two tabs: a page address, or a note with a title and text.
	New items are added at the end of the list with no source chip. The dialog's rich-text editor is not designed
	yet: a Textarea stands in (to confirm).
-->
<script lang="ts">
	import { Button } from '#components/Button';
	import { Card } from '#components/Card';
	import { Dialog } from '#components/Dialog';
	import { SourceRow } from '#components/SourceRow';
	import { Tabs } from '#components/Tabs';
	import { TextField } from '#components/TextField';
	import { Textarea } from '#components/Textarea';
	import { intros, type KnowledgeDoc } from '#lib/self-onboarding/sample.ts';
	import StepFooter from './StepFooter.svelte';
	import StepIntro from './StepIntro.svelte';

	interface Props {
		/** The documents (edited in place). */
		docs: KnowledgeDoc[];
		onback: () => void;
		onnext: () => void;
	}

	let { docs, onback, onnext }: Props = $props();

	// Edit dialog
	let editing: KnowledgeDoc | undefined = $state();
	let editTitle = $state('');
	let editBody = $state('');
	let dialogOpen = $state(false);

	function openDoc(doc: KnowledgeDoc) {
		editing = doc;
		editTitle = doc.title;
		editBody = doc.body.length ? doc.body.join('\n') : doc.detail;
		dialogOpen = true;
	}

	function saveDoc() {
		if (editing) {
			editing.title = editTitle.trim() || editing.title;
			editing.body = editBody.split('\n');
			editing.detail = editing.body.find((line) => line.trim()) ?? editing.detail;
		}
		dialogOpen = false;
	}

	function removeDoc(id: string) {
		const index = docs.findIndex((doc) => doc.id === id);
		if (index >= 0) docs.splice(index, 1);
	}

	// Add panel
	let pageAddress = $state('');
	let noteTitle = $state('');
	let noteText = $state('');

	function addDoc(title: string, body: string) {
		docs.push({ id: crypto.randomUUID(), title, detail: body || title, body: body ? [body] : [] });
	}
</script>

<StepIntro {...intros.knowledge} />

<ul class="flex flex-col gap-8">
	{#each docs as doc (doc.id)}
		<li>
			<SourceRow
				title={doc.title}
				detail={doc.detail}
				source={doc.source}
				onopen={() => openDoc(doc)}
				onremove={() => removeDoc(doc.id)}
			/>
		</li>
	{/each}
</ul>

<Card tone="muted">
	<Tabs
		label="Add to what your front desk knows"
		items={[
			{ value: 'page', label: 'Page' },
			{ value: 'notes', label: 'Notes' }
		]}
	>
		{#snippet panel(tab)}
			{#if tab.value === 'page'}
				<form
					class="flex items-end gap-12"
					onsubmit={(event) => {
						event.preventDefault();
						addDoc(pageAddress.trim(), '');
						pageAddress = '';
					}}
				>
					<TextField
						label="Page address"
						placeholder="https://example.com/faq"
						inputmode="url"
						bind:value={pageAddress}
						class="flex-1"
					/>
					<Button type="submit" variant="secondary" disabled={!pageAddress.trim()}>Add page</Button>
				</form>
			{:else}
				<form
					class="flex flex-col gap-16"
					onsubmit={(event) => {
						event.preventDefault();
						addDoc(noteTitle.trim(), noteText.trim());
						noteTitle = '';
						noteText = '';
					}}
				>
					<TextField label="Title" placeholder="Party rules" bind:value={noteTitle} />
					<Textarea
						label="What it should know"
						placeholder="Deposits are half the package price and refundable up to 7 days before the party. Bring your own cake; other outside food is not allowed."
						bind:value={noteText}
					/>
					<Button
						type="submit"
						variant="secondary"
						disabled={!noteTitle.trim() || !noteText.trim()}
						class="self-end"
					>
						Add notes
					</Button>
				</form>
			{/if}
		{/snippet}
	</Tabs>
</Card>

<StepFooter {onback} oncontinue={onnext} />

<Dialog bind:open={dialogOpen} title={editing?.title ?? ''} class="flex flex-col gap-16">
	<TextField label="Title" bind:value={editTitle} />
	<Textarea label="What it should know" rows={10} bind:value={editBody} />
	{#snippet actions()}
		<Button variant="tertiary" onclick={() => (dialogOpen = false)}>Cancel</Button>
		<Button onclick={saveDoc}>Save</Button>
	{/snippet}
</Dialog>
