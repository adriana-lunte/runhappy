import type { Preview } from '@storybook/sveltekit';
import '../src/tokens/index.css';

const preview: Preview = {
	// Toolbar switch to preview every story in light or dark mode, or following the OS like the app does.
	globalTypes: {
		theme: {
			description: 'Color mode',
			toolbar: {
				title: 'Theme',
				icon: 'mirror',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' },
					{ value: 'system', title: 'System' }
				],
				dynamicTitle: true
			}
		}
	},
	initialGlobals: { theme: 'light' },
	decorators: [
		(story, context) => {
			const theme = context.globals.theme;
			const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.dataset.theme =
				theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
			return story();
		}
	],
	parameters: {
		backgrounds: { disable: true },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		a11y: {
			// WCAG AA is a requirement: accessibility violations fail the story tests.
			test: 'error'
		}
	}
};

export default preview;
