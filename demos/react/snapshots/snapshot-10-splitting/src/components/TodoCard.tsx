import type { Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: "0.5rem" }}
      />
      <strong style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </strong>
      {" — "}
      <span>{todo.minutes} min</span>
      {" "}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "0.5rem" }}>
        delete
      </button>
    </li>
  );
}
