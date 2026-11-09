import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { ONBOARDING_HOSTS } from '$app/env/private';
import { onboardingRedirect } from '#lib/onboarding-host.ts';

// Runs on every request. A Self Onboarding domain (env var ONBOARDING_HOSTS, see src/env.ts) opens the onboarding
// at "/".
export const handle: Handle = async ({ event, resolve }) => {
	const target = onboardingRedirect(event.url, ONBOARDING_HOSTS ?? []);
	// 307: temporary, so browsers don't remember it if the domain is later used for something else.
	if (target) redirect(307, target);
	return resolve(event);
};
