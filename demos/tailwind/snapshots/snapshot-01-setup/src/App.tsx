import { useState } from "react";
import type { Filter } from "./types";
import { useTodos } from "./hooks/useTodos";
import TodoSummary from "./components/TodoSummary";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, resetTodos } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      {/* The ONLY Tailwind classes in this snapshot — to prove it's wired up. */}
      <h1 className="text-4xl font-bold text-blue-600">Todos</h1>

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
