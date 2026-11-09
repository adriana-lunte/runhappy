/**
 * Self Onboarding domain (Adriana, 2026-11-09): a domain of its own opens the onboarding instead of the Report Card
 * home. Which domains count is set in Vercel, not in the code: environment variable `ONBOARDING_HOSTS`, a
 * comma-separated list of host names, e.g. "onboarding.runhappy.ai,runhappy-onboarding.vercel.app".
 */

/** Where the onboarding lives. */
export const onboardingPath = '/self-onboarding';

/** Turns the `ONBOARDING_HOSTS` value into a list of lower-case host names (empty when it is not set). */
export function parseOnboardingHosts(value: string | undefined): string[] {
	return (value ?? '')
		.split(',')
		.map((host) => host.trim().toLowerCase())
		.filter(Boolean);
}

/**
 * Where to send a request, or null to leave it alone. Only the home page ("/") of an onboarding domain moves:
 * every other path (assets, the onboarding itself, the Report Card pages) still works on that domain.
 */
export function onboardingRedirect(url: URL, hosts: string[]): string | null {
	if (url.pathname !== '/' || !hosts.includes(url.hostname.toLowerCase())) return null;
	return `${onboardingPath}${url.search}`;
}
