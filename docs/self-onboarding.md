# Self Onboarding — reference (staging)

Called "setup flow" until 2026-11-09, when Adriana renamed it **Self Onboarding**. Staging still serves it at `/setup`.

Recorded from https://staging.tildei.com/setup on 2026-11-04, signed in as Adriana, with the website
`lunte.studio` and a test address (123 Main St, Austin, TX 78701). Stopped before the last "Continue"
(step 6), which builds the front desk. Dark mode only was seen.

## Shared layout (every step)

- Header: Runhappy logo on the left, "Step N of 6" on the right (not on the welcome screen).
- Illustration: a yellow diamond with dots around it that grows into a starburst as the steps advance.
- Badge "FRONT DESK READINESS: LOW / MID / HIGH" (monospace, uppercase). LOW on steps 1–2, MID on 3–4, HIGH on 5–6.
- Serif headline + one line of body text.
- Content inside a dark card.
- Footer: "‹ Back" (text button, from step 2) and "Continue ›" (yellow pill, disabled until the step is valid).
- Banner with a smiley icon when data came from the website: "Found on your website. Check it looks right."

## Screens

0. **Welcome** — "Welcome. Let's set up your front desk" · body · "Get started ›".
1. **Website** — "What's your website?" · field "Website" (placeholder `fun-zone.com`) · text link
   "We don't have a website" · Continue (disabled while empty).
   1b. **Reading the website** (full-screen loading) — app icon "R", "Reading lunte.studio", body, card with a
   status line and a progress bar. Status goes "Finding your pages" (skeleton chips) → "Reading your pages"
   (one chip per page found; a check appears as each is read) → "Writing what your front desk should know" →
   "All done. Opening your setup" (green check). Footer: "This takes about a minute. You can leave this page; we keep going."
2. **Venue** — "Tell us about your venue" · banner · textarea "What do you offer?" with counter (184 / 2000) ·
   Location name · Street address · City / State / ZIP code in one row · Time zone (searchable select).
   Continue stays disabled until the address fields are filled; no error message is shown.
3. **Knowledge** — "What else should your front desk know?" · list of documents (file icon, title, tag
   "Drafted from your site", one-line preview, trash button) · clicking a row opens a modal editor
   (Title + rich text "What it should know", Cancel / Save) · add panel with two tabs:
   **Page** (Page address + "Add page") and **Notes** (Title + "What it should know" + "Add notes").
4. **Packages** — "What can guests book?" · banner "We'll add these when you continue; remove any you don't
   offer." · list of packages (name, tag "From your website", "90 minutes, up to 20 guests", trash) ·
   add form: Package name, Length in minutes, Most guests, Price, "Add package".
5. **Hours** — "When are you open?" · one row per day: switch + day + from time + "to" + to time; off shows
   "Closed" · Staff phone (help: "Where callers go when they need a person.", optional).
6. **Voice** — "How should your front desk sound?" · banner "Suggested from your website…" · Name it introduces
   itself with · Greeting textarea with counter and help text · Tone: three radio cards (Warm / Playful /
   Polished, each with a description) · Voice: chosen voice on top, "Search voices", grid of voice cards
   (play button, name, "Recommended" tag, accent · gender · style, check when chosen).

Seen in passing (staging issues, not to copy): on step 5 the "to" column does not line up between rows.

## Mapping to the design system

| Piece                                         | Status                                              |
| --------------------------------------------- | --------------------------------------------------- |
| Button (Continue, Get started, Add …)         | exists                                              |
| TextLink ("We don't have a website", Back)    | exists — Back with caret to confirm                 |
| TextField (single line, with counter)         | exists                                              |
| Textarea with counter                         | to confirm — TextField is single line               |
| Time zone select                              | Dropdown (searchable) exists                        |
| Tabs (Page / Notes)                           | exists — check it fits this pill style              |
| Radio cards (Tone)                            | to confirm — RadioGroup exists, card style does not |
| Tag ("Drafted from your site", "Recommended") | Tag exists — needs a type for these                 |
| Banner "Found on your website"                | to confirm — Callout exists but looks different     |
| Step header ("Step N of 6")                   | to confirm — SiteHeader exists                      |
| Readiness badge, step illustration            | new                                                 |
| Document / package row with remove            | new                                                 |
| Modal editor                                  | new (no dialog component yet)                       |
| Switch (day on/off), time input               | new                                                 |
| Voice card with play button                   | new                                                 |
| Loading screen (chips + progress)             | new                                                 |

## Decisions

- 2026-11-04 (Adriana): copy the flow to **both** Figma and code, **Figma first**; code follows once the
  Figma screens are approved. Staging is a **starting point to improve**, not a 1:1 copy: improvements are
  listed as proposals for Adriana to approve, never applied silently.

## Figma (2026-11-04)

File: https://www.figma.com/design/jxizwQMDvY8jc0sD9UpG21/Untitled?node-id=1-558 — page "V1".

- Section **"Setup flow · copia de staging"** (V1 page): 9 screens (welcome, website, loading, venue, knowledge,
  edit dialog, packages, hours, voice) at 1280 wide, dark mode, plus a "Notas · a confirmar" card.
  Built from UI Library | Runhappy instances (buttons, text_field, dropdown, search_field, Tab, Radio,
  icon-button, icons, wordmark, symbol), library variables (color, spacing, radius) and text styles.
  Token scan: no raw fills or strokes, no unstyled text, no unbound padding, gap or radius.
- The 10 new pieces (readiness-badge, found-banner, chip, switch, source-row, day-row, tone-card, voice-card,
  progress-bar, setup-header — now `self-onboarding-header`) were moved to UI Library | Runhappy on 2026-11-04; the local drafts are archived.

Library findings: all fixed in the library and published on 2026-11-04 (logo color, field help text, carets in
buttons, primary and secondary text on yellow). See "Library fixes found while copying the setup flow" in
`docs/decisions.md`.

## V2 (2026-11-09)

Section "v2" (node 78:4394, page "V2"), updated by Adriana: style changes over V1. Light mode; the readiness badge and
the placeholder Sparkle are gone; each step has an illustration of the Runhappy "R" character next to the description
(image layers such as "Runhappy R Inspects a Website"); same 9 screens, texts and library components.

## Code (2026-11-09)

Route `/self-onboarding` → `src/pages/SelfOnboardingPage.svelte` (screens in `src/pages/self-onboarding/`, sample data and
texts in `src/lib/self-onboarding/sample.ts`, illustrations in `src/lib/assets/self-onboarding/`). Front end only:
sample data, the reading screen is simulated, nothing is saved. Storybook: Pages → Self Onboarding.

Decided by Adriana on 2026-11-09: create all the new components; top space 64 (Figma 120 is off the scale);
extend SiteHeader instead of a new header; size tokens added; Card gets a `muted` tone.

New components: Chip, Switch, ProgressBar, Textarea, TimeField, SourceRow, DayRow, ToneCard, VoiceCard, Dialog.
Changed: SiteHeader (`variant="flow"`, `step`, optional `product`), Card (`tone="muted"`).

Decided 2026-11-09 (Adriana): only the recommended tone (Polished) shows the "Recommended" chip; Warm and Playful
do not. Updated in Figma V2 the same day (Recommended property off on Warm and Playful).

To confirm:

- The last Continue (step 6) goes nowhere yet; "We don't have a website" skips to the venue.
- Search with no matching voice shows "No results" (same text as Dropdown); not in the design.
- Not designed in Figma yet: Textarea, TimeField, Dialog (and its rich-text editor, a Textarea for now), the spinner
  on the reading screen, the dark layer behind the dialog.
- Missing states in Figma: Switch, SourceRow, ToneCard, VoiceCard (hover, focus; "playing" for voices). Code uses the
  same patterns as the other components.
- StepIntro and StepFooter are page parts of this flow, not design-system components.

## Own domain (2026-11-09)

Adriana asked for a domain that opens the onboarding directly. Any host listed in the Vercel environment variable
`ONBOARDING_HOSTS` redirects `/` to `/self-onboarding` (307, query string kept); other paths are untouched. The domain
name is not chosen yet, so it is not in the code. Steps in README → "Self Onboarding domain".

## Dark-mode illustrations (2026-11-09)

In dark mode the black outlines of the "R" illustrations almost disappear on the dark background. Adriana chose
option C: a dark-mode version of each illustration, with light outlines. The code is ready (`StepIntro` shows
`illustrationDark` in dark mode, the normal one in light mode); until the files exist, the normal ones are used in
both modes.

Received so far: `welcome-dark.png` (Adriana, 2026-11-11; replaced the same day by a version without the outline
around the R) and `inspects-website-dark.png` (Website and Reading, 2026-11-11) and `venue-dark.png` (Venue, 2026-11-11; replaced the same day by a newer version) and `knowledge-dark.png` (Knowledge, 2026-11-11, sent as WebP) and `hours-dark.png` (Hours, 2026-11-11; sent at 1448×1086, cropped to the same frame) and `voice-dark.png` (Voice, 2026-11-11, sent at 1448×1086; replaced the same day by a version with light headphones), cropped like the light ones and in
use.

### What to ask the illustrator

Seven PNG files, one per current illustration in `src/lib/assets/self-onboarding/`:

| Current file           | Screens          | New file                    |
| ---------------------- | ---------------- | --------------------------- |
| `welcome.png`          | Welcome          | `welcome-dark.png`          |
| `inspects-website.png` | Website, Reading | `inspects-website-dark.png` |
| `venue.png`            | Venue            | `venue-dark.png`            |
| `knowledge.png`        | Knowledge        | `knowledge-dark.png`        |
| `packages.png`         | Packages         | `packages-dark.png`         |
| `hours.png`            | Hours            | `hours-dark.png`            |
| `voice.png`            | Voice            | `voice-dark.png`            |

- Same drawing, framing and canvas size as the original (Figma sources: 1448 × 1086, packages 1536 × 1024), so the
  same crop can be applied. The files in the project are cropped like Figma V2 and saved at 2x (see
  `docs/decisions.md`, 2026-11-10); the dark ones need the same crop.
- Transparent background.
- Only the black outlines and black details change, to a light color; the yellow of the character stays.
- Light color: to confirm with Adriana. Suggestion: #f5f3ec, the value of `brand/neutral/off black` in dark mode
  (the color text and the logo take in dark mode).

### How to plug them in (developers)

1. Crop like the light version (same Figma crop, 2x) and save in `src/lib/assets/self-onboarding/`.
2. In `src/lib/self-onboarding/sample.ts`, import each file and add `illustrationDark: <import>` to its screen in
   `intros` (the website and reading screens share `inspects-website-dark.png`).
3. Check both modes in Storybook (Pages → Self Onboarding, theme toolbar) or the app.
