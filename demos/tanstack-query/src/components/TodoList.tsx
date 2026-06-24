import type { Todo } from "../types";
import TodoCard from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({
  todos,
  selectedId,
  onSelect,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-sm text-gray-400 dark:text-gray-500 italic py-4 text-center">
        No todos to show.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          isSelected={todo.id === selectedId}
          onSelect={onSelect}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
