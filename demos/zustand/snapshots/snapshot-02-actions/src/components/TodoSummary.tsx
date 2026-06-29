import type { Todo } from "../types";

export default function TodoSummary({ todos }: { todos: Todo[] }) {
  const doneCount = todos.filter((t) => t.done).length;
  const activeCount = todos.length - doneCount;
  const totalMinutes = todos.reduce((sum, t) => sum + t.minutes, 0);
  const remainingMinutes = todos
    .filter((t) => !t.done)
    .reduce((sum, t) => sum + t.minutes, 0);

  return (
    <p style={{ color: "#666" }}>
      {activeCount} active · {doneCount} done · {remainingMinutes} of{" "}
      {totalMinutes} min remaining
    </p>
  );
}
