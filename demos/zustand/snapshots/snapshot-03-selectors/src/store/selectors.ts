import { useShallow } from "zustand/react/shallow";
import type { Filter } from "../types";
import { useTodoStore } from "./todoStore";

// Parameterized selector — filter comes from the component (local UI state),
// the data comes from the store.
//
// IMPORTANT: .filter() returns a NEW array every call, so without useShallow
// the reference changes every render → infinite update loop. useShallow
// compares array contents shallowly so we only re-render when the visible
// set actually changes.
export function useVisibleTodos(filter: Filter) {
  return useTodoStore(
    useShallow((s) =>
      s.todos.filter((t) => {
        if (filter === "active") return !t.done;
        if (filter === "done") return t.done;
        return true;
      })
    )
  );
}

// Returns an object of derived numbers.
// useShallow does a shallow-equal compare so the component re-renders
// only when one of the four numbers actually changes.
// Without useShallow, this would render on EVERY store change (the
// returned object is a fresh reference each call).
export function useTodoCounts() {
  return useTodoStore(
    useShallow((s) => {
      const doneCount = s.todos.filter((t) => t.done).length;
      const activeCount = s.todos.length - doneCount;
      const totalMinutes = s.todos.reduce((sum, t) => sum + t.minutes, 0);
      const remainingMinutes = s.todos
        .filter((t) => !t.done)
        .reduce((sum, t) => sum + t.minutes, 0);
      return { activeCount, doneCount, totalMinutes, remainingMinutes };
    })
  );
}
