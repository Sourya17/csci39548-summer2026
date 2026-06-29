import type { Todo } from "../types";
import TodoCard from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
}

// TodoList no longer relays onToggle/onDelete props. It just renders.
// TodoCard reaches into the store for its own actions.
export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return <p style={{ color: "#999" }}>No todos to show.</p>;
  }
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
