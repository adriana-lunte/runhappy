# Runhappy — frontend & design system

The Runhappy web frontend and its design system, built side by side.
Design source of truth: Figma **UI Library | Runhappy**.

**Stack:** SvelteKit · Svelte 5 · TypeScript · Tailwind CSS v4 · Zod · Storybook

## Getting started

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev          # the app → http://localhost:5173
npm run storybook    # the design system → http://localhost:6006
```

| Command               | What it does                                                     |
| --------------------- | ---------------------------------------------------------------- |
| `npm run dev`         | Starts the app in development mode                               |
| `npm run storybook`   | Opens the component and token documentation                      |
| `npm run build`       | Production build of the app                                      |
| `npm run lint`        | Formatting (Prettier) + code rules (ESLint) + token guard        |
| `npm run lint:tokens` | Fails if a raw hex / px / arbitrary value is used outside tokens |
| `npm run check`       | TypeScript and Svelte type check                                 |
| `npm run test`        | Runs every Storybook story as a test, including accessibility    |
| `npm run format`      | Formats all files                                                |

## How the project is organized

```
src/
├── tokens/        Design tokens → the visual vocabulary (colors, type, radius, spacing, shadows)
├── components/    Reusable design-system components (Button, Input…), each with its story
├── pages/         Screens built only from components
├── routes/        SvelteKit routing: each route imports a page from src/pages
└── lib/schemas/   Zod schemas: validation for forms and API data
docs/decisions.md  Design decisions and open questions
scripts/           Token guard
.storybook/        Storybook configuration (theme switch, accessibility checks)
```

The layers only depend downwards: **pages → components → tokens**.

### Tokens

All visual values live in `src/tokens` and come from Figma:

| File              | Contents                                                      | Source in Figma                      |
| ----------------- | ------------------------------------------------------------- | ------------------------------------ |
| `colors.css`      | Every color, light (`:root`) and dark (`[data-theme='dark']`) | Variables → Colors                   |
| `typography.css`  | Font families, weights, sizes, line heights, letter spacing   | Variables → Typography + text styles |
| `text-styles.css` | One `type-*` class per Figma text style                       | Text styles                          |
| `radius.css`      | `xs`, `sm`, `full`                                            | Variables → Radius                   |
| `spacing.css`     | Spacing scale, named by px (`p-16` = 16px)                    | Variables → Spacing                  |
| `shadows.css`     | One shadow, `shadow-overlay`, for floating elements           | Effect style shadow/overlay          |
| `theme.css`       | Connects colors to Tailwind                                   | —                                    |
| `index.css`       | Entry point that imports everything                           | —                                    |

How to use them in a component:

```svelte
<button
	class="rounded-full bg-ui-base-primary px-16 py-8 type-ui-button text-ui-base-primary-foreground"
>
	Start run
</button>
```

- **Colors:** `bg-` / `text-` / `border-` + the Figma name: `bg-ui-base-primary`, `text-brand-text-secondary`.
  Tailwind's default palette (`red-500`…) is disabled on purpose.
- **Text:** one class per Figma text style: `type-ui-body-1-regular`, `type-ui-headline-3`.
- **Radius:** `rounded-xs`, `rounded-sm`, `rounded-full`.
- **Spacing:** the number is the px value: `p-16` = 16px, `gap-8` = 8px. ⚠ Not Tailwind's default scale.
  Only values from the scale exist (2–16 for components, 20–64 for layout); `npm run lint:tokens` flags others.
- **Dark mode:** follows the operating system by default; the user can override it by hand.
  `src/lib/theme.ts` has `setThemePreference('light' | 'dark' | 'system')` (remembered in the browser) and
  `watchSystemTheme()` (called once in the root layout). The inline script in `src/app.html` applies the mode before
  the first paint. Everything ends up as `data-theme="light" | "dark"` on `<html>`; components need no extra classes.

Naming rule: Figma name, lowercase, `/` and spaces become `-`.
`ui/base/primary-foreground` → `--ui-base-primary-foreground` → `bg-ui-base-primary-foreground`.

#### Changing or adding a token

1. Change it in Figma first.
2. Update the matching file in `src/tokens` (and, for a new color, add it to `theme.css`).
3. Check Storybook → **Foundations / Tokens** (Colors, Typography, Contrast).

### Components

One folder per component:

```
src/components/Button/
├── Button.svelte          the component (typed props)
├── Button.stories.svelte  every variant and state
└── index.ts               export { default as Button } from './Button.svelte';
```

Each component needs typed props, all states (hover, focus, disabled, error),
WCAG AA accessibility and a story. Full checklist in [CLAUDE.md](CLAUDE.md).

### Pages and routes

Screens live in `src/pages` (e.g. `HomePage.svelte`) and only use components.
The files in `src/routes` stay thin: they load data and render the page.

### Imports

```ts
import { Button } from '#components/Button';
import HomePage from '#pages/HomePage.svelte';
import { signUpSchema } from '#lib/schemas/sign-up';
```

## Documentation

- **Storybook** — tokens (Foundations) and every component, in light, dark or following the OS (toolbar → Theme).
- [docs/decisions.md](docs/decisions.md) — what was decided, and what is still open
  (including the WCAG contrast issues found in the current palette).
- [CLAUDE.md](CLAUDE.md) — working rules for this project.
