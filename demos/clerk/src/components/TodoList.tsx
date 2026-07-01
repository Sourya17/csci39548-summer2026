import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../lib/api";
import type { Todo } from "../types";

export default function TodoList() {
  const api = useApi();
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: api.listTodos,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["todos"] });

  const addMutation = useMutation({
    mutationFn: api.addTodo,
    onSuccess: invalidate,
  });
  const toggleMutation = useMutation({
    mutationFn: api.toggleTodo,
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: api.deleteTodo,
    onSuccess: invalidate,
  });

  if (isLoading) return <p className="text-gray-500">Loading…</p>;
  if (isError) return <p className="text-red-600">Error: {String(error)}</p>;

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {(todos ?? []).map((t: Todo) => (
          <li
            key={t.id}
            className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm px-4 py-2"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleMutation.mutate(t)}
                className="h-4 w-4"
              />
              <span
                className={
                  t.done
                    ? "line-through text-gray-400"
                    : "text-gray-900 dark:text-gray-100"
                }
              >
                {t.text} <span className="text-xs text-gray-400">· {t.minutes}m</span>
              </span>
            </label>
            <button
              onClick={() => deleteMutation.mutate(t.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              delete
            </button>
          </li>
        ))}
      </ul>

      <NewTodoForm onAdd={(text, minutes) => addMutation.mutate({ text, minutes })} />
    </div>
  );
}

function NewTodoForm({ onAdd }: { onAdd: (text: string, minutes: number) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const text = String(fd.get("text") ?? "").trim();
        const minutes = Number(fd.get("minutes") ?? 0);
        if (!text || !minutes) return;
        onAdd(text, minutes);
        e.currentTarget.reset();
      }}
      className="flex gap-2"
    >
      <input
        name="text"
        placeholder="New todo…"
        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 px-3 py-2 text-sm"
      />
      <input
        name="minutes"
        type="number"
        min={1}
        placeholder="min"
        className="w-20 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 px-3 py-2 text-sm"
      />
      <button className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}
