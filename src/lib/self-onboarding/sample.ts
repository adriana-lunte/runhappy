/**
 * Self Onboarding — sample data and step texts.
 * Copy from Figma "Platform | Runhappy" → V2 (Adriana, 2026-11-09), which keeps the texts recorded from
 * staging.tildei.com/setup with the website lunte.studio (docs/self-onboarding.md). Nothing is saved: this is the
 * front end only, as decided on 2026-11-09.
 */
import inspectsWebsite from '#lib/assets/self-onboarding/inspects-website.png';
import inspectsWebsiteDark from '#lib/assets/self-onboarding/inspects-website-dark.png';
import hours from '#lib/assets/self-onboarding/hours.png';
import hoursDark from '#lib/assets/self-onboarding/hours-dark.png';
import knowledge from '#lib/assets/self-onboarding/knowledge.png';
import knowledgeDark from '#lib/assets/self-onboarding/knowledge-dark.png';
import packages from '#lib/assets/self-onboarding/packages.png';
import packagesDark from '#lib/assets/self-onboarding/packages-dark.png';
import venue from '#lib/assets/self-onboarding/venue.png';
import venueDark from '#lib/assets/self-onboarding/venue-dark.png';
import voice from '#lib/assets/self-onboarding/voice.png';
import voiceDark from '#lib/assets/self-onboarding/voice-dark.png';
import welcome from '#lib/assets/self-onboarding/welcome.png';
import welcomeDark from '#lib/assets/self-onboarding/welcome-dark.png';

/** Screens in order. "reading" is the loading screen between the website and the venue. */
export const screens = [
	'welcome',
	'website',
	'reading',
	'venue',
	'knowledge',
	'packages',
	'hours',
	'voice'
] as const;
export type Screen = (typeof screens)[number];

export interface ScreenIntro {
	/** Headline. `{site}` is replaced by the website being read. */
	title: string;
	/** Line next to the illustration. */
	description: string;
	/** "R" character illustration (decorative). */
	illustration: string;
	/**
	 * Version with light outlines for dark mode (Adriana chose this on 2026-11-09). Until it exists the light one is
	 * used in both modes. How to add one: docs/self-onboarding.md → "Dark-mode illustrations".
	 */
	illustrationDark?: string;
	/** Number shown as "Step N of 6". None on the welcome screen. */
	step?: number;
}

export const totalSteps = 6;

export const intros: Record<Screen, ScreenIntro> = {
	welcome: {
		title: "Welcome! Let's set up your front desk",
		description:
			"Share your website and we'll fill in what we can. Check your venue, packages and hours, pick a voice, and we'll build a front desk that answers calls and books parties.",
		illustration: welcome,
		illustrationDark: welcomeDark
	},
	website: {
		title: "What's your website?",
		description: "We'll read it and fill in what we can, so you only need to check it.",
		illustration: inspectsWebsite,
		illustrationDark: inspectsWebsiteDark,
		step: 1
	},
	reading: {
		title: 'Reading {site}',
		description: "We're learning about your business, so you don't have to type it all in.",
		illustration: inspectsWebsite,
		illustrationDark: inspectsWebsiteDark,
		step: 1
	},
	venue: {
		title: 'Tell us about your venue',
		description: 'Your front desk uses this to answer questions and book at the right place.',
		illustration: venue,
		illustrationDark: venueDark,
		step: 2
	},
	knowledge: {
		title: 'What else should your front desk know?',
		description:
			'Add the pages and notes that answer what callers ask: FAQs, party rules, deposits and cancellations. Your front desk answers from these and your website.',
		illustration: knowledge,
		illustrationDark: knowledgeDark,
		step: 3
	},
	packages: {
		title: 'What can guests book?',
		description:
			'Add the parties and packages your front desk can book. You can change them any time.',
		illustration: packages,
		illustrationDark: packagesDark,
		step: 4
	},
	hours: {
		title: 'When are you open?',
		description: 'Your front desk only offers times inside these hours.',
		illustration: hours,
		illustrationDark: hoursDark,
		step: 5
	},
	voice: {
		title: 'How should your front desk sound?',
		description: 'Pick a name, a tone and a voice. Calls are answered with these.',
		illustration: voice,
		illustrationDark: voiceDark,
		step: 6
	}
};

/**
 * Welcome title as laid out in Figma V2 (2026-11-10): "Welcome!" in semibold, then two lines in regular, next to
 * the illustration. Same words as `intros.welcome.title`.
 */
export const welcomeTitle = { lead: 'Welcome!', lines: ["Let's set up", 'your front desk'] };

/** The website from the recorded session. */
export const sampleSite = 'lunte.studio';

/** Pages found on the website (loading screen). */
export const pagesFound = [
	'Home',
	'Mxv brand',
	'Mxv rebranding',
	'Gynger buyer app',
	'Gynger vendor platform',
	'Gynger brand and website',
	'Homepage redesign for rinse',
	'Tildei ai marketing platfform',
	'Broadridge customer portal poc'
];

/** Loading screen status lines, in order. */
export const readingStatus = [
	'Finding your pages',
	'Reading your pages',
	'Writing what your front desk should know',
	'All done. Opening your setup'
];

export const venueSample = {
	offer:
		'Lunte Studio is an indie design team that partners with innovative early-stage startups. It provides product, UX/UI, web, app, and branding design through close, ongoing collaboration.',
	locationName: 'Tildei',
	timeZone: 'America/Cordoba'
};

/** A few time zones for the searchable list (sample; the real list comes later). */
export const timeZones = [
	{ value: 'America/Cordoba', label: 'America/Cordoba (UTC-03:00)' },
	{ value: 'America/New_York', label: 'America/New_York (UTC-05:00)' },
	{ value: 'America/Chicago', label: 'America/Chicago (UTC-06:00)' },
	{ value: 'America/Denver', label: 'America/Denver (UTC-07:00)' },
	{ value: 'America/Los_Angeles', label: 'America/Los_Angeles (UTC-08:00)' }
];

export interface KnowledgeDoc {
	id: string;
	title: string;
	/** First line, shown in the row. */
	detail: string;
	/** Full text, shown in the edit dialog (short paragraphs and "• " bullets). */
	body: string[];
	/** Where it came from, shown as a chip. Items the user adds have none. */
	source?: string;
}

export const knowledgeSample: KnowledgeDoc[] = [
	{
		id: 'about',
		title: 'About Lunte Studio',
		detail:
			'What it is — Lunte Studio is an independent design team partnering with innovative early-stage startups…',
		body: [
			'What it is',
			'• Lunte Studio is an independent design team partnering with innovative early-stage startups to help fulfill their product vision through close, continued collaboration.',
			'• The studio is tailored to founding product teams and is experienced with agile teams navigating fast-changing markets.',
			'What makes it different',
			'• A lead or senior product designer works exclusively with a client team, like a full-time in-house hire.',
			'• Clients also receive ongoing support from a multi-talented team of design specialists.',
			'Sources: https://www.lunte.studio/'
		]
	},
	{
		id: 'services',
		title: 'Design services and engagement options',
		detail:
			'Full-time partnership — A full-time Lead or Senior product designer works exclusively…',
		body: []
	},
	{
		id: 'location',
		title: 'Location and contact',
		detail:
			'Location — Lunte Studio LLC is formally established in the US. It is a 100% remote company…',
		body: []
	},
	{
		id: 'faq',
		title: 'Frequently asked questions',
		detail: 'Why choose Lunte Studio over a full-time designer or design agency? Clients get…',
		body: []
	},
	{
		id: 'work',
		title: 'Selected work',
		detail: 'Examples — Product, web and branding work includes projects for MxV, Rinse, Gynger…',
		body: []
	}
];

export interface Package {
	id: string;
	name: string;
	minutes: number;
	guests: number;
	/** Where it came from, shown as a chip. Items the user adds have none. */
	source?: string;
}

export const packagesSample: Package[] = [
	{ id: 'consultation', name: 'Free consultation', minutes: 90, guests: 20 },
	{ id: 'project', name: 'Kickstart a one-off project', minutes: 90, guests: 20 },
	{ id: 'review', name: 'FREE product review', minutes: 90, guests: 20 },
	{ id: 'intro', name: '15-min intro call', minutes: 15, guests: 20 }
];

export const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
] as const;

export const tones = [
	{
		value: 'warm',
		label: 'Warm',
		description: 'Warm, upbeat and efficient. Friendly with families, never pushy.'
	},
	{
		value: 'playful',
		label: 'Playful',
		description: 'Playful and energetic. Matches the excitement of a party, keeps answers short.'
	},
	{
		value: 'polished',
		label: 'Polished',
		description: 'Calm, polished and precise. Courteous, clear and to the point.',
		// Only the recommended tone shows the chip (Adriana, 2026-11-09; Figma V2 updated to match).
		recommended: true
	}
];

export const voices = [
	{
		value: 'lauren',
		name: 'Lauren - Friendly Customer Care Agent',
		meta: 'American · Female · Conversational',
		recommended: true
	},
	{
		value: 'katie',
		name: 'Katie - Authentic and versatile',
		meta: 'American · Female · Conversational'
	},
	{ value: 'adam', name: 'Adam - Dominant, Firm', meta: 'American · Male · Social Media' },
	{
		value: 'alice',
		name: 'Alice - Clear, Engaging Educator',
		meta: 'British · Female · Informative Educational'
	},
	{
		value: 'anne',
		name: 'Anne - Friendly & relaxed Australian',
		meta: 'Australian · Female · Conversational'
	},
	{
		value: 'bella',
		name: 'Bella - Professional, Bright, Warm',
		meta: 'American · Female · Informative Educational'
	}
];

export const voiceSample = {
	assistantName: '',
	greeting: 'Thanks for calling Lunte Studio—how can we help?',
	tone: 'polished',
	voice: 'lauren'
};

/** Everything the user fills in, kept while they move between screens (not saved anywhere). */
export interface OnboardingData {
	site: string;
	venue: {
		offer: string;
		locationName: string;
		street: string;
		city: string;
		state: string;
		zip: string;
		timeZone: string;
	};
	docs: KnowledgeDoc[];
	packages: Package[];
	hours: { day: (typeof days)[number]; open: boolean; from: string; to: string }[];
	staffPhone: string;
	assistantName: string;
	greeting: string;
	tone: string;
	voice: string;
}

/** A fresh copy of the sample data (lists are copied so edits never change the sample). */
export function sampleOnboarding(): OnboardingData {
	return {
		site: '',
		venue: { ...venueSample, street: '', city: '', state: '', zip: '' },
		docs: knowledgeSample.map((doc) => ({
			...doc,
			body: [...doc.body],
			source: 'Drafted from your site'
		})),
		packages: packagesSample.map((item) => ({ ...item, source: 'From your website' })),
		hours: days.map((day) => ({ day, open: true, from: '10:00', to: '18:00' })),
		staffPhone: '',
		...voiceSample
	};
}
