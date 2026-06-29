import { useState } from "react";
import type { Filter } from "./types";
import { useTodoStore } from "./store/todoStore";
(window as any).useTodoStore = useTodoStore; // DEMO ONLY
import TodoSummary from "./components/TodoSummary";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  // App only needs todos (for filtering) + resetTodos for the button.
  // Actions for items live inside the items.
  const todos = useTodoStore((s) => s.todos);
  const resetTodos = useTodoStore((s) => s.resetTodos);

  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos</h1>
      <TodoSummary todos={todos} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList todos={visibleTodos} />
      <TodoForm />
      <button onClick={resetTodos} style={{ marginTop: "1rem" }}>
        Reset to defaults
      </button>
    </div>
  );
}
