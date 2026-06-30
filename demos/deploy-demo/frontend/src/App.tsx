import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
};

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const r = await fetch(`${API}/api/todos`);
      if (!r.ok) throw new Error(`GET /api/todos -> ${r.status}`);
      setTodos(await r.json());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch(`${API}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.trim(), minutes }),
    });
    setText("");
    load();
  }

  async function toggleDone(t: Todo) {
    await fetch(`${API}/api/todos/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !t.done }),
    });
    load();
  }

  async function deleteTodo(id: number) {
    await fetch(`${API}/api/todos/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main>
      <h1>Deploy Demo</h1>
      <p className="muted">
        Vercel (frontend) → Render (backend) → Neon (Postgres)
        <br />
        <code>{API}</code>
      </p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What to do?"
          required
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          min={1}
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t)}
            />
            <span>
              {t.text} <em>({t.minutes}m)</em>
            </span>
            <button onClick={() => deleteTodo(t.id)}>delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
