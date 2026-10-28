# Design decisions and open questions

Source: Figma "UI Library | Runhappy" (read on 2026-10-23 via the Desktop Bridge plugin)
and `tokens-runhappy.css` (export shared by Adriana on 2026-10-23).

## Decided

| Date       | Decision                                                                                                                                           | Who                           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| 2026-10-23 | Stack: Svelte + TypeScript + Zod (Adriana); SvelteKit, Tailwind v4 and Storybook as proposed in the plan                                           | Adriana                       |
| 2026-10-23 | Code and documentation in English                                                                                                                  | Adriana                       |
| 2026-10-23 | Light and dark mode from the start (Figma "Colors" has both modes). Dark = `data-theme="dark"` on `<html>`                                         | Claude (Figma has both modes) |
| 2026-10-23 | Figma has two `UI/Subtitle/1-3` styles: the **SemiBold** one is used                                                                               | Adriana                       |
| 2026-10-23 | Figma has two `Web Text Styles/Title/Regular` styles: the **24px** one is used                                                                     | Adriana                       |
| 2026-10-23 | Spacing scale named by px (`spacing/16` ↔ `p-16`): 2–16 for components, 20–64 for layout                                                           | Adriana                       |
| 2026-10-23 | Shadows: Runhappy is flat — one `shadow/overlay` (0/4, blur 16; off-black 12% light / black 48% dark) for floating elements                        | Adriana                       |
| 2026-10-23 | Token names follow Figma names (lowercase, `/` and spaces → `-`)                                                                                   | Claude                        |
| 2026-10-23 | Font sizes and line heights in rem, so text respects the user's browser size (WCAG 1.4.4)                                                          | Claude                        |
| 2026-10-23 | Contrast 1B: brand yellow / green / pink are **backgrounds** with off-black text, not text colors                                                  | Adriana                       |
| 2026-10-23 | Contrast 2A: focus = 2px dark ring + yellow halo (`ui/base/ring`) outside it                                                                       | Adriana                       |
| 2026-10-23 | Contrast 3A: `ui/base/input` gets darker (≥ 3:1); `ui/base/border` unchanged (decorative dividers are exempt)                                      | Adriana                       |
| 2026-10-23 | Darken `ui/status/success-foreground`, `ui/status/destructive-foreground`, `ui/ui elements/muted-foreground` and `brand/text/text link` to ≥ 4.5:1 | Adriana                       |
| 2026-10-23 | Focus inner ring uses `ui/base/foreground` (no new token)                                                                                          | Adriana                       |

### Color changes applied in Figma (2026-10-23, by Claude at Adriana's request)

Changed directly in the Figma variables of "UI Library | Runhappy", then synced to `src/tokens/colors.css`.
Previous values are kept here so any change can be reverted.

| Variable                           | Mode  | Before    | After     | Result (WCAG AA)                         |
| ---------------------------------- | ----- | --------- | --------- | ---------------------------------------- |
| `ui/status/success-foreground`     | light | `#25c17b` | `#187b4e` | 5.27:1 on white, 4.62:1 on `success`     |
| `ui/status/destructive-foreground` | light | `#ef4444` | `#dd1313` | 5.03:1 on white, 4.53:1 on `destructive` |
| `ui/ui elements/muted-foreground`  | light | `#6d6d6d` | `#666666` | 5.74:1 on white, 4.53:1 on `muted`       |
| `brand/text/text link`             | light | `#c94300` | `#b43c00` | 5.85:1 on white, 5.36:1 on `subtle`      |
| `ui/base/input`                    | light | `#e5e5db` | `#878785` | 3.60:1 on white, 3.29:1 on `subtle`      |
| `ui/base/input`                    | dark  | `#33322c` | `#707068` | 3.49:1 on background                     |

Dark-mode values of the other variables already passed and were not changed.
After these changes every pair in Storybook → Foundations → Contrast passes in light and dark.
Library published in Figma by Adriana on 2026-10-23.

### Button (2026-10-23)

- One `Button` component with `variant: primary | secondary | tertiary` instead of three components (Figma has three sets).
- Colors (approved by Adriana):
  - primary → `ui/base/primary`, hover `ui/base/primary-hover`, text `ui/base/primary-foreground`
  - secondary → `brand/accent/yellow background` (no UI equivalent), hover `ui/base/primary`, text `brand/text/primary`
    (`primary-foreground` on hover)
  - tertiary → transparent, border `brand/accent/yellow dark`, hover `brand/accent/yellow background`,
    text `brand/text/primary` (**off-black, not yellow as in Figma** — rule 1B)
  - disabled → `brand/neutral/warm gray light` / `warm gray` (tertiary: `warm gray mid`), as in Figma
- Pressed state (not in Figma, approved): shrinks to 98% while held, 150ms (provisional, Tailwind default);
  no animation with "reduce motion".
- Focus state (not in Figma, required): `focus-ring` utility (decision 2A).
- Radius: Figma uses raw 60px / 30px; both render as a pill, code uses `radius/full`.
- Icons: Lucide (`@lucide/svelte`), 20px. Lucide "Plus" may differ slightly from the Figma "Plus".

**Applied in Figma (2026-10-23, by Claude at Adriana's request):**

- `button-pimary` renamed to `button-primary`.
- Radius of all button variants bound to `radius/full` (was raw 60px / 30px).
- Yellow square behind the "Plus" icons removed (fill cleared on the icon's background vector, 14 instances).
- Hidden remote icon "Icon" (Name=Add) removed from `button-secondary / status=idle`; archived first in the
  `_Archive` section of the Components page, with date.
- `button-tertiary` idle and hover: text and icons bound to `brand/text/primary` (was `brand/accent/yellow dark`).
- New variants `status=focus` and `status=pressed` in the three sets:
  - focus = idle + two drop shadows bound to `ui/base/foreground` (spread 2) and `ui/base/ring` (spread 4),
    with clip content on. Tertiary focus has a 1% `ui/base/background` fill on purpose (Figma draws no shadow on an empty frame).
  - pressed = hover colors; the 98% shrink is described on the variant (Figma cannot show it).

- Master "Plus" icon (icon set): background vector fill (`brand/accent/yellow`) removed; the layer itself is kept.
  None of its 30 instances showed the yellow anymore, so only new uses are affected.
- Library published by Adriana on 2026-10-23 (button fixes + Plus icon).

### TextField (2026-10-23)

- One `TextField` component. Figma states "Typing" and "Complete" are not props: they are the field with focus / with a value.
  Hover has no visual change (same as Figma).
- Approved by Adriana: focus uses the shared ring (2A) instead of Figma's 2px yellow border; radius `radius/xs` (8px)
  instead of Figma's raw 10px; a Zod validation example story.
- Border uses `ui/base/input` (rule 3A), darker than Figma's `warm gray mid`.
- Width: fills its container (Figma: fixed 360px).
- `info` prop: Figma "Info" icon next to the label (yellow circle, dark "i": `ui/base/primary` fill +
  `ui/base/primary-foreground`), as a 24×24 button that opens a Tooltip.

**Applied in Figma (2026-10-23, by Claude at Adriana's request):**

- Renamed `text_filed` → `text_field`.
- Replaced the colors from another client's library ("Tildei Variables 2025") with Runhappy variables (184 bindings):
  `UI colors/base/foreground` → `ui/base/foreground`, `UI colors/UI/muted-foreground` → `ui/ui elements/muted-foreground`,
  `UI colors/status/destructive-foreground` → `ui/status/destructive-foreground`,
  `UI colors/status/destructive-border` → `ui/status/destructive-border`.
- Input box: radius bound to `radius/xs`; border 1px inside `ui/base/input` (error keeps `ui/status/destructive-border`);
  Focus and Typing use the shared focus ring (two drop shadows bound to `ui/base/foreground` and `ui/base/ring`).

### Shared field parts and SearchField (2026-10-27)

- The label row, the box and the help/error message were repeated (TextField, search_field, dropdown): extracted into
  `FieldLabel`, `FieldBox`, `FieldMessage` (`src/components/Field`), approved by Adriana. TextField rebuilt on them
  with no visible change (its 9 tests pass).
- `SearchField` (Figma `search_field`), decided by Adriana:
  - the search icon becomes a **clear button** whenever there is text (not only on hover, so it works with keyboard and
    touch); Escape also clears; Enter calls `onsearch`;
  - focus, error and disabled are **unified with TextField** (Figma: no focus indicator, no red border, white disabled);
  - "Complete Hover" yellow background (`brand/accent/yellow background`) kept, only when there is text.
- Read from screenshots only: the Figma Desktop Bridge plugin was disconnected, so exact Figma tokens for search_field
  were not re-checked.

**Applied in Figma (2026-10-27, by Claude at Adriana's request)** — `search_field` now matches the code, 32 variants:

- box radius bound to `radius/xs` (was raw 10); border 1px inside `ui/base/input` (was `warm gray mid`, 2px on focus);
- Focus and Typing: shared focus ring (drop shadows bound to `ui/base/foreground` + `ui/base/ring`, clip content);
- Error: border `ui/status/destructive-border`;
- Complete Disable: background `brand/neutral/warm Gray Light` (was white), like text_field;
- Complete and Error (have text): search icon replaced by the clear icon, colored `ui/base/foreground`;
- label Info icon: always the Runhappy yellow `Info` (13 external outline icons swapped).

Still external: the search / close / error-info icons (`Icons Outlined`), pending the Runhappy icon set. Library published by Adriana on 2026-10-27.

### Icons: Phosphor duotone (2026-10-27)

- Found: the Figma "Icons" page is **Phosphor** (1,512 icons, duotone only): line drawing bound to
  `brand/neutral/off black` + filled layer bound to `brand/accent/yellow` at 100%. That yellow layer is part of the
  Runhappy look (Info, active sidebar item, menu icons).
- Decided by Adriana: code switches from Lucide to **Phosphor** (`phosphor-svelte`, same 1,512 icons). Lucide removed.
- Rule (Adriana): yellow layer **only where the icon communicates** (Info, active items, menu/content icons); no yellow
  on action icons inside controls (search, clear, chevrons, button icons, checks). Error messages use `WarningCircle`.
- Code: `<Icon icon={…} duotone? />` (`src/components/Icon`). It always draws Phosphor's **duotone** shape, like Figma,
  and shows (`icon-duotone`) or hides (`icon-plain`) the yellow layer — Phosphor's regular shapes differ for some icons
  (e.g. CaretDown: chevron in regular, triangle in duotone).
- Figma: every external icon inside Runhappy components replaced by the local Phosphor icon (172 instances in
  sidebar-item, event row, text_field, dropdown-item, dropdown, _Checkbox base, search_field), keeping size and color,
  overrides reset, yellow layer per the rule. 0 external icons left inside components.
- Assumption: the hidden chevrons in sidebar-item had a raw `#525252` (not in the palette); bound to
  `ui/ui elements/muted-foreground` (#666666).
- **Carets (Adriana):** chevrons "∨", not the duotone triangles. Added to the Figma set: `CaretDown Regular`,
  `CaretUp Regular`, `CaretLeft Regular`, `CaretRight Regular` (Phosphor Regular paths, 32px, drawing bound to
  `brand/neutral/off black`). Used in dropdown, sidebar-item and event row (14 instances, size/rotation/color kept).
  Code: `<Icon icon={CaretDownIcon} regular />`.
- **Side effect, fixed:** resetting the overrides of the icons also reset icons that were already customised. Restored
  by comparing with screenshots taken before: event row Phone/CalendarCheck (plain, `brand/neutral/warm gray`),
  sidebar-item Image in idle/hover (plain). Hidden field icons (text_field CalendarDots, dropdown Envelope) set plain +
  `ui/ui elements/muted-foreground`, like code.
- **Assumption to confirm:** `text style button` › TextH had no "before" screenshot; set per the rule — yellow only in
  the active state.
- Final check: the yellow layer now shows only on the active sidebar item, the active TextH, the label Info icons and
  the menu House icons.
- Library published by Adriana on 2026-10-27 (Phosphor icons + Regular carets).

### Dropdown (2026-10-27)

- `Dropdown` + `DropdownOption`, built from the shared field parts. Decided by Adriana:
  - **searchable** (WAI-ARIA editable combobox with list autocomplete): typing filters by label (case-insensitive,
    "contains"); ↓/↑ move, Enter chooses, Escape closes and restores the chosen label;
  - the chosen option shows a **Check** at the right (no yellow);
  - help text and error like TextField (not in Figma);
  - the open list uses **shadow/overlay** (rule: floating elements).
- Applied by the existing rules: shared focus ring, radius `xs`, border `ui/base/input`, disabled like TextField,
  chevron "∨" (`CaretDown Regular`) that turns when open, option icons duotone (menu icons communicate) with the
  drawing in `ui/base/foreground` (so it stays visible in dark mode).
- Sizes measured: field 53px, option 45px (as Figma).
- **Decided (Adriana, 2026-10-28):**
  - empty-search message "No results" (`emptyText` default);
  - list max height `--size-dropdown-panel` = 20rem (about 6 options, then it scrolls);
  - placeholder default "Search", as in Figma (stories and the Zod example no longer pass "Select…");
  - disabled options: icon and text in `ui/ui elements/muted-foreground` (5.3:1 light, 4.6:1 dark) instead of
    `warm gray mid` (1.2:1 in both modes), like Checkbox and Tab. Changed in the shared OptionList, so the Menu
    follows. Figma `dropdown-item` Disabled (1 and 2 lines) updated the same day: icon, title and description
    bound to `ui/ui elements/muted-foreground` (was `warm gray mid`); no instance uses them. Not published yet.
  - 2-line Hover and Disabled descriptions changed from "Home" to "Description", like the other variants (asked by
    Adriana, 2026-10-28).
  - options radius `radius/xs` (8): already aligned in Figma on 2026-10-27.

**Applied in Figma (2026-10-27, by Claude at Adriana's request):**

- `dropdown-item`: radius bound to `radius/xs` (was raw 4); every text with its text style (the Hover texts had none)
  and color (title `ui/base/foreground`, description `brand/text/secondary`, disabled `warm gray mid`); disabled icons
  without yellow; Hover described as "also the keyboard-active option"; new **Status=Selected** (1 and 2 lines) with
  the Check at the right.
- `dropdown`: box radius `radius/xs` (was raw 10) and border `ui/base/input`; **open** shows the focus ring; the list
  has radius `xs`, border `warm gray mid` and the effect style **shadow/overlay**; disabled text muted; new
  **status=focus** and **status=error** (red border + message) variants; help text on every variant behind a new
  boolean property **"Support Text"** (off by default).
- Note: the text_field "Supporting text" frame is absolutely positioned inside its variants (copied with auto
  positioning here). Not changed in text_field.
- Painting tip learned: when a variable is bound to a fill, also pass the variable's real color as fallback — with a
  black fallback the plugin export rendered black text.
- Library published by Adriana on 2026-10-27 (dropdown + dropdown-item).

### Checkbox and RadioGroup (2026-10-27)

- Decided by Adriana: **Checkbox** and **RadioGroup** are separate components (Figma mixes them in one set); the
  chosen radio has a **dark dot** (`ui/base/primary-foreground`, 11.5:1 — Figma had a light dot, 1.3:1); new token
  **`radius/2xs` = 2px** for the checkbox box (Figma variable created + `rounded-2xs` in code); **Medium and Small**
  sizes (Small label gets `UI/Body/3 Regular`, it had no text style).
- Shared internal piece `Choice` (box + label). The box is the native input (`appearance: none`): keyboard, focus and
  screen readers are native. RadioGroup is a `<fieldset>` + `<legend>`; arrow keys move between radios.
- Applied by the existing rules: unchecked border `ui/base/input` (rule 3A — Figma `warm gray mid` gave 1.27:1),
  checked fill `ui/base/primary`, shared focus ring, disabled label muted; help text and error (Zod example
  "accept the terms").
- New code tokens `--border-control` (1.5px) / `--border-control-hover` (3px) from Figma's stroke weights
  (`src/tokens/borders.css`); not Figma variables yet.
- Found while testing: a radio group with nothing chosen matches CSS `:indeterminate`, which painted every radio
  yellow — indeterminate styles now apply to checkboxes only. Disabled checks/dots use `muted-foreground` so they stay
  visible in dark mode.
- Radio error: shown by the message only (`aria-invalid` is not allowed on radios); no red border on each radio.

**Applied in Figma (2026-10-27, by Claude at Adriana's request — plan approved):**

- Repaired: the duplicate `_Checkbox base` variant (Check, Active=Yes, Focus — the copy with a round radius) was
  **archived** in `_Archive` with date; the set works again.
- Split into four sets (variants moved, not recreated, so instances stay linked):
  `_Checkbox base` (13) + `Checkbox` (26) and `_Radio base` (8) + `Radio` (16).
- Properties renamed to match code: `Size` (Medium/Small) × `Checked` (No/Yes/Indeterminate — radio No/Yes) ×
  `State` (Idle/Hover/Focus/Disabled; Checkbox also Error when unchecked). Missing combinations completed.
  Old names were "Type= Radio" (with a space), "Active", "Null", "Disable"; Medium "Active" pointed to the hover box.
- Look aligned with code: border `ui/base/input` 1.5 (3 on hover), checked `ui/base/primary`, dark check / dash / dot
  (`ui/base/primary-foreground`), shared focus ring (unchecked focus has a 1% fill so the ring renders), disabled
  light gray with muted marks and label, radius bound to `radius/2xs` / `radius/full`, Small label `UI/Body/3 Regular`.
- The public Checkbox set was not used anywhere in this file; Adriana confirmed other files don't depend on it.

### Tabs (2026-10-27)

Figma: Components → Tab (`87:1942`), variants `status=idle | hover | selected`. Not used anywhere in the file.

- **Use (Adriana):** tabs that switch panels (WAI-ARIA tabs), not a filter. ←/→ move and select
  (selection follows focus, approved), Home/End go to the ends, disabled tabs are skipped.
- **Selected (Adriana, "dark pill"):** in Figma hover and selected were identical (`brand/neutral/warm gray mid`),
  only 1.25:1 against the page (state indicators need 3:1). `ui/base/secondary` was proposed first but is
  1.3:1 in dark mode, so the approved look is the **inverted pill**: background `ui/base/foreground`,
  text `ui/base/background` (16:1 light, 15.7:1 dark).
- **Hover:** `brand/neutral/warm gray mid`, as in Figma. **Idle text:** `ui/base/foreground`
  (Figma: `brand/neutral/off black`, same value in light mode).
- **States added (Adriana):** keyboard focus (`focus-ring`), disabled (`ui/ui elements/muted-foreground` text, no hover).
- **Optional icon** (Phosphor, 20px, plain like the Button) and **optional count** (plain number after the
  label, same style and color — approved).
- Layout from Figma: padding 10/16, gap 8, `type-ui-button`, `rounded-full` (Figma has a raw 30, not bound).

**To confirm:**

- **Decided (Adriana, 2026-10-28):** space between tabs = 8, and between the tab row and its panel = 16.
- **Decided (Adriana, 2026-10-28):** tabs that don't fit the width scroll sideways (`overflow-x-auto`, tabs don't
  shrink or wrap). The row has 8 padding / -8 margin so the focus ring is not cut; arrows, Home/End bring the
  focused tab into view. Story "Many tabs (scroll)" tests it.
- **Decided (Adriana, 2026-10-28):** focus on the selected tab has a 2px gap (page color) between the pill and the
  dark ring, then the yellow halo. New utility `focus-ring-offset` in `src/tokens/focus.css`, used by the tabs
  (the scroll row padding grew from 4 to 8 to fit it). Figma Tab `status=focus` updated the same day: three
  drop shadows bound to `ui/base/background` (spread 2), `ui/base/foreground` (4) and `ui/base/ring` (6). Library published by Adriana on 2026-10-28.

**Applied in Figma (2026-10-27, by Claude at Adriana's request — plan approved):**

- `status=selected`: background `ui/base/foreground`, text `ui/base/background` (was `warm gray mid` + off black,
  identical to hover). `idle` / `hover` text bound to `ui/base/foreground` (was `brand/neutral/off black`).
- Radius of every variant bound to `radius/full` (was raw 30).
- New variants: `status=focus` (= selected + the button focus shadows `ui/base/foreground` spread 2 and
  `ui/base/ring` spread 4, clip content on) and `status=disable` (= idle, text and icon `ui/ui elements/muted-foreground`).
  Property name `disable` matches the button sets.
- New properties: `Show icon` (boolean, off), `Icon` (instance swap, default `House`, 20px, yellow layer cleared,
  outline bound to the text color), `Show count` (boolean, off), `Count` (text, default "3", `UI/Button`).
  Swapping the icon keeps the colors (checked with `PlugsConnected`).
- Variants in a row: idle, hover, selected, focus, disable; set description added. No raw fills left in the set.
- Not done (to confirm): a `Label` text property; a full tab row in Figma (tab spacing undecided).
- Library published by Adriana on 2026-10-27.
- 2026-10-27 (asked by Adriana): text property `Label` added (default "Connected"), linked in the 5 variants; published by Adriana on 2026-10-27.

### Tag (2026-10-27)

Figma: Components → tag (`88:1966`), variants `type=consultation | soon | later | overdue`. Used 3× in event row
(consultation, "Call today").

- **Static label (Adriana):** not clickable, so no hover, focus or disabled.
- **Text size (Adriana):** `UI/Overline/1` (11px). Figma uses 9px (same values as `UI/Overline/2`, but not linked
  to the style). Same line height (15), so the tag keeps its height and only gets wider.
- **Hidden word for screen readers (Adriana):** the color carries meaning, so screen readers hear the type first:
  "Consultation: …", "Soon: …", "Later: …", "Overdue: …" (`sr-only`).
- Colors as in Figma: `brand/accent/yellow`, `brand/secondary/pink`, `brand/secondary/green`,
  `ui/status/destructive-foreground`. Dark text uses `ui/base/primary-foreground` (color rule 1): Figma's
  `brand/neutral/off black` turns light in dark mode (1.4–2.2:1). Overdue keeps `brand/neutral/white` text
  (5.0:1 light, 6.3:1 dark).
- Layout from Figma: padding 2/8, `rounded-full` (Figma: raw 12).

**Applied in Figma (2026-10-27, by Claude at Adriana's request — plan approved):**

- Text of the 4 variants linked to `UI/Overline/1` (was unlinked variables at size 9); same line height, so the tag
  keeps its 19px height and gets wider.
- Radius bound to `radius/full` (was raw 12).
- Dark text (consultation, soon, later) bound to `ui/base/primary-foreground` (was `brand/neutral/off black`);
  overdue keeps `brand/neutral/white`.
- New text property `Label` (default "in 3 days", asked by Adriana). The 3 event row instances kept "Call today"
  as their Label value; they already hug their content, so nothing was cut.
- Variants re-spaced (they got wider); order consultation, soon, later, overdue. No raw fills left in the set.
- Library published by Adriana on 2026-10-27.

### SidebarItem and SidebarGroup (2026-10-27)

Figma: Components → sidebar-item (`70:1407`), variants `status=idle | hover | seleccted` (typo in Figma).
Not used anywhere in the file.

- **SidebarItem is a link (Adriana):** the current page is selected and gets `aria-current="page"`.
- **Selected look as in Figma (Adriana):** `brand/accent/yellow background` + `UI/Body/4 Semibold` + the icon's yellow
  layer (duotone). Hover uses the same background; semibold is the cue that does not depend on color.
- **The hidden caret = expandable group (Adriana):** `SidebarGroup` is a button that only opens and closes
  (`aria-expanded`), not a link; caret = Phosphor Regular `CaretDown`, turns 180° when open.
- **Sub-items (Adriana, not in Figma yet):** the same SidebarItem, no icon, text aligned with the group's text
  (left padding 48 = 16 + icon 20 + gap 12).
- **Group with the current page starts open (Adriana).**
- Shared row look in `sidebarRowClasses()` (SidebarItem.svelte), used by both. Layout from Figma: padding 12/16,
  gap 12, icon 20, `rounded-sm` (Figma: raw 12 = `radius/sm`), full width (Figma: fixed 234).
- Links: the page passes `href` already resolved (SvelteKit `resolve()`); the lint rule is disabled on the link
  with that note.

**To confirm:**

- **Decided (Adriana, 2026-10-28):** space between items = 2 (as in the Figma example screens; first set to 4 the same day), and between the group row and its sub-items = 2.
- Disabled: not built (links have no native disabled). Only if there is a real case.

**Applied in Figma (2026-10-27, by Claude at Adriana's request — plan approved):**

- Variants renamed to two properties: `type` (item | sub-item | group closed | group open) × `status`
  (idle | hover | selected | focus); "seleccted" fixed. 14 variants (groups have no selected).
- Radius of every variant bound to `radius/sm` (was raw 12).
- Focus = idle + the button focus shadows (`ui/base/foreground` spread 2, `ui/base/ring` spread 4), clip content on,
  1% `ui/base/background` fill on purpose (noted on each focus variant).
- Sub-item = item with the icon hidden and left padding bound to `spacing/48`.
- Group = item with the caret shown: closed `CaretDown Regular`, open `CaretUp Regular`.
- Grid: one row per type, one column per status; set description added. No raw fills left in the set.
- The set grew 180px taller, so Tab, tag, event row and tooltip were moved down 180px (nothing else changed);
  no overlaps on the Components page.
- Not done (to confirm): `Label` text property; an assembled open group with its sub-items (item spacing undecided).
- Library published by Adriana on 2026-10-27.
- 2026-10-27 (asked by Adriana): text property `Label` added (default "Media"), linked in the 14 variants; published by Adriana on 2026-10-27.

### ConversationItem (2026-10-27)

Figma: Components → convestations-item (`171:354`, typo in Figma), variants `type=unread | read | all` ×
`status=idle | hover | active` (5 exist; "all" only has active). Not used anywhere in the file.

- **A link that opens the conversation (Adriana):** the open one is active and gets `aria-current="page"`.
- **Active:** `brand/accent/yellow` background; text `ui/base/primary-foreground` (color rule 1 — Figma's
  `ui/base/foreground` turns light in dark mode, 1.4:1). Hover: `brand/accent/yellow background`, as in Figma.
- **Unread (Adriana):** the dot (10px, `ui/base/foreground`) plus "Unread" for screen readers (`sr-only`).
- **Active is never unread (Adriana):** opening a conversation reads it, so the dot is hidden while active.
- **Long text (Adriana):** name and detail are cut with "…" on one line.
- Text: name `UI/Body/1 Medium`, detail `UI/Caption` (Figma values match, but the styles are not linked).
  Layout from Figma: padding 16 (12 right), gap 6 / 2, `rounded-sm` (Figma: raw 12), full width.
- Code name `ConversationItem`; the Figma set is now `conversation-item` (was "convestations-item").

**To confirm:**

- **Decided (Adriana, 2026-10-28):** space between conversations in a list = 4, like the sidebar.
- Close to SidebarItem (same hover and shape) but the selected look differs, so they stay separate components.
  **Applied in Figma (2026-10-27, by Claude at Adriana's request — plan approved):**

- Set renamed `convestations-item` → `conversation-item`.
- Variants: `type` (unread | read) × `status` (idle | hover | active | focus), 7 variants; "type=all, status=active"
  became `type=read, status=active` (active is never unread).
- Same structure in every variant (`content` frame with text + status), so switching variants keeps edited text.
- Name linked to `UI/Body/1 Medium`, detail to `UI/Caption`; both fill the width and are cut with "…" on one line.
- Active text bound to `ui/base/primary-foreground`. Radius bound to `radius/sm` (was raw 12).
- The leftover raw `#000` dots in read / active are hidden and bound to `ui/base/foreground` (not deleted).
- Focus = idle + the button focus shadows, 1% `ui/base/background` fill on purpose (noted on each focus variant).
- Text properties `Name` and `Detail` (asked by Adriana; defaults keep the current sample text).
- Grid: one row per type, one column per status; set description added. No raw fills or unstyled text left;
  long-text test instance checked and removed; no overlaps.
- Library published by Adriana on 2026-10-27.

### Sidebar column, theme switch and new building blocks (2026-10-28)

Decided by Adriana: dark/light switch = **option B** (a button in the sidebar footer); IconButton transparent with
warm-gray-mid hover; the button shows the current mode icon; copy in English; the full sidebar column with its
footer; parts: section titles, logo, user item and collapse; ThemeSwitch next to the user item; **items 2 apart**
(as in the Figma example screens; replaces the 4 decided earlier), sections 24 apart. Plan approved.

Reference: example screens on the Colors page → Sidebar (`15:1590`): 258 wide, `brand/background/default`,
`ui/base/border` divider, old unlinked fonts and icons (used for structure only).

- **New tokens (approved):** `--size-sidebar` 258 and `--size-sidebar-collapsed` 76 (`src/tokens/spacing.css`).
- **Logo** (`src/components/Logo`): wordmark and symbol from the Logo page (`60:5209`, `60:5210`), drawn in the
  text color. Not in the approved list, but needed for "logo on top".
- **OptionList** (internal): the Dropdown panel and option rows moved to one shared place, now used by Dropdown
  and Menu (repeated-pattern rule). Dropdown looks the same; its tests pass.
- **IconButton:** 40×40, round, transparent; hover / menu open `brand/neutral/warm gray mid`; pressed 98%; focus
  ring; disabled muted. `label` required: it is the name (via the tooltip, `aria-labelledby`) and the tooltip text.
- **Tooltip:** new `labels` mode (the text is the trigger's name, not read twice), `placement="right"` (positioned
  against the window so scrolling areas don't cut it; follows the trigger while shown) and `suppressed`.
- **Menu:** WAI-ARIA menu button. Actions (`menuitem`) or choices (`menuitemradio` + check). Keyboard: Enter / Space
  / ↓ open, ↑ ↓ Home End, Enter chooses, Escape returns to the button, Tab / click outside close. Opens up or down.
- **ThemeSwitch:** Menu with System (Monitor), Light (Sun), Dark (Moon); name and tooltip "Theme".
- **Sidebar:** logo + collapse button (Phosphor Regular CaretDouble, "Collapse sidebar" / "Expand sidebar"),
  scrolling navigation, footer. **SidebarSection:** title `UI/Overline/1` uppercase `brand/text/secondary`.
  **UserItem:** avatar 32 (photo or User icon on `ui/surface/surface-100`), name `UI/Body/3 Regular`, ⋮ Menu
  "Account menu" with the actions the page passes.
- **Collapsed (76):** symbol logo, icons only with names in right tooltips, section titles hidden (still read),
  footer stacked (avatar opens the account menu). A group click opens the column and the group. Remembered in
  the browser (`runhappy-sidebar-collapsed`).
- Found while testing: the tooltip's own click handler replaced the group's click in the collapsed column
  (fixed: both run); a right tooltip kept an old position after collapsing (fixed: it follows the trigger).

**To confirm:**

- **Confirmed (Adriana, 2026-10-28):** section title `UI/Overline/1`, user name `UI/Body/3 Regular`.
- **Confirmed (Adriana, 2026-10-28):** collapsed, a group holding the current page shows the selected look.
- **Confirmed (Adriana, 2026-10-28):** copy "Collapse sidebar", "Expand sidebar", "Account menu", "Theme",
  "System / Light / Dark"; "Profile" and "Log out" are examples for the ⋮ menu.
- Logo height 20 in the header (Figma: about 21) and the symbol at the same height when collapsed.

**Created in Figma (2026-10-28, by Claude at Adriana's request), Components page:**

- Icon set: `CaretDoubleLeft Regular` and `CaretDoubleRight Regular` (Phosphor Regular, fill `brand/neutral/off black`,
  like the other Regular carets).
- `icon-button` (`205:2598`): `status` idle | hover | pressed | focus | open | disable, `Icon` instance swap (default
  Sun). 40×40, `radius/full`, warm gray mid for hover / pressed / open, focus shadows with the 1% fill (noted),
  icon without the yellow layer in `ui/base/foreground` (muted when disabled).
- `menu` (`205:2604`): panel copied from the dropdown list (same fill, border, `shadow/overlay`, padding, gap) with 3
  `dropdown-item` rows; default content = the theme choices (System selected).
- `theme-switch` (`205:2794`): `Mode` system | light | dark × `Open` no | yes (menu above the button).
- `sidebar-item`: new `type=icon only` row (idle / hover / selected / focus) for the collapsed column; the set grew
  60px, so the components below it were moved down 60px.
- `sidebar-section` (`206:2830`): title `UI/Overline/1` uppercase `brand/text/secondary` (padding 4/16), 3
  sidebar-item instances 2 apart; text property `Title`.
- `user-item` (`206:2871`): `type` expanded | collapsed; avatar 32 (`ui/surface/surface-100`, `ui/base/border`),
  name `UI/Body/3 Regular` cut with "…" (text property `Name`), ⋮ icon-button.
- `sidebar` (`206:3092`): `State` open (258) | collapsed (76), 900 tall, `brand/background/default`, right and header
  dividers `ui/base/border`; header, nav (sections 24 apart), footer (user-item + theme-switch). The header uses
  padding 10/6 so the 40 button fits the same height as in code (where the button has negative margins).
- Found while building: instance-swapping an icon can bring back the duotone yellow layer (the Sun's layers are in a
  different order); cleared by hand in theme-switch and sidebar. When swapping icons in these components, check it.
  The menu copy kept "absolute" positioning from the dropdown and was set back to auto layout.
- Token scan: no raw fills or strokes, no unstyled text, no remote instances in the new sets (only the default
  dashed border of the old `sidebar-item` set). The wordmark / symbol masters on the Logo page have raw `#202020`
  fills; the sidebar instances override them with `ui/base/foreground`.
- Library published by Adriana on 2026-10-28.

### Report Card app (2026-10-28)

Asked by Adriana: replicate report-card.runhappyapps.com, in a tidy GitHub repository, published on Vercel. Plan
approved: sample data first; the map on the checking screen left out; code in this same project
(design system + app); repository `adriana-lunte/runhappy`.

- Studied the original with a test report (site chosen by Adriana: mommypoppins.com/new-jersey): home, checking
  screen (map, 7 steps, desktop and phone screenshots), report (grade ring, categories, things to fix, findings with
  "What to do" and "What we saw", ads and tracking, Book a call). Its data structure was used for the Zod schema.
- **Sample report:** an invented venue ("Sample Fun Center", example.com), same rubric and totals as the test
  (C−, 25 of 43). The real venue's results are not stored in the repo.
- **New components** (Report Card group in Storybook, not in Figma yet): StatusIcon, ScoreRing, ScoreRow,
  FixList, FindingCard / FindingRow, Callout, FeatureCard, SiteHeader, ProgressSteps, BrowserFrame.
  Button now exports `buttonClasses()` so links can look like buttons; its hover uses `not-disabled:` so it
  also works on links.
- **New tokens:** `--size-score-ring` 128, `--size-score-ring-small` 36, `--size-page` 1152 (from the original).
- Mapped to library styles: page `ui/surface/surface-200`, cards `surface-100`, sunken panels `surface-150`,
  rings yellow dark / red / green, grade `UI/Headline/6`, titles `UI/Subtitle/1–3`.
- Found by the accessibility tests: `brand/text/secondary` on `surface-150` is 4.47:1 (needs 4.5). On those panels
  secondary text uses `ui/ui elements/muted-foreground` (4.97:1 light).
- Repository: git initialised, 3 commits, remote `origin` = github.com/adriana-lunte/runhappy. The push needs
  Adriana's GitHub sign-in (not saved on this computer). Vercel import is done by Adriana.

- **Home page, later the same day (Adriana):** the "Grade my site" button ends in a chevron (CaretRight, Regular
  drawing; Button got an `iconRegular` prop). The three cards became a section "What we check, step by step":
  numbered cards (`step` prop on FeatureCard, inside an `<ol>`). First a yellow circle with the number; then
  changed by Adriana: no circle, a "Step 1" heading; then a yellow Tag "Step 1" above the icon (Tag
  got `announceType` to skip its hidden type word), title back to `UI/Subtitle/3`. Titles rewritten as steps: "Try to book a party", "Check your tracking", "Look up your ads". Card texts unchanged. Hero text rewritten so it does not repeat the steps: "Enter your website and get a graded report card in about two minutes, with a clear fix for every problem we find."

- Hero illustration (provided by Adriana, `src/lib/assets/report-card.webp`): above the overline, centered,
  decorative (empty alt), 128 wide reusing `--size-score-ring`.

**To confirm:**

- Hero illustration: if its size should stay independent of the grade ring, it needs its own size token.
- Home steps section: section title `UI/Subtitle/2`, centered.
- **Dark mode on sunken panels:** `surface-150` dark is #3a3a32, lighter than the cards (#121214); secondary
  text on it is about 4.1:1 in dark mode (fails). Options: a different panel color, or fix the dark value in Figma.
- Score ring thresholds: half or less = red, under 80% = yellow, otherwise green (guessed from the original).
- Copy of the checking steps other than step 2 (only step 2 was seen on the original).
- "Book a call" uses the tertiary button look (the original is white with a gray border).
- Figma: none of these screens or components exist in the library yet.

### Tooltip (2026-10-23)

Design approved by Adriana: dark bubble `brand/background/inverse` + `brand/text/inverse` (inverts in dark mode),
`UI/Body/4 Regular`, padding 8/12, `radius/xs`, max width ~240px, `shadow-md` (provisional), no arrow, above the trigger.
Behaviour (WCAG 1.4.13): opens on hover, keyboard focus and tap; stays open while the pointer is on it; Escape closes it.
Added while building: if the bubble does not fit, it aligns to the trigger's edge, or opens below when there is no room above.

Created in Figma on 2026-10-23 (Components page, component `tooltip`, text property `text`). The `shadow-md` exists
only in code: Figma has no effect styles yet.

### Typography variables and Tildei cleanup (2026-10-23, by Claude at Adriana's request)

- New local collection **"Typography"** in Figma (37 variables), named exactly like the code tokens:
  `font-family/{sans,serif,mono}`, `font-weight/{normal,medium,semibold}`, `font-size/{9…96}`,
  `line-height/{15…144}`, `letter-spacing/{tight,normal,wider}`.
- All 37 `UI/*` text styles are now fully bound to these variables (before: partly bound to Tildei and to an
  external "Font" library, with gaps). Web text styles are not bound (they use % line height / tracking).
- Every layer that used typography variables from **"Tildei Variables 2025"** or **"Font"** now uses the Runhappy
  variable with the same value (≈1,200 bindings, including overrides inside instances).
- Every Tildei color (`UI colors/*`) in the file was replaced 1:1 with the Runhappy `ui/*` variable (≈880 bindings),
  in components and on the Colors pages.
- Final scan: **0** Tildei and **0** "Font" variables left in the file.
- Visible change: `search_field` disabled state background is now `ui/base/background` (white) instead of Tildei's
  off-white. Typography is visually unchanged.

**Side effect (found 2026-10-23 while auditing):** fixing the 20 "Active" texts on the Colors page (inside a remote
"Toggle" component) also replaced their references to the external "6. Typography" library, not only "Font".
Checked against the original component: no visual change (Geist Medium 14/21 before and after).

### Other external libraries — audit 2026-10-23

| Library (collection)                                         | What it contains                                                                                                                  | Where                                       | Uses |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ---- |
| "Colors"                                                     | Old brand colors in Title Case (`Accent/Yellow`, `Neutral/Off Black`…); same light values as `brand/*`, several without dark mode | tag, event row, Typography pages, Thumbnail | 296  |
| "2. Radius"                                                  | `radius-full` = 9999                                                                                                              | Checkbox, _Checkbox base, Colors pages      | 188  |
| "3. Spacing"                                                 | `spacing-xxs` 2, `spacing-md` 8, `spacing-lg` 12                                                                                  | Checkbox, Colors pages                      | 143  |
| "1. Color modes"                                             | shadow colors `shadow-sm_01/_02` (#0a0d12 at 10%)                                                                                 | Colors pages                                | 40   |
| "Radius"                                                     | `radius/xl` 24, `2xl` 32, `3xl` 40                                                                                                | Typography pages (documentation frames)     | 36   |
| "Variable collection" (library "Lunte UI", the studio's own) | `Black` #181d27, `White`                                                                                                          | Colors pages                                | 15   |
| "Color" / "Color Styles"                                     | `color/base/foreground` #181d27, `Grayscale/white`                                                                                | Colors pages                                | 3    |

**Applied 2026-10-23 (by Claude, approved by Adriana — items 1, 2 and 6):** old "Colors" → `brand/*` (1:1, same
values), "2. Radius" `radius-full` → `radius/full`, "Lunte UI" `Black`/`White`, "Color" and "Color Styles" →
`ui/base/foreground` / `brand/neutral/white`. ≈490 bindings; final scan shows 0 left. tag, event row and Checkbox are
visually identical. Effect: tag and event row now follow dark mode (the old colors had no dark mode). Library published by
Adriana on 2026-10-23.

**Still pending (decide later):** "Radius" on Typography documentation frames (proposal: `radius/sm`), external icons inside components (done 2026-10-27 with Phosphor), "Automations" example screen on the Colors page (proposal: archive).

The numbered collections ("1. Color modes", "2. Radius", "3. Spacing", "6. Typography") follow the naming of a
commercial UI kit (probably Untitled UI) — inferred from the names, not confirmed.

External **components** too: icons inside Runhappy components (`chevron-down`, `Arrow / Chevron_Right`,
`Icons Outlined / type=info|search|close`, `Icon / Name=Home|Info|Chevron-down|Check|Minus`), and on the Colors pages
a full example screen ("Automations") built with external components (Button, Toggle, Template, Campaign row…).
Thumbnail uses the studio's "Figma project thumbnail" library (expected).

### Spacing and shadows (2026-10-23)

- Audit: the library used 2, 4, 6, 8, 10, 12, 14, 16 (+ one 29px gap in event row). No elevation shadows: only the focus ring.
- Code: `src/tokens/spacing.css` replaces Tailwind's multiplier with named steps (`--spacing-16: 1rem` → `p-16`).
  All component and story classes were migrated (`p-4` → `p-16`, `gap-2` → `gap-8`, `size-5` → `size-20`…).
  Tooltip max width moved to `--container-tooltip` (`max-w-tooltip`). Sizes measured after the change: identical.
- The token guard now also fails on spacing classes outside the scale (e.g. `p-5`), which Tailwind would silently ignore.
- Figma: new local collection **"Spacing"** (`spacing/2` … `spacing/64`, scopes gap + width/height); 973 paddings/gaps in
  components bound to it; the external "3. Spacing" library replaced (100 bindings, 0 left); event row gap 29 → 28
  (approved). Components visually identical.
- Shadow **approved** by Adriana: `shadow-overlay` = offset 0/4, blur 16, no spread; color off-black 12% (light) /
  black 48% (dark). Figma: color variable `shadow/overlay-color` (Colors collection, both modes) + effect style
  `shadow/overlay`, applied to the `tooltip` component. Code: `--shadow-overlay-color` in colors.css, `shadow-overlay`
  in shadows.css.
- External "1. Color modes" replaced: the 40 small shadows on the external Toggle knobs (Colors page) keep their own
  shape (1–3px blur) and now use `shadow/overlay-color` (12% instead of 10%). 0 left.
- Library published by Adriana (spacing + shadow), confirmed 2026-10-27.

## Corrections to the CSS export (Figma wins)

- The export referenced typography variables that do not exist (`--fonts-size-*`, `--font-family-*`…).
  Primitives were rebuilt from the Figma text styles.
- Web styles letter-spacing is a **percentage** in Figma (-3%), the export said `-3px`.
- `Web Text Styles/Title/Medium` is "65 Medium" in Figma; the export said weight 400.
- Two colors missing from the export were added: `brand/text/text link`, `ui/surface/surface-150`.

## Open questions (to confirm)

0. **Not built for now (Adriana, 2026-10-28):** `event row` and `text style button` stay in Figma only, no code yet.

1. **Contrast:** all decided (see above). Waiting for the Figma update to re-read the tokens.
2. **Fonts:**
   - **Neue Haas Grotesk (Text and Display):** every file available is the TRIAL version, including the
     copies in `party-manager/public/fonts` (renamed, but internally "HaasGrot … Trial"). The license embedded
     in the font (Commercial Type EULA) says @font-face web embedding requires a license upgrade.
     Decision (2026-10-23, Claude): no Haas files are bundled. The browser uses the font only when it is
     installed on the computer (works on Adriana's Mac); everyone else sees Geist.
     **Needed for production:** a Commercial Type **web license** (woff2) for Text 55 Roman / 65 Medium
     and Display 55 Roman / 65 Medium. Ask the founding team.
   - **Fields (serif):** no files for Runhappy (copies in Drive belong to other clients and were not used).
     Decision (2026-10-23, Adriana): the "UI/Headline Serif/1-6" styles use **Geist Regular**, in code and
     in Figma (changed by Claude in the Figma text styles; before: Fields Regular, same sizes,
     line heights and letter spacing). The style names were not changed. Library published by Adriana on 2026-10-23.

3. **Spacing and shadows** do not exist in Figma yet.
4. Semantic colors in Figma are raw hex values, not aliases of brand colors
   (e.g. `ui/base/primary` repeats the yellow instead of pointing to `brand/accent/yellow`).
   Changing a brand color will not update the UI colors automatically.
5. `brand/neutral/white` is dark (#1a1a18) in dark mode, and `off black` is light. The names describe
   the light mode only, which can confuse developers.
6. **Dark mode — decided (Adriana, 2026-10-28):** follows the operating system by default, and the user can change
   it by hand (the choice is remembered in the browser; "system" goes back to following the OS). Code:
   `src/lib/theme.ts` + the no-flash script in `src/app.html`; Storybook toolbar has a "System" option.
   Where and how: a ThemeSwitch in the sidebar footer (option B, see "Sidebar column, theme switch…").
   Not verified: the live switch when the OS changes mode with the page open (the test browser does not send
   that event); loading the page in each mode and the manual choice were checked.
