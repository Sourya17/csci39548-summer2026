import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

const STORAGE_KEY = "react-demo.todos";

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: "Buy groceries", done: false, minutes: 30 },
  { id: 2, text: "Walk the dog", done: true, minutes: 20 },
];

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
  // Lazy initializer: read localStorage ONCE on first render.
  const [todos, setTodos] = useState<Todo[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TODOS;
    try {
      return JSON.parse(raw) as Todo[];
    } catch {
      return DEFAULT_TODOS;
    }
  });

  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);

  // SAVE to localStorage whenever todos changes.
  // The [todos] dependency array tells React: "re-run this when todos changes."
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    console.log("saved", todos.length, "todos to localStorage");
  }, [todos]);

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

  function resetTodos() {
    setTodos(DEFAULT_TODOS);
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos ({todos.length})</h1>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Saved in localStorage. Refresh the page — your todos persist.
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

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

      <button onClick={resetTodos} style={{ marginTop: "1rem" }}>
        Reset to defaults
      </button>
    </div>
  );
}
