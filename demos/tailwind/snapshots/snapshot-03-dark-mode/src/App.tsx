import { useState } from "react";
import type { Filter } from "./types";
import { useTodos } from "./hooks/useTodos";
import { useDarkMode } from "./hooks/useDarkMode";
import TodoSummary from "./components/TodoSummary";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, resetTodos } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");
  const { isDark, toggle } = useDarkMode();

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:py-12 transition-colors">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Todos
          </h1>
          <button
            onClick={toggle}
            className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isDark ? "☀ light" : "☾ dark"}
          </button>
        </div>
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
          className="mt-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
