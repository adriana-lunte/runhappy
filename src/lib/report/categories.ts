// Copy and order of the report categories (from report-card.runhappyapps.com, 2026-10-28).
import type { Category } from '#lib/schemas/report.ts';

export interface CategoryInfo {
	/** Short name in the summary, e.g. "Party booking". */
	name: string;
	/** Title of the category block. */
	title: string;
	/** The explainer question, e.g. "What do we check?". */
	question: string;
	answer: string;
}

export const categories: Record<Category, CategoryInfo> = {
	booking: {
		name: 'Party booking',
		title: 'Make it easy for parents to book a party',
		question: 'What do we check?',
		answer:
			'We take the path a parent takes, from your homepage to booking a birthday party, and see how far they get on their own.'
	},
	search: {
		name: 'Search results',
		title: 'Show up when parents search nearby',
		question: 'What’s SEO?',
		answer:
			'It means improving your website and Google listing so Google shows you higher when parents near you search for a party venue.'
	},
	ai: {
		name: 'AI assistants',
		title: 'Get recommended by ChatGPT and other AI assistants',
		question: 'Why does this matter?',
		answer:
			'More parents ask AI assistants where to have a party. They recommend the venues whose websites they can read and that answer questions directly.'
	},
	basics: {
		name: 'Website basics',
		title: 'Give parents what they look for on your site',
		question: 'What do we check?',
		answer:
			'The details parents look for before they book, like your phone number, hours and reviews, on a site that works on their phone.'
	},
	ads: {
		name: 'Ads and tracking',
		title: 'Turn ads into booked parties',
		question: 'What’s tracking?',
		answer:
			'Small tags on your website tell Google and Meta which ads led to a booking, so your ads are judged on parties booked, not clicks.'
	}
};

/** Website categories, in report order. Ads and tracking are a separate area. */
export const webCategories: Category[] = ['booking', 'search', 'ai', 'basics'];
