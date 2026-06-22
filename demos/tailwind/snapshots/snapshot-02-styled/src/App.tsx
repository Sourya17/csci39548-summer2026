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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos</h1>
        <TodoSummary todos={todos} />
        <TodoFilter filter={filter} onChange={setFilter} />
        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        <TodoForm onAdd={addTodo} />
        <button
          onClick={resetTodos}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
