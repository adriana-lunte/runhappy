<!--
	StatusIcon — Runhappy design system (Report Card)
	Not in Figma yet: modeled on report-card.runhappyapps.com (2026-10-28).

	The result of one check, as an icon + a word for screen readers ("Needs work", "Working"…).
	Fail = red X, pass = green check, couldn't check = question, not applicable = minus, info = i, opportunity = trend.
	The color is never the only signal: the shape changes too, and the word is read out.
-->
<script lang="ts" module>
	import type { Outcome } from '#lib/schemas/report.ts';

	export interface StatusIconProps {
		/** The result of the check. */
		outcome: Outcome;
		/** Size class, e.g. "size-20" (default). */
		class?: string;
	}

	/** The word screen readers hear, also used by badges. */
	export const outcomeLabels: Record<Outcome, string> = {
		fail: 'Needs work',
		pass: 'Working',
		info: 'Found',
		opportunity: 'Opportunity',
		couldnt_check: 'Couldn’t check',
		not_applicable: 'Not applicable'
	};
</script>

<script lang="ts">
	import {
		CheckCircleIcon,
		InfoIcon,
		MinusCircleIcon,
		QuestionIcon,
		TrendUpIcon,
		XCircleIcon
	} from 'phosphor-svelte';
	import { Icon } from '#components/Icon';

	let { outcome, class: className = 'size-20' }: StatusIconProps = $props();

	const looks = {
		fail: { icon: XCircleIcon, color: 'text-ui-status-destructive-foreground' },
		pass: { icon: CheckCircleIcon, color: 'text-ui-status-success-foreground' },
		info: { icon: InfoIcon, color: 'text-ui-ui-elements-muted-foreground' },
		opportunity: { icon: TrendUpIcon, color: 'text-ui-base-foreground' },
		couldnt_check: { icon: QuestionIcon, color: 'text-ui-ui-elements-muted-foreground' },
		not_applicable: { icon: MinusCircleIcon, color: 'text-ui-ui-elements-muted-foreground' }
	} as const;

	const look = $derived(looks[outcome]);
</script>

<Icon icon={look.icon} label={outcomeLabels[outcome]} class={[look.color, className]} />
