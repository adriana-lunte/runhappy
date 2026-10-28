# Runhappy frontend — working rules

Frontend for Runhappy, built together with its design system. The design system lives in
Figma ("UI Library | Runhappy", file key `Ax9De11Plc2yPyfQHrGuJn`) and is mirrored in code.
The code will be continued by developers: keep it clean, consistent and easy to read.

## People

- **Adriana** (UX designer, not a developer) owns the design decisions.
  Talk to Adriana in Spanish, in plain language: explain what you did and why, without jargon.
- Code, comments and documentation are written in English.

## Stack

SvelteKit · Svelte 5 (runes) · TypeScript (strict) · Tailwind CSS v4 · Zod · Storybook 10.

## Structure

```
src/
  tokens/       Design tokens (CSS variables) + Tailwind theme. The ONLY place raw values live.
  components/   Reusable design-system components. One folder per component.
  pages/        Screens. They compose components; they do not define new UI patterns.
  routes/       SvelteKit routing only. A route file imports a page and passes data to it.
  lib/schemas/  Zod schemas for forms and API data.
docs/decisions.md   Design decisions and open questions, with dates.
scripts/            Project scripts (token guard).
```

Icons: Phosphor (`phosphor-svelte`), the same set as the Figma "Icons" page, always through `<Icon />`
(`src/components/Icon`). Decorative by default; `duotone` shows the yellow layer only where the icon communicates;
`regular` is only for carets inside controls (chevrons).

Imports use the aliases `#tokens/*`, `#components/*`, `#pages/*`, `#lib/*`.

## Hard rules

1. **Tokens only.** Never write a hex, rgb, px or Tailwind arbitrary value (`p-[13px]`)
   outside `src/tokens`. Use the Tailwind classes generated from tokens:
   - Color: `bg-ui-base-primary`, `text-brand-text-secondary`, `border-ui-base-input`
   - Text: one `type-*` class per Figma text style, e.g. `type-ui-body-1-regular`
   - Radius: `rounded-xs`, `rounded-sm`, `rounded-full`
   - Spacing: the number is the value in px — `p-16` = 16px, `gap-8` = 8px (**not** Tailwind's default,
     where p-4 = 16px). Scale: 2, 4, 6, 8, 10, 12, 14, 16 (components), 20, 24, 32, 40, 48, 64 (layout).
   - Shadow: Runhappy is flat. Only `shadow-overlay`, for floating elements (tooltip, menus, modals).
     `npm run lint:tokens` enforces this. If a value you need does not exist as a token,
     **stop and ask Adriana** — never invent a token or hardcode a value.
2. **Repeated pattern → propose a component.** If a UI pattern appears a second time, do not
   copy it: tell Adriana and propose turning it into a component. Wait for the answer.
3. **Ask before design decisions.** Layout, copy, colors, states, behavior, new tokens,
   naming visible to users: ask, do not assume. Technical decisions (file structure,
   libraries) can be proposed with a recommendation.
4. **Do not add what was not asked.** No extra text, states, elements or screens.
   If the layout seems to need something, list it as "to confirm".
5. **Figma is the source of truth.** Token names follow Figma names
   (rule: lowercase, `/` and spaces become `-`). Do not rename tokens in code only.
6. **Color usage rules (WCAG AA, decided 2026-10-23 — see docs/decisions.md):**
   - Brand yellow, green and pink are **backgrounds**, never text. Text on them uses
     `text-ui-base-primary-foreground` (strong colors) or `text-brand-text-primary` (light tints).
     `brand-text-accent`, `brand-text-green` and `brand-text-pink` are decorative only.
   - Focus: add the `focus-ring` class (defined in `src/tokens/focus.css`): dark 2px ring
     plus a yellow halo outside it, keyboard focus only. Never remove the dark ring.
     On dark filled elements (the selected tab pill) use `focus-ring-offset`: same ring with a 2px gap.
   - Form field borders use `border-ui-base-input`. `border-ui-base-border` is for decorative dividers only.

## Form fields

Every form field is built from the shared parts in `src/components/Field`: `FieldLabel` (label + Info tooltip),
`FieldBox` (box, border, focus ring, error, hover) and `FieldMessage` (help text or error). TextField and SearchField
already use them. A change to labels, boxes or messages is made there, once.

## Every new component must have

- [ ] Its own folder: `src/components/Name/` with `Name.svelte`, `Name.stories.svelte`, `index.ts`
- [ ] Typed props (`interface Props` with a short comment on each prop) and sensible defaults
- [ ] States: default, hover, focus-visible, active, disabled and error (when it applies)
- [ ] Accessibility (WCAG 2.2 AA):
  - native elements first (`<button>`, `<a>`, `<input>`, `<label>`)
  - visible focus ring: the `focus-ring` class
  - text contrast ≥ 4.5:1, UI elements ≥ 3:1 (check the "Contrast" story in Foundations)
  - labels and `aria-*` where native semantics are not enough; errors linked with `aria-describedby`
  - keyboard operable; target size ≥ 24×24 CSS px
- [ ] A Storybook story showing every variant and every state. The a11y test must pass.
- [ ] Linked to its Figma component (URL in the component's header comment and in the story description)

## Commands

```
npm run dev          # app at http://localhost:5173
npm run storybook    # design system at http://localhost:6006
npm run lint         # prettier + eslint + token guard
npm run check        # TypeScript / Svelte type check
npm run test         # Storybook stories as tests (interactions + accessibility)
```

Run `npm run lint`, `npm run check` and `npm run test` before saying a task is done.
