import type { Todo } from "../types";

export default function TodoSummary({ todos }: { todos: Todo[] }) {
  const doneCount = todos.filter((t) => t.done).length;
  const activeCount = todos.length - doneCount;
  const totalMinutes = todos.reduce((sum, t) => sum + t.minutes, 0);
  const remainingMinutes = todos
    .filter((t) => !t.done)
    .reduce((sum, t) => sum + t.minutes, 0);

  return (
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      {activeCount} active · {doneCount} done · {remainingMinutes} of{" "}
      {totalMinutes} min remaining
    </p>
  );
}
