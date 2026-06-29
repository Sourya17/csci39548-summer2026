import { useState } from "react";
import type { Filter } from "./types";
import { useTodoStore } from "./store/todoStore";
(window as any).useTodoStore = useTodoStore; // DEMO ONLY
import TodoSummary from "./components/TodoSummary";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  // Each useTodoStore call picks ONE slice. Components re-render only
  // when their slice changes.
  const todos = useTodoStore((s) => s.todos);
  const addTodo = useTodoStore((s) => s.addTodo);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const resetTodos = useTodoStore((s) => s.resetTodos);

  // Filter is UI state — keep it local. Not everything belongs in the store.
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
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <TodoForm onAdd={addTodo} />
      <button onClick={resetTodos} style={{ marginTop: "1rem" }}>
        Reset to defaults
      </button>
    </div>
  );
}
