import { useState } from "react";
import type { Filter } from "./types";
import { useTodoStore } from "./store/todoStore";
(window as any).useTodoStore = useTodoStore; // DEMO ONLY
import { useVisibleTodos } from "./store/selectors";
import TodoSummary from "./components/TodoSummary";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  const resetTodos = useTodoStore((s) => s.resetTodos);

  const [filter, setFilter] = useState<Filter>("all");
  // Filter logic moved into a selector. App never touches the raw todos array.
  const visibleTodos = useVisibleTodos(filter);

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos</h1>
      <TodoSummary />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList todos={visibleTodos} />
      <TodoForm />
      <button onClick={resetTodos} style={{ marginTop: "1rem" }}>
        Reset to defaults
      </button>
    </div>
  );
}
