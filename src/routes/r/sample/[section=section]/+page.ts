import { sampleReport } from '#lib/report/sample.ts';
import type { PageLoad } from './$types';

// Sample mode: always the same invented report (see ../+page.ts). The section comes checked by src/params/section.ts.
export const load: PageLoad = ({ params }) => ({ report: sampleReport, section: params.section });
