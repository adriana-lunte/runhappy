import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { gradeFormSchema, type GradeFormValues } from '#lib/schemas/report.ts';
import type { Actions } from './$types';

export const actions: Actions = {
	// Validate the form and start the (for now simulated) check. Name and email are not stored yet.
	default: async ({ request }) => {
		const data = await request.formData();
		const values: GradeFormValues = {};
		for (const key of gradeFormSchema.keyof().options) values[key] = String(data.get(key) ?? '');

		const result = gradeFormSchema.safeParse(values);
		if (!result.success) {
			const { fieldErrors } = z.flattenError(result.error);
			const errors: GradeFormValues = {};
			for (const key of gradeFormSchema.keyof().options) errors[key] = fieldErrors[key]?.[0];
			return fail(400, { values, errors });
		}
		redirect(303, `/r/sample/check?site=${encodeURIComponent(result.data.url)}`);
	}
};
