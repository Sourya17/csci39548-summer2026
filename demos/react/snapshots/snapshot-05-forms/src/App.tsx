import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

function TodoCard({ todo }: { todo: Todo }) {
  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <strong>{todo.text}</strong>
      {" — "}
      <span>{todo.minutes} min</span>
      {" — "}
      <span>{todo.done ? "done" : "todo"}</span>
    </li>
  );
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Buy groceries", done: false, minutes: 30 },
    { id: 2, text: "Walk the dog", done: true, minutes: 20 },
  ]);

  // Form state — one piece of state per input.
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();           // stop the browser from reloading
    if (text.trim() === "") return;   // don't add empty todos

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      done: false,
      minutes: minutes,
    };
    setTodos([...todos, newTodo]);

    // Clear the form.
    setText("");
    setMinutes(15);
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos ({todos.length})</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
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

      <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "0.5rem" }}>
        Live preview: "{text || "(empty)"}" — {minutes} min
      </p>
    </div>
  );
}
