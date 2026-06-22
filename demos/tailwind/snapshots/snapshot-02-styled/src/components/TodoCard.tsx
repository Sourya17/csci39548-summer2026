import type { Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  return (
    <li className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
      <span
        className={
          "flex-1 font-medium " +
          (todo.done ? "line-through text-gray-400" : "text-gray-800")
        }
      >
        {todo.text}
      </span>
      <span className="text-xs text-gray-500 tabular-nums">
        {todo.minutes} min
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-xs text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        delete
      </button>
    </li>
  );
}
