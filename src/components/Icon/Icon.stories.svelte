<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		CaretDownIcon,
		CaretRightIcon,
		CheckIcon,
		HouseIcon,
		ImageIcon,
		InfoIcon,
		MagnifyingGlassIcon,
		PlusIcon,
		WarningCircleIcon,
		XIcon
	} from 'phosphor-svelte';
	import Icon from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Components/Icon',
		component: Icon,
		tags: ['autodocs'],
		args: { icon: HouseIcon, duotone: true, class: 'size-24 text-ui-base-foreground' },
		argTypes: { icon: { control: false } },
		parameters: {
			docs: {
				description: {
					component: [
						'Phosphor icons (same set as the Figma "Icons" page). Size and color come from classes.',
						'`duotone` shows the brand-yellow layer: only where the icon communicates (Info, active items, menu/content icons). Action icons inside controls stay without yellow.'
					].join('\n\n')
				}
			}
		}
	});

	const withYellow = [
		{ name: 'Info', icon: InfoIcon },
		{ name: 'House', icon: HouseIcon },
		{ name: 'Image', icon: ImageIcon }
	];
	const withoutYellow = [
		{ name: 'MagnifyingGlass', icon: MagnifyingGlassIcon },
		{ name: 'X', icon: XIcon },
		{ name: 'Plus', icon: PlusIcon },
		{ name: 'Check', icon: CheckIcon },
		{ name: 'WarningCircle', icon: WarningCircleIcon }
	];
</script>

<Story name="Default" />

<Story name="Yellow rule" parameters={{ controls: { disable: true } }}>
	{#snippet template()}
		<div class="flex flex-col gap-24">
			<section class="flex flex-col gap-12">
				<h2 class="type-ui-subtitle-3">duotone — icons that communicate</h2>
				<div class="flex gap-24">
					{#each withYellow as item (item.name)}
						<div class="flex flex-col items-center gap-8">
							<Icon icon={item.icon} duotone class="size-24 text-ui-base-primary-foreground" />
							<span class="type-ui-body-5-regular text-brand-text-secondary">{item.name}</span>
						</div>
					{/each}
				</div>
			</section>
			<section class="flex flex-col gap-12">
				<h2 class="type-ui-subtitle-3">plain (no yellow) — action icons inside controls</h2>
				<div class="flex gap-24">
					{#each withoutYellow as item (item.name)}
						<div class="flex flex-col items-center gap-8">
							<Icon icon={item.icon} class="size-24 text-ui-base-foreground" />
							<span class="type-ui-body-5-regular text-brand-text-secondary">{item.name}</span>
						</div>
					{/each}
				</div>
			</section>
			<section class="flex flex-col gap-12">
				<h2 class="type-ui-subtitle-3">regular — carets inside controls (chevrons)</h2>
				<div class="flex gap-24">
					<div class="flex flex-col items-center gap-8">
						<Icon icon={CaretDownIcon} regular class="size-24 text-ui-base-foreground" />
						<span class="type-ui-body-5-regular text-brand-text-secondary">CaretDown Regular</span>
					</div>
					<div class="flex flex-col items-center gap-8">
						<Icon icon={CaretRightIcon} regular class="size-24 text-ui-base-foreground" />
						<span class="type-ui-body-5-regular text-brand-text-secondary">CaretRight Regular</span>
					</div>
				</div>
			</section>
		</div>
	{/snippet}
</Story>
