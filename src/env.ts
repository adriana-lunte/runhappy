import { defineEnvVars } from '@sveltejs/kit/env';
import { parseOnboardingHosts } from '#lib/onboarding-host.ts';

// Environment variables the app reads. Set them in Vercel → Project → Settings → Environment Variables.
export const variables = defineEnvVars({
	ONBOARDING_HOSTS: {
		description:
			'Domains that open Self Onboarding at "/", comma-separated (e.g. "onboarding.runhappy.ai"). Optional.',
		// Optional: when it is not set the list is empty and every domain opens the Report Card home.
		schema: (value) => parseOnboardingHosts(value)
	}
});
