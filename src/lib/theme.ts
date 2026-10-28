/*
 * Color mode — Runhappy (decided 2026-10-28, see docs/decisions.md)
 *
 * By default the app follows the operating system (light or dark). The user can override it by hand;
 * the choice is remembered in this browser. The result is written as data-theme="light" | "dark" on <html>,
 * which is what src/tokens/colors.css reads.
 *
 * The first paint is handled by the inline script in src/app.html (same rules, kept in sync by hand),
 * so the page never flashes the wrong mode.
 */

export type ThemePreference = 'system' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'runhappy-theme';
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

/** What the user chose: "system" (follow the OS, the default), "light" or "dark". */
export function getThemePreference(): ThemePreference {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'light' || saved === 'dark') return saved;
	} catch {
		// Storage can be blocked (private mode); fall back to the OS.
	}
	return 'system';
}

/** The mode shown right now, after resolving "system". */
export function resolveTheme(preference = getThemePreference()): Theme {
	if (preference !== 'system') return preference;
	return darkQuery().matches ? 'dark' : 'light';
}

/** Saves the user's choice and applies it. "system" goes back to following the OS. */
export function setThemePreference(preference: ThemePreference) {
	try {
		if (preference === 'system') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, preference);
	} catch {
		// Not saved, but still applied for this visit.
	}
	applyTheme(preference);
}

function applyTheme(preference = getThemePreference()) {
	document.documentElement.dataset.theme = resolveTheme(preference);
}

/**
 * Keeps following the OS while the preference is "system" (e.g. the OS switches to dark at night).
 * Returns a function that stops listening. Call it once, in the root layout.
 */
export function watchSystemTheme() {
	const query = darkQuery();
	const onChange = () => {
		if (getThemePreference() === 'system') applyTheme('system');
	};
	query.addEventListener('change', onChange);
	return () => query.removeEventListener('change', onChange);
}
