# Snapshot 03 — dynamic route `/todos/:id` + 404

**Headline:** a URL can carry data. `/todos/3` means "show todo 3." `useParams`
reads the `:id`; a `*` route catches everything else.

## What's new vs snapshot 02

- New `pages/TodoDetailPage.tsx` — reads `:id`, fetches that one todo + its
  assignee, has a Back button.
- New `pages/NotFoundPage.tsx` — the 404.
- `api.ts` gains `fetchTodo(id)` (single todo).
- `TodoCard`: the text is now a `<Link to={`/todos/${id}`}>` instead of an
  in-place select. The old inline `AssigneeDetail` panel is gone — that info
  moved to the detail page (master → detail with routing).
- `App.tsx`: adds `todos/:id` and a `*` catch-all.

## Dynamic segments

```tsx
<Route path="todos/:id" element={<TodoDetailPage />} />
```

```tsx
const { id } = useParams();          // "3" (always a string)
const todoId = Number(id);
useQuery({ queryKey: ["todos", todoId], queryFn: () => fetchTodo(todoId) });
```

`:id` matches any value. `useParams()` hands it back. Note it's a **string** —
convert if your API wants a number.

## Navigating in code

```tsx
const navigate = useNavigate();
<button onClick={() => navigate(-1)}>← Back</button>   // back one history entry
```

`useNavigate` is for navigating from an event handler (after a form submit, a
Back button, etc.). `<Link>` is for navigation the user clicks directly.

## The catch-all 404

```tsx
<Route path="*" element={<NotFoundPage />} />   // keep it LAST
```

`*` matches anything no earlier route did. Conceptually: put the catch-all at
the bottom.

## Things to demo

- Click a todo's text → URL becomes `/todos/3`, the detail page shows status,
  estimate, assignee. Back button returns you.
- **Type a URL directly**: `/todos/2` in the address bar → loads that todo. URLs
  are real and shareable now.
- Visit `/todos/999` → "No todo with id 999" (json-server 404 → `isError`).
- Visit `/nonsense` → the 404 page.
- The detail's assignee is a dependent query (`enabled: !!todo`) — same pattern
  from the TanStack demo, now on its own page.
