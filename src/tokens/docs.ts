/**
 * Helpers for the Foundations stories. They read the token CSS files directly,
 * so the documentation can never drift from the real values.
 */
import colorsCss from './colors.css?raw';
import textStylesCss from './text-styles.css?raw';

export type Mode = 'light' | 'dark';

export interface ColorToken {
	name: string;
	light: string;
	dark: string;
}

export interface ColorGroup {
	group: string;
	tokens: ColorToken[];
}

function parseBlock(css: string, selector: string): Map<string, string> {
	const start = css.indexOf(selector);
	const block = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
	return new Map([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

/** Color tokens grouped as in Figma (e.g. "brand / neutral"). */
export function getColorGroups(): ColorGroup[] {
	const light = parseBlock(colorsCss, ':root');
	const dark = parseBlock(colorsCss, "[data-theme='dark']");
	const groups: ColorGroup[] = [];
	const rootBlock = colorsCss.slice(
		colorsCss.indexOf(':root'),
		colorsCss.indexOf("[data-theme='dark']")
	);
	for (const section of rootBlock.split('/* ').slice(1)) {
		const group = section.slice(0, section.indexOf(' */'));
		const names = [...section.matchAll(/--([\w-]+):/g)].map((m) => m[1]);
		groups.push({
			group,
			tokens: names.map((name) => ({ name, light: light.get(name)!, dark: dark.get(name)! }))
		});
	}
	return groups;
}

export interface TextStyle {
	className: string;
	figmaName: string;
}

/** Every `type-*` utility with its Figma style name. */
export function getTextStyles(): TextStyle[] {
	return [...textStylesCss.matchAll(/\/\* Figma: (.+?) \*\/\n@utility ([\w-]+)/g)].map((m) => ({
		figmaName: m[1],
		className: m[2]
	}));
}

// ---------- WCAG contrast ----------

function luminance(hex: string): number {
	const channels = hex
		.replace('#', '')
		.match(/.{2}/g)!
		.slice(0, 3)
		.map((c) => parseInt(c, 16) / 255)
		.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
	return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function contrastRatio(foreground: string, background: string): number {
	const [a, b] = [luminance(foreground), luminance(background)].sort((x, y) => y - x);
	return (a + 0.05) / (b + 0.05);
}

export interface ContrastPair {
	foreground: string;
	background: string;
	/** 4.5 for normal text, 3 for UI elements like borders and focus rings (WCAG AA). */
	required: number;
}

const text = (foreground: string, background = 'ui-base-background'): ContrastPair => ({
	foreground,
	background,
	required: 4.5
});
const ui = (foreground: string, background = 'ui-base-background'): ContrastPair => ({
	foreground,
	background,
	required: 3
});

/**
 * Pairs that are expected to be used together (rules decided 2026-10-23, see docs/decisions.md).
 * - 1B: brand yellow / green / pink are backgrounds with dark text, never text colors.
 * - 2A: focus = dark inner ring (ui-base-foreground) + yellow halo (ui-base-ring, decorative).
 * - 3A: input borders need 3:1; ui-base-border is for decorative dividers and is exempt.
 */
export const contrastPairs: ContrastPair[] = [
	// Text on the page background
	text('brand-text-primary'),
	text('brand-text-secondary'),
	text('brand-text-text-link'),
	text('brand-text-text-link', 'brand-background-subtle'),
	text('ui-ui-elements-muted-foreground'),
	text('ui-status-success-foreground'),
	text('ui-status-destructive-foreground'),
	// 1B: brand colors as backgrounds
	text('ui-base-primary-foreground', 'brand-background-yellow-accent'),
	text('ui-base-primary-foreground', 'brand-secondary-green'),
	text('ui-base-primary-foreground', 'brand-secondary-pink'),
	text('brand-text-primary', 'brand-background-yellow-light'),
	text('brand-text-primary', 'brand-background-green-light-secondary'),
	text('brand-text-primary', 'brand-background-pink'),
	// Foreground / background pairs
	text('ui-base-primary-foreground', 'ui-base-primary'),
	text('ui-base-primary-foreground', 'ui-base-primary-hover'),
	text('ui-base-secondary-foreground', 'ui-base-secondary'),
	text('ui-ui-elements-card-foreground', 'ui-ui-elements-card'),
	text('ui-ui-elements-popover-foreground', 'ui-ui-elements-popover'),
	text('ui-ui-elements-muted-foreground', 'ui-ui-elements-muted'),
	text('ui-ui-elements-accent-foreground', 'ui-ui-elements-accent'),
	text('ui-surface-surface-content', 'ui-surface-surface-200'),
	text('ui-status-success-foreground', 'ui-status-success'),
	text('ui-status-destructive-foreground', 'ui-status-destructive'),
	// UI elements (3:1)
	ui('ui-base-foreground'), // 2A: inner focus ring
	ui('ui-base-input'),
	ui('ui-base-input', 'brand-background-subtle'),
	ui('ui-base-input', 'ui-ui-elements-card')
];

export function getColorValue(name: string, mode: Mode): string {
	const token = getColorGroups()
		.flatMap((g) => g.tokens)
		.find((t) => t.name === name);
	if (!token) throw new Error(`Unknown color token: ${name}`);
	return token[mode];
}
