// A sample report for an invented venue, so the screens work before the real analysis exists.
// Same structure and rubric as report-card.runhappyapps.com; the venue and its results are made up.
import { reportSchema, type Report } from '#lib/schemas/report.ts';

const site = 'https://www.example.com';

export const sampleReport: Report = reportSchema.parse({
	venue: { name: 'Sample Fun Center', url: site },
	scannedAt: '2026-10-28T15:00:00.000Z',
	overall: {
		grade: 'C−',
		earned: 25,
		possible: 43,
		verdict: 'Some parents will give up before they book.',
		note: 'Out of 43, not 100: ads aren’t graded until you run them (40 points), and 17 points we couldn’t check don’t count.'
	},
	web: { summary: 'Parties are booked on another company’s site.' },
	ads: {
		graded: false,
		summary: 'No ads running yet, so this isn’t graded. It’s an open opportunity.'
	},
	findings: [
		{
			ruleId: 'birthday.booking_mode',
			category: 'booking',
			outcome: 'fail',
			highlight: true,
			headline: 'Parties are booked on another company’s site',
			happening: 'Parents leave your site to book on a separate booking site.',
			fix: 'Put booking on your own party page, connected to your booking system behind the scenes.',
			earned: 14,
			possible: 21,
			evidence: [
				{ kind: 'page', label: 'Birthday page', url: `${site}/birthday-parties` },
				{ kind: 'fact', label: 'Booking happens', value: 'On another company’s site' }
			]
		},
		{
			ruleId: 'birthday.taps_to_start',
			category: 'booking',
			outcome: 'fail',
			headline: 'Your birthday page is 2 clicks from your homepage',
			happening: 'Parents have to click 2 times from your homepage to reach your birthday page.',
			fix: 'Add a “Book a party” button to your menu and homepage.',
			earned: 1,
			possible: 2,
			evidence: [{ kind: 'fact', label: 'Clicks from your homepage', value: '2' }]
		},
		{
			ruleId: 'birthday.party_details',
			category: 'booking',
			outcome: 'info',
			headline: 'Party details are on a separate booking site',
			evidence: []
		},
		{
			ruleId: 'corporate.booking_mode',
			category: 'booking',
			outcome: 'not_applicable',
			headline: 'No corporate events offered',
			evidence: []
		},
		{
			ruleId: 'search.venue_schema',
			category: 'search',
			outcome: 'fail',
			headline: 'Google can’t read your business details',
			happening: 'Your homepage doesn’t describe your business in the format Google reads.',
			fix: 'Add your business name, address, phone and hours as structured data.',
			earned: 0,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'seo.titles',
			category: 'search',
			outcome: 'fail',
			headline: 'Your page title doesn’t say what you offer',
			happening: 'The title Google shows doesn’t mention birthday parties or your town.',
			fix: 'Start the title with what you offer and where, e.g. “Kids’ birthday parties in Springfield”.',
			earned: 2,
			possible: 3,
			evidence: []
		},
		{
			ruleId: 'seo.description',
			category: 'search',
			outcome: 'fail',
			headline: 'Your search description isn’t set up well',
			earned: 0,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'seo.sharing',
			category: 'search',
			outcome: 'fail',
			headline: 'Link previews aren’t set up',
			earned: 0,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'search.party_page',
			category: 'search',
			outcome: 'pass',
			headline: 'Google can list your party page',
			earned: 1,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'search.local_rank',
			category: 'search',
			outcome: 'couldnt_check',
			headline: 'Local search',
			evidence: []
		},
		{
			ruleId: 'search.reviews',
			category: 'search',
			outcome: 'couldnt_check',
			headline: 'Google reviews',
			evidence: []
		},
		{
			ruleId: 'search.profile',
			category: 'search',
			outcome: 'couldnt_check',
			headline: 'Google Business Profile',
			evidence: []
		},
		{
			ruleId: 'answers.crawlers',
			category: 'ai',
			outcome: 'fail',
			headline: 'Your site blocks PerplexityBot',
			earned: 0,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'answers.faq',
			category: 'ai',
			outcome: 'fail',
			headline: 'No questions answered on your party page',
			earned: 0,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'answers.readable_without_js',
			category: 'ai',
			outcome: 'pass',
			headline: 'AI assistants can read your party page',
			earned: 2,
			possible: 2,
			evidence: []
		},
		{
			ruleId: 'answers.chatgpt',
			category: 'ai',
			outcome: 'couldnt_check',
			headline: 'ChatGPT suggestions',
			evidence: []
		},
		{
			ruleId: 'site.contact',
			category: 'basics',
			outcome: 'fail',
			headline: 'Your phone or address is missing from your homepage',
			happening: 'Parents can’t see how to call or find you without leaving the homepage.',
			fix: 'Put your phone number and address in the header or footer of every page.',
			earned: 0,
			possible: 2,
			evidence: []
		},
		{
			ruleId: 'site.hours',
			category: 'basics',
			outcome: 'fail',
			headline: 'Parents can’t find your opening hours',
			earned: 0,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'site.reviews_shown',
			category: 'basics',
			outcome: 'fail',
			headline: 'Your site doesn’t show any reviews',
			earned: 0,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'site.mobile_friendly',
			category: 'basics',
			outcome: 'pass',
			headline: 'Your site fits a phone screen',
			earned: 3,
			possible: 3,
			evidence: [
				{
					kind: 'fact',
					label: 'Screen width checked',
					value: '390 pixels, the size of a typical phone'
				}
			]
		},
		{
			ruleId: 'site.domain',
			category: 'basics',
			outcome: 'pass',
			headline: 'Your site lives at one address of your own',
			earned: 1,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'site.finish',
			category: 'basics',
			outcome: 'pass',
			headline: 'Your site links to your social pages and has an icon',
			earned: 1,
			possible: 1,
			evidence: []
		},
		{
			ruleId: 'ads.google_active',
			category: 'ads',
			outcome: 'opportunity',
			highlight: true,
			headline: 'Google ads are an open opportunity',
			happening: 'You only reach parents who already find you on Maps or in search.',
			fix: 'Run Google ads on party searches near you, send each click straight to booking, and count each booking as a conversion.',
			evidence: []
		},
		{
			ruleId: 'ads.meta_active',
			category: 'ads',
			outcome: 'opportunity',
			highlight: true,
			headline: 'Facebook and Instagram ads are an open opportunity',
			happening:
				'We found no Meta ads, so parents scrolling Facebook and Instagram near you don’t see your parties.',
			fix: 'Run Facebook and Instagram ads to parents nearby, showing a real party and its price, linked straight to booking.',
			evidence: []
		},
		{
			ruleId: 'tags.meta_pixel',
			category: 'ads',
			outcome: 'info',
			headline: 'Meta tracking tag is on your site',
			evidence: []
		},
		{
			ruleId: 'tags.ga4',
			category: 'ads',
			outcome: 'info',
			headline: 'Google Analytics 4 is on your site',
			evidence: []
		}
	]
});
