<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, within } from 'storybook/test';
	import ConversationItem from './ConversationItem.svelte';

	const { Story } = defineMeta({
		title: 'Components/ConversationItem',
		component: ConversationItem,
		tags: ['autodocs'],
		args: {
			href: '#conversation',
			name: 'Sam Rivera',
			detail: 'sam@example.com',
			unread: false,
			current: false
		},
		parameters: {
			docs: {
				description: {
					component: [
						'A link that opens a conversation. States: idle, hover, active (the open conversation: strong yellow, dark text), keyboard focus; unread shows a dot and screen readers hear "Unread".',
						'An active conversation is never unread. Long names and details are cut with "…".',
						'[Open in Figma](https://www.figma.com/design/Ax9De11Plc2yPyfQHrGuJn/UI-Library-%7C-Runhappy?node-id=171-354)'
					].join('\n\n')
				}
			}
		}
	});
</script>

<Story name="Read" />

<Story name="Unread" args={{ unread: true }} />

<Story name="Active" args={{ current: true }} />

<!-- Every state + test: unread word, active ignores unread, long text is cut. Hover or Tab to see hover and focus. -->
<Story
	name="All states"
	parameters={{ controls: { disable: true } }}
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole('link', { name: /^Unread: Alex Kim/ })).toBeInTheDocument();

		const active = canvas.getByRole('link', { name: /Sam Rivera/ });
		await expect(active).toHaveAttribute('aria-current', 'page');
		await expect(active).not.toHaveAccessibleName(/Unread/);

		const longDetail = canvas.getByText(/maria.fernanda/);
		await expect(longDetail.scrollWidth).toBeGreaterThan(longDetail.clientWidth);
	}}
>
	{#snippet template()}
		<ul class="flex max-w-xs flex-col gap-4">
			<li><ConversationItem href="#1" name="Alex Kim" detail="+1 555 0100" unread /></li>
			<li><ConversationItem href="#2" name="Jordan Lee" detail="jordan@example.com" /></li>
			<li>
				<ConversationItem href="#3" name="Sam Rivera" detail="sam@example.com" unread current />
			</li>
			<li>
				<ConversationItem
					href="#4"
					name="Maria Fernanda Gutiérrez de la Torre"
					detail="maria.fernanda.gutierrez@example-company.com"
					unread
				/>
			</li>
		</ul>
	{/snippet}
</Story>
