import type { Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoCard({
  todo,
  isSelected,
  onSelect,
  onToggle,
  onDelete,
}: TodoCardProps) {
  return (
    <li
      className={
        "group flex items-center gap-3 py-2 px-3 rounded-lg transition-colors " +
        (isSelected
          ? "bg-blue-50 dark:bg-blue-900/30"
          : "hover:bg-gray-50 dark:hover:bg-gray-700/50")
      }
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
      {/* Clicking the text selects the todo — that's what drives the
          dependent assignee query. */}
      <button
        onClick={() => onSelect(todo.id)}
        className={
          "flex-1 text-left font-medium " +
          (todo.done
            ? "line-through text-gray-400 dark:text-gray-500"
            : "text-gray-800 dark:text-gray-100")
        }
      >
        {todo.text}
      </button>
      <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
        {todo.minutes} min
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        delete
      </button>
    </li>
  );
}
