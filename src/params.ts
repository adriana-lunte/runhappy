// Route parameter matchers (SvelteKit: one file, `defineParams`).
import { defineParams } from '@sveltejs/kit/params';
import { reportSections } from '#lib/report/categories.ts';
import type { Category } from '#lib/schemas/report.ts';

export const params = defineParams({
	/** The report's section pages: /r/sample/booking, /search, /ai, /basics, /ads. Anything else is a 404. */
	section: (param) => reportSections.find((section): section is Category => section === param)
});
