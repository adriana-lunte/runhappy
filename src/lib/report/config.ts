// Links and copy shared by the Report Card pages.

/** "Book a call" destination (same as report-card.runhappyapps.com, with its tracking parameters). Not linked from the
 * pages since 2026-11-02 (Adriana: the demo is booked from the email); kept for when a link comes back. */
export const bookCallUrl =
	'https://www.runhappy.ai/contact?utm_source=report-card&utm_medium=referral&utm_campaign=report-card';

/**
 * Link preview when the site is shared (Open Graph), the same on every page (Adriana, 2026-11-02): the home title and
 * text. The image is static/og-image.png, exported from the Figma Marketing file, page "Score Card", frame
 * "Report Card · Open Graph image (1200×630)" (57:91).
 */
export const share = {
	title: 'How easy is it to book a party with you? · Runhappy Report Card',
	description:
		'Enter your website and get a graded report card in about two minutes, with a clear fix for every problem we find.',
	imageAlt: 'Runhappy Report Card: How easy is it to book a party with you?'
};

/**
 * Texts on the bottom left of the footer (Adriana, 2026-10-30, from the brand guidelines footer). The year is the
 * current one, read each time a page is shown, so it changes on its own on January 1.
 */
export const footerDetails = () => [
	`${new Date().getFullYear()}, Runhappy.ai`,
	'New York City, New York'
];

/**
 * Steps of the checking screen. Only step 2 was seen on the original (2026-10-28); the others are written to
 * match what the tool checks. Copy to confirm.
 */
export const checkSteps = [
	{ area: 'Getting started', title: 'Opening your website', text: 'Loading your homepage.' },
	{
		area: 'Your website',
		title: 'Visiting your site like a parent would',
		text: 'Looking for your party page and how parents book it, on desktop and phone.'
	},
	{
		area: 'Your website',
		title: 'Trying to book a party',
		text: 'Checking whether a parent can pick a date, see a price and book.'
	},
	{
		area: 'Search',
		title: 'Checking how Google sees you',
		text: 'Reading your page titles, descriptions and business details.'
	},
	{
		area: 'AI assistants',
		title: 'Checking what AI assistants can read',
		text: 'Seeing whether ChatGPT and others can read your party page.'
	},
	{
		area: 'Ads and tracking',
		title: 'Looking up your ads',
		text: 'Searching the Meta Ad Library and Google’s Ads Transparency Center.'
	},
	{ area: 'Report', title: 'Grading what we found', text: 'Putting your report card together.' }
];
