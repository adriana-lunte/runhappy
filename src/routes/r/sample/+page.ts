import { sampleReport } from '#lib/report/sample.ts';
import type { PageLoad } from './$types';

// Sample mode: always the same invented report. The real analysis will load a report by id here.
export const load: PageLoad = () => ({ report: sampleReport });
