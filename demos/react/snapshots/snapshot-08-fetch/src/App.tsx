import { useEffect, useState } from "react";

// The shape the API returns. JSONPlaceholder has: userId, id, title, completed.
interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Our app's Todo shape — same as previous snapshots.
interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = (await response.json()) as ApiTodo[];

        // Map the API shape onto our app's shape.
        const mapped: Todo[] = data.map((t) => ({
          id: t.id,
          text: t.title,
          done: t.completed,
          minutes: 15,
        }));
        setTodos(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []); // empty array → run ONCE on mount

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Remote Todos</h1>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Loaded from jsonplaceholder.typicode.com
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {!loading && !error && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
              <input type="checkbox" checked={todo.done} readOnly style={{ marginRight: "0.5rem" }} />
              <strong style={{ textDecoration: todo.done ? "line-through" : "none" }}>
                {todo.text}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
