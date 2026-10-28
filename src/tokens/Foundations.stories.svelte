<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import {
		contrastPairs,
		contrastRatio,
		getColorGroups,
		getColorValue,
		getTextStyles,
		type Mode
	} from './docs';

	const { Story } = defineMeta({
		title: 'Foundations/Tokens',
		parameters: {
			layout: 'padded',
			// This page intentionally shows failing color pairs, so it is not a11y-tested.
			a11y: { test: 'off' }
		}
	});

	const colorGroups = getColorGroups();
	const textStyles = getTextStyles();
	const modes: Mode[] = ['light', 'dark'];

	// Class names are written in full so Tailwind can find them.
	const radii = [
		{ name: 'xs', className: 'rounded-xs' },
		{ name: 'sm', className: 'rounded-sm' },
		{ name: 'full', className: 'rounded-full' }
	];
	// Every spacing token, written in full so Tailwind can find the classes. Name = value in px.
	const spacing = [
		{ px: 2, className: 'w-2' },
		{ px: 4, className: 'w-4' },
		{ px: 6, className: 'w-6' },
		{ px: 8, className: 'w-8' },
		{ px: 10, className: 'w-10' },
		{ px: 12, className: 'w-12' },
		{ px: 14, className: 'w-14' },
		{ px: 16, className: 'w-16' },
		{ px: 20, className: 'w-20' },
		{ px: 24, className: 'w-24' },
		{ px: 32, className: 'w-32' },
		{ px: 40, className: 'w-40' },
		{ px: 48, className: 'w-48' },
		{ px: 64, className: 'w-64' }
	];
</script>

<Story name="Colors">
	<div class="flex flex-col gap-32">
		<p class="type-ui-body-2-regular text-brand-text-secondary">
			Use the toolbar “Theme” switch to see dark mode. Class example:
			<code class="type-ui-overline-1">bg-ui-base-primary</code>
		</p>
		{#each colorGroups as { group, tokens } (group)}
			<section class="flex flex-col gap-12">
				<h2 class="type-ui-subtitle-2">{group}</h2>
				<div class="grid grid-cols-2 gap-16 md:grid-cols-4">
					{#each tokens as token (token.name)}
						<div class="flex flex-col gap-8">
							<div
								class="h-64 rounded-xs border border-ui-base-input"
								style:background={`var(--${token.name})`}
							></div>
							<span class="type-ui-body-4-medium">{token.name}</span>
							<span class="type-ui-body-5-regular text-brand-text-secondary">
								{token.light} · {token.dark}
							</span>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</Story>

<Story name="Typography">
	<div class="flex flex-col gap-24">
		{#each textStyles as style (style.className)}
			<div class="flex flex-col gap-4 border-b border-ui-base-border pb-16">
				<span class="type-ui-overline-1 text-brand-text-secondary">
					{style.className} — Figma: {style.figmaName}
				</span>
				<span class={style.className}>Run happy, run far</span>
			</div>
		{/each}
	</div>
</Story>

<Story name="Radius">
	<div class="flex gap-24">
		{#each radii as radius (radius.name)}
			<div class="flex flex-col items-center gap-8">
				<div class="size-64 bg-ui-base-primary {radius.className}"></div>
				<span class="type-ui-body-4-medium">{radius.className}</span>
			</div>
		{/each}
	</div>
</Story>

<Story name="Spacing">
	<div class="flex flex-col gap-12">
		<p class="type-ui-body-2-regular text-brand-text-secondary">
			Name = value in px. Figma <code class="type-ui-overline-1">spacing/16</code> = code
			<code class="type-ui-overline-1">p-16</code>, <code class="type-ui-overline-1">gap-16</code>…
			2–16 inside components, 20–64 for layout.
		</p>
		{#each spacing as item (item.px)}
			<div class="flex items-center gap-16">
				<span class="w-64 type-ui-body-4-medium">{item.px}</span>
				<div class="h-16 bg-ui-base-primary {item.className}"></div>
			</div>
		{/each}
	</div>
</Story>

<Story name="Shadow">
	<div class="flex flex-col gap-16">
		<p class="type-ui-body-2-regular text-brand-text-secondary">
			Runhappy is flat: one shadow only, for floating elements (tooltip, menus, modals). Figma:
			effect style shadow/overlay.
		</p>
		<div class="flex flex-wrap gap-32 p-32">
			<div
				class="flex items-center justify-center rounded-sm bg-ui-base-background p-32 shadow-overlay"
			>
				<span class="type-ui-body-4-medium">shadow-overlay</span>
			</div>
			<div
				class="flex items-center justify-center rounded-sm bg-brand-background-subtle p-32 shadow-overlay"
			>
				<span class="type-ui-body-4-medium">on a subtle surface</span>
			</div>
		</div>
	</div>
</Story>

<Story name="Contrast (WCAG AA)">
	<div class="flex flex-col gap-16">
		<p class="type-ui-body-2-regular text-brand-text-secondary">
			Text needs 4.5:1. UI elements (borders, focus ring) need 3:1.
		</p>
		<table class="type-ui-body-3-regular">
			<thead>
				<tr class="text-left">
					<th class="p-8">Foreground</th>
					<th class="p-8">Background</th>
					<th class="p-8">Needs</th>
					{#each modes as mode (mode)}
						<th class="p-8">{mode}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each contrastPairs as pair (pair.foreground + pair.background)}
					<tr class="border-t border-ui-base-border">
						<td class="p-8">{pair.foreground}</td>
						<td class="p-8">{pair.background}</td>
						<td class="p-8">{pair.required}:1</td>
						{#each modes as mode (mode)}
							{@const ratio = contrastRatio(
								getColorValue(pair.foreground, mode),
								getColorValue(pair.background, mode)
							)}
							{@const passes = ratio >= pair.required}
							<td
								class="p-8 type-ui-body-3-semibold {passes
									? 'text-ui-status-success-foreground'
									: 'text-ui-status-destructive-foreground'}"
							>
								{passes ? '✓' : '✗'}
								{ratio.toFixed(2)}:1
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Story>
