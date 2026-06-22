# Snapshot 03 — Dark mode

## What's new

1. **`index.css`** — Tailwind v4 default is `prefers-color-scheme` media query. We opt into **class-based** dark mode with one line:
   ```css
   @custom-variant dark (&:where(.dark, .dark *));
   ```
   This says: "the `dark:` variant means a `.dark` class anywhere in the ancestor chain."

2. **`hooks/useDarkMode.ts`** — A new custom hook, mirroring `useTodos`'s pattern:
   - `useState` with a lazy initializer that reads from `localStorage`
   - Falls back to the system preference (`matchMedia`)
   - `useEffect` toggles `.dark` on `<html>` and persists the choice
   - Returns `{ isDark, toggle }`

3. **`App.tsx`** — calls `useDarkMode()`, renders a toggle button next to the H1.

4. **Every component** got `dark:` variants added to every color class:
   - `bg-gray-50` → `bg-gray-50 dark:bg-gray-900`
   - `text-gray-800` → `text-gray-800 dark:text-gray-100`
   - And so on.

## What to teach

- **`dark:` is just another variant**, like `hover:` and `focus:`. Same syntax.
- **The pattern:** pick a base color for light mode, then add `dark:` for the dark counterpart.
- The toggle button itself uses `useState` + a custom hook — nothing new conceptually, just reusing the patterns from the React demo.
- **Why class-based, not media query?** Class-based lets the user override their system preference. Most production apps do this.
- **System preference fallback** — when no localStorage value, respect `prefers-color-scheme`. This is the polite default.

## Demo flow in class

1. Toggle the button — page flips instantly.
2. Open Application → Local Storage → see `tailwind-demo.dark`.
3. Refresh the page — preference persists.
4. (Optional) Change system theme in OS settings → first-load matches it.
