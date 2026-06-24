import type { Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
}

// Read-only for snapshot 01. The checkbox shows state but can't change it yet —
// writing to the server is snapshot 02's job (mutations).
export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <li className="flex items-center gap-3 py-2 px-3">
      <input
        type="checkbox"
        checked={todo.done}
        readOnly
        className="w-4 h-4 accent-blue-600"
      />
      <span
        className={
          "flex-1 font-medium " +
          (todo.done
            ? "line-through text-gray-400 dark:text-gray-500"
            : "text-gray-800 dark:text-gray-100")
        }
      >
        {todo.text}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
        {todo.minutes} min
      </span>
    </li>
  );
}
