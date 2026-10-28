/*
 * Report Card data — the shape of one graded report.
 * Mirrors the structure of report-card.runhappyapps.com (studied 2026-10-28) so the real analysis can be plugged in
 * later without changing the screens: overall grade, two areas (website and ads), and findings with an outcome,
 * points and evidence.
 */
import { z } from 'zod';

/** What we found for one check. "couldnt_check" and "not_applicable" never count against the venue. */
export const outcomeSchema = z.enum([
	'fail',
	'pass',
	'info',
	'opportunity',
	'couldnt_check',
	'not_applicable'
]);
export type Outcome = z.infer<typeof outcomeSchema>;

/** Groups of checks shown on the report, in this order. */
export const categorySchema = z.enum(['booking', 'search', 'ai', 'basics', 'ads']);
export type Category = z.infer<typeof categorySchema>;

export const evidenceSchema = z.discriminatedUnion('kind', [
	z.object({ kind: z.literal('page'), label: z.string(), url: z.url() }),
	z.object({ kind: z.literal('fact'), label: z.string(), value: z.string() }),
	z.object({
		kind: z.literal('screenshot'),
		label: z.string(),
		src: z.string(),
		viewport: z.enum(['desktop', 'mobile'])
	})
]);
export type Evidence = z.infer<typeof evidenceSchema>;

export const findingSchema = z.object({
	/** Stable id of the check, e.g. "birthday.booking_mode". */
	ruleId: z.string(),
	category: categorySchema,
	outcome: outcomeSchema,
	/** One line, written for the venue owner. */
	headline: z.string(),
	/** What is happening, in plain words. */
	happening: z.string().optional(),
	/** What to do about it. */
	fix: z.string().optional(),
	/** Points earned and possible. Missing for checks that are not graded. */
	earned: z.number().int().nonnegative().optional(),
	possible: z.number().int().positive().optional(),
	/** Shown as the big card at the top of its category. */
	highlight: z.boolean().optional(),
	evidence: z.array(evidenceSchema).default([])
});
export type Finding = z.infer<typeof findingSchema>;

export const reportSchema = z.object({
	venue: z.object({ name: z.string(), url: z.url() }),
	scannedAt: z.iso.datetime(),
	overall: z.object({
		grade: z.string(),
		earned: z.number().int().nonnegative(),
		possible: z.number().int().positive(),
		/** One sentence under the grade. */
		verdict: z.string(),
		/** Why the total is not 100. */
		note: z.string()
	}),
	web: z.object({ summary: z.string() }),
	ads: z.object({ graded: z.boolean(), summary: z.string() }),
	findings: z.array(findingSchema)
});
export type Report = z.infer<typeof reportSchema>;

/**
 * The form on the home page: who is asking and their website (decided 2026-10-28: all four required).
 * For now the name and email are only validated, not stored anywhere.
 */
export const gradeFormSchema = z.object({
	firstName: z.string().trim().min(1, 'Enter your first name'),
	lastName: z.string().trim().min(1, 'Enter your last name'),
	email: z
		.string()
		.trim()
		.min(1, 'Enter your email')
		.pipe(z.email({ error: 'Enter an email like name@yourvenue.com' })),
	/** Accepts "yourvenue.com" or a full address. */
	url: z
		.string()
		.trim()
		.min(1, 'Enter your venue’s website')
		.transform((value) => (/^https?:\/\//i.test(value) ? value : `https://${value}`))
		.pipe(
			z.url({
				protocol: /^https?$/,
				hostname: z.regexes.domain,
				error: 'Enter a website like yourvenue.com'
			})
		)
});
export type GradeForm = z.infer<typeof gradeFormSchema>;
/** What the visitor typed, and one error per field, when the form comes back. */
export type GradeFormValues = Partial<Record<keyof GradeForm, string>>;
