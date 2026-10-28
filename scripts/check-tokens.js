/**
 * Token guard — fails if a design value does not come from tokens.
 *
 * Rule 1 — no raw values outside src/tokens:
 *   ✗ #fed54e, rgb(…), hsl(…), 16px, bg-[#fff], p-[13px], text-[14px]
 *   ✓ bg-ui-base-primary, p-16, type-ui-body-1-regular, rounded-sm
 *
 * Rule 2 — spacing classes must use a value from the scale in src/tokens/spacing.css
 * (checked everywhere in src, including the Foundations stories):
 *   ✗ p-5, gap-7, size-18   (Tailwind would silently generate nothing)
 *   ✓ p-16, gap-8, size-20
 *
 * Usage: npm run lint:tokens
 * To allow a line on purpose, add the comment `tokens-ignore` on that line and explain why.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const SCAN_DIR = join(ROOT, 'src');
const TOKENS_DIR = join(SCAN_DIR, 'tokens');
const EXTENSIONS = ['.svelte', '.ts', '.js', '.css'];

const RAW_VALUE_RULES = [
	{ name: 'hex color', pattern: /#[0-9a-fA-F]{3,8}\b/ },
	{ name: 'rgb/hsl color', pattern: /\b(?:rgba?|hsla?|oklch)\(/ },
	{ name: 'px value', pattern: /\b\d+(?:\.\d+)?px\b/ },
	{ name: 'Tailwind arbitrary value', pattern: /\b[a-z-]+-\[[^\]]+\]/ }
];

// Spacing scale, read from the token file so this list never goes out of date.
const SPACING_SCALE = new Set(
	[...readFileSync(join(TOKENS_DIR, 'spacing.css'), 'utf8').matchAll(/--spacing-(\d+):/g)].map(
		(m) => m[1]
	)
);
const SPACING_CLASS =
	/(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|w|h|size|min-w|min-h|max-w|max-h|top|right|bottom|left|inset)-(\d+(?:\.\d+)?)(?![\w./])/g;

function listFiles(dir) {
	return readdirSync(dir).flatMap((entry) => {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) return listFiles(path);
		return EXTENSIONS.some((ext) => path.endsWith(ext)) ? [path] : [];
	});
}

const problems = [];
for (const file of listFiles(SCAN_DIR)) {
	const inTokens = file.startsWith(TOKENS_DIR);
	const isMarkup = file.endsWith('.svelte');
	readFileSync(file, 'utf8')
		.split('\n')
		.forEach((line, index) => {
			if (line.includes('tokens-ignore')) return;
			const where = `${relative(ROOT, file)}:${index + 1}`;
			if (!inTokens) {
				for (const rule of RAW_VALUE_RULES) {
					const match = line.match(rule.pattern);
					if (match) problems.push(`${where}  ${rule.name}: "${match[0]}"`);
				}
			}
			if (isMarkup) {
				for (const match of line.matchAll(SPACING_CLASS)) {
					if (!SPACING_SCALE.has(match[1])) {
						problems.push(`${where}  spacing not in scale: "${match[0].trim()}"`);
					}
				}
			}
		});
}

if (problems.length > 0) {
	console.error(`\n✗ Design values outside the tokens:\n\n  ${problems.join('\n  ')}\n`);
	process.exit(1);
}
console.log('✓ All design values come from tokens');
