# Snapshot 02 — Fully styled (light mode)

## What's new

Every inline `style={{ ... }}` is gone. Every component uses Tailwind utility classes.

## What to teach (in order — walk through each component live)

1. **App.tsx — page layout**
   - `min-h-screen bg-gray-50` — fill the viewport, light gray background
   - `max-w-md mx-auto` — center the card horizontally, cap its width
   - `bg-white rounded-2xl shadow-md p-6 sm:p-8` — white card with rounded corners, soft shadow, padding
   - `sm:py-12` — responsive: more vertical padding on small screens and up

2. **TodoSummary.tsx — typography**
   - `text-sm` / `text-gray-600` — smaller, muted text
   - The scale: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`…

3. **TodoFilter.tsx — flex + state variants + dynamic classes**
   - `flex gap-2` — horizontal row with spacing
   - `rounded-full` — pill shape
   - `transition-colors` — smooth color changes
   - **Conditional class string** — the active filter gets `bg-blue-600 text-white`, others get `bg-gray-100 hover:bg-gray-200`. This is the everyday pattern.

4. **TodoCard.tsx — flexbox row + group hover + line-through**
   - `flex items-center gap-3` — row with vertical alignment
   - `flex-1` on the text makes it stretch
   - `accent-blue-600` styles the native checkbox
   - **`group` + `group-hover:opacity-100`** — the delete button only appears when you hover the row. This is the killer feature of group variants.
   - `line-through text-gray-400` applied when `done` is true

5. **TodoForm.tsx — inputs + focus + disabled**
   - `border border-gray-300 rounded-lg` — input borders
   - `focus:outline-none focus:ring-2 focus:ring-blue-500` — custom focus ring
   - `disabled:bg-gray-300 disabled:cursor-not-allowed` — submit button greys out when input is empty

6. **TodoList.tsx — empty state + dividers**
   - `divide-y divide-gray-100` — automatic horizontal lines between list items. No more borders on each child.

## Things to emphasize

- **No CSS file written.** Everything is in the JSX.
- **Hover the delete button area** — show it appearing per row.
- **Resize the browser** — `sm:py-12` and `sm:p-8` kick in at 640px.
- **Tab through the form** — focus rings appear on each input.
- **Submit empty** — the Add button is greyed out.
