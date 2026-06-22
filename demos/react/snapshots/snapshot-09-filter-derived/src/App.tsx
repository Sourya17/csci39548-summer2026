import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

type Filter = "all" | "active" | "done";

interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
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

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Buy groceries", done: false, minutes: 30 },
    { id: 2, text: "Walk the dog", done: true, minutes: 20 },
    { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
    { id: 4, text: "Write report", done: true, minutes: 60 },
  ]);

  const [filter, setFilter] = useState<Filter>("all");
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);

  // DERIVED VALUES — computed on every render. No useState needed.
  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });
  const doneCount = todos.filter((t) => t.done).length;
  const activeCount = todos.length - doneCount;
  const totalMinutes = todos.reduce((sum, t) => sum + t.minutes, 0);
  const remainingMinutes = todos
    .filter((t) => !t.done)
    .reduce((sum, t) => sum + t.minutes, 0);

  function addTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false, minutes }]);
    setText("");
    setMinutes(15);
  }
  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos</h1>

      <p style={{ color: "#666" }}>
        {activeCount} active · {doneCount} done · {remainingMinutes} of {totalMinutes} min remaining
      </p>

      <div style={{ marginBottom: "1rem" }}>
        Show:{" "}
        <button
          onClick={() => setFilter("all")}
          disabled={filter === "all"}
          style={{ marginRight: "0.25rem" }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
          style={{ marginRight: "0.25rem" }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("done")}
          disabled={filter === "done"}
        >
          Done
        </button>
      </div>

      {visibleTodos.length === 0 ? (
        <p style={{ color: "#999" }}>No todos to show.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {visibleTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      <form onSubmit={addTodo} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="What needs doing?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          style={{ width: "4rem", marginRight: "0.5rem" }}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
