// The Report Card intro (screensaver) shows once per visit: until the browser tab is closed.
// src/app.html reads the same key before the first paint, so a returning visitor never sees it flash.

const STORAGE_KEY = 'runhappy-intro-seen';

/** True when the intro was already closed in this tab, or the visitor asked for reduced motion. */
export function shouldSkipIntro(): boolean {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
	try {
		return sessionStorage.getItem(STORAGE_KEY) !== null;
	} catch {
		return false;
	}
}

/** Remembers, for this visit, that the intro was closed. */
export function markIntroSeen() {
	document.documentElement.dataset.introSeen = '';
	try {
		sessionStorage.setItem(STORAGE_KEY, '1');
	} catch {
		// Storage blocked (private mode): the intro may show again on the next visit to the home page.
	}
}
