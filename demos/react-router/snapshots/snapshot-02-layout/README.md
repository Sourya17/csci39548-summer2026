# Snapshot 02 — shared layout + `<NavLink>`

**Headline:** the nav bar shouldn't be copy-pasted into every page. A **layout
route** renders shared chrome once; child routes fill the `<Outlet>`.

## What's new vs snapshot 01

- New `components/Layout.tsx` — the nav bar + dark toggle + an `<Outlet />`.
- `App.tsx` — routes are now nested under a pathless **layout route**.
- `<Link>` → `<NavLink>` so the active page's link highlights itself.
- The dark-mode toggle moved from `TodosPage` up to `Layout` (it's shared now).

## Nested / layout routes

```tsx
<Routes>
  <Route element={<Layout />}>      {/* no path — just provides chrome */}
    <Route index element={<HomePage />} />   {/* "/" */}
    <Route path="todos" element={<TodosPage />} />
    <Route path="about" element={<AboutPage />} />
  </Route>
</Routes>
```

`Layout` renders the nav, then `<Outlet />` is the hole where the matched child
(`HomePage` / `TodosPage` / `AboutPage`) appears.

## `<NavLink>` active styling

```tsx
<NavLink to="/todos" className={({ isActive }) =>
  isActive ? "bg-blue-600 text-white" : "..."
}>Todos</NavLink>
```

`NavLink` passes `isActive` to a className function. The current route's link
styles itself — no manual "which tab am I on" tracking.

## The `end` prop gotcha

```tsx
<NavLink to="/" end>Home</NavLink>
```

Without `end`, "Home" (`to="/"`) would count as active on **every** route,
because every path starts with `/`. `end` means "active only on an exact match."

## Things to demo

- Navigate around → the active nav pill follows you. Visit `/todos` → "Todos"
  is highlighted, not "Home".
- The nav + dark toggle stay put across pages (they're in the layout, rendered
  once). Toggle dark on About, go to Todos → still dark.
- Temporarily remove `end` from the Home NavLink → watch "Home" stay highlighted
  everywhere. Put it back.
