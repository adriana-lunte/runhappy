// Small calculations the report screens need. Kept apart from the components so they can be tested and reused.
import type { Category, Finding } from '#lib/schemas/report.ts';

export interface Score {
	earned: number;
	possible: number;
}

/** Points of the graded checks in a category ("couldn't check" and "not applicable" are left out). */
export function categoryScore(findings: Finding[], category: Category): Score {
	return findings
		.filter((f) => f.category === category && f.possible !== undefined)
		.reduce(
			(total, f) => ({
				earned: total.earned + (f.earned ?? 0),
				possible: total.possible + (f.possible ?? 0)
			}),
			{ earned: 0, possible: 0 }
		);
}

/**
 * How a score reads at a glance: half or less = poor, under 80% = fair, otherwise good.
 * Matches the colors seen on report-card.runhappyapps.com (2/4 shows red, 15/23 yellow). Assumption, to confirm.
 */
export type ScoreTone = 'poor' | 'fair' | 'good';
export function scoreTone({ earned, possible }: Score): ScoreTone {
	const ratio = possible ? earned / possible : 0;
	if (ratio <= 0.5) return 'poor';
	if (ratio < 0.8) return 'fair';
	return 'good';
}

/** Points a fix would add: what the check is missing. */
export const pointsToGain = (f: Finding) => (f.possible ?? 0) - (f.earned ?? 0);

/** Failed checks, biggest gain first. */
export function thingsToFix(findings: Finding[]): Finding[] {
	return findings
		.filter((f) => f.outcome === 'fail')
		.sort((a, b) => pointsToGain(b) - pointsToGain(a));
}

/** "11 to fix · 5 working · 4 couldn't check" for a set of findings. */
export function outcomeCounts(findings: Finding[]) {
	return {
		toFix: findings.filter((f) => f.outcome === 'fail').length,
		working: findings.filter((f) => f.outcome === 'pass').length,
		couldntCheck: findings.filter((f) => f.outcome === 'couldnt_check').length,
		opportunities: findings.filter((f) => f.outcome === 'opportunity').length,
		inPlace: findings.filter((f) => f.outcome === 'info' && f.category === 'ads').length
	};
}
