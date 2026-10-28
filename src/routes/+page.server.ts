import { fail, redirect } from '@sveltejs/kit';
import { siteFormSchema } from '#lib/schemas/report.ts';
import type { Actions } from './$types';

export const actions: Actions = {
	// Validate the website and start the (for now simulated) check.
	default: async ({ request }) => {
		const url = String((await request.formData()).get('url') ?? '');
		const result = siteFormSchema.safeParse({ url });
		if (!result.success) return fail(400, { url, error: result.error.issues[0]?.message });
		redirect(303, `/r/sample/check?site=${encodeURIComponent(result.data.url)}`);
	}
};
