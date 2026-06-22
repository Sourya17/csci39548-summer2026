import type { Todo } from "../types";
import TodoCard from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic py-4 text-center">
        No todos to show.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
