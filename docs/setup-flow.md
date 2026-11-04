# Setup flow — reference (staging)

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

- Section **"Setup flow · copia de staging"**: 9 screens (welcome, website, loading, venue, knowledge,
  edit dialog, packages, hours, voice) at 1280 wide, dark mode, plus a "Notas · a confirmar" card.
  Built from UI Library | Runhappy instances (buttons, text_field, dropdown, search_field, Tab, Radio,
  icon-button, icons, wordmark, symbol), library variables (color, spacing, radius) and text styles.
  Token scan: no raw fills or strokes, no unstyled text, no unbound padding, gap or radius.
- The 10 new pieces (readiness-badge, found-banner, chip, switch, source-row, day-row, tone-card, voice-card,
  progress-bar, setup-header) were moved to UI Library | Runhappy on 2026-11-04; the local drafts are archived.

Library findings (fix belongs in the library masters, not done):

- Logo `wordmark` / `symbol` use a raw hex fill, so they disappear in dark mode (overridden here with ui/base/foreground).
- "Regular" caret icons have no fill in the master (painted here with the button label color).
- `text_field` with Support Text=Yes is 78 tall and the help text sits outside it (instances resized here).
