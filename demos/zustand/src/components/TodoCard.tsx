import type { Todo } from "../types";
import { useTodoStore } from "../store/todoStore";

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  // Each component pulls only the actions it needs.
  // Actions are stable references — these selectors never trigger a re-render.
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(todo.id)}
        style={{ marginRight: "0.5rem" }}
      />
      <strong style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </strong>
      {" — "}
      <span>{todo.minutes} min</span>
      {" "}
      <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "0.5rem" }}>
        delete
      </button>
    </li>
  );
}
