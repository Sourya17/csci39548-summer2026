import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Filter, Todo } from "../types";
import { addTodo, deleteTodo, fetchTodos, toggleTodo } from "../api";
import TodoSummary from "../components/TodoSummary";
import TodoFilter from "../components/TodoFilter";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

// The inline assignee panel is gone — assignee info now lives on each todo's
// own page (/todos/:id). Clicking a todo's text navigates there.
export default function TodosPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["todos"] });

  const addMutation = useMutation({ mutationFn: addTodo, onSuccess: invalidate });
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
    <div className="py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Todos
        </h1>

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
