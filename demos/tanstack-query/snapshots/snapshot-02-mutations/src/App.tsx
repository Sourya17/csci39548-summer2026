import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Filter, Todo } from "./types";
import { addTodo, deleteTodo, fetchTodos, toggleTodo } from "./api";
import { useDarkMode } from "./hooks/useDarkMode";
import TodoSummary from "./components/TodoSummary";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");
  const { isDark, toggle } = useDarkMode();

  // The client gives us access to the cache so a mutation can invalidate it.
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // After ANY write succeeds, mark ["todos"] stale → useQuery refetches →
  // the screen updates. We never touch the data by hand.
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["todos"] });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: invalidate,
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: invalidate,
  });

  const visibleTodos = (todos ?? []).filter((t) => {
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

        {isLoading && (
          <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
            Loading todos…
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-600 dark:text-red-400 py-4 text-center">
            Error: {error.message}. Is the server running (npm run server)?
          </p>
        )}

        {todos && (
          <>
            <TodoSummary todos={todos} />
            <TodoFilter filter={filter} onChange={setFilter} />
            <TodoList
              todos={visibleTodos}
              onToggle={(todo: Todo) => toggleMutation.mutate(todo)}
              onDelete={(id: number) => deleteMutation.mutate(id)}
            />
            <TodoForm
              onAdd={(text, minutes) => addMutation.mutate({ text, minutes })}
              isAdding={addMutation.isPending}
            />
          </>
        )}
      </div>
    </div>
  );
}
