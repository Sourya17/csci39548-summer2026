import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

export default function App() {
  // useState gives us [currentValue, setterFunction].
  // The argument is the initial value.
  const [todo, setTodo] = useState<Todo>({
    id: 1,
    text: "Buy groceries",
    done: false,
    minutes: 30,
  });

  // A counter, just to show useState works with any type.
  const [clicks, setClicks] = useState(0);

  function toggleDone() {
    // NEVER mutate state directly. setTodo({ ...todo, done: !todo.done })
    // creates a NEW object with done flipped.
    setTodo({ ...todo, done: !todo.done });
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos</h1>

      <div style={{ marginBottom: "1rem" }}>
        <strong>{todo.text}</strong>
        {" — "}
        <span>{todo.minutes} min</span>
        {" — "}
        <span>{todo.done ? "done" : "todo"}</span>
      </div>

      <button onClick={toggleDone}>
        Mark as {todo.done ? "not done" : "done"}
      </button>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>You clicked the button below {clicks} time{clicks === 1 ? "" : "s"}.</p>
      <button onClick={() => setClicks(clicks + 1)}>Click me</button>
    </div>
  );
}
