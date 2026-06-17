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
  // Now an ARRAY of todos in state.
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Buy groceries", done: false, minutes: 30 },
    { id: 2, text: "Walk the dog", done: true, minutes: 20 },
    { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
  ]);

  function addRandomTodo() {
    const newTodo: Todo = {
      id: Date.now(),                 // unique-enough for now
      text: "New task " + (todos.length + 1),
      done: false,
      minutes: 15,
    };
    // Spread the old array + add the new one. New array, not a mutation.
    setTodos([...todos, newTodo]);
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos ({todos.length})</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </ul>

      <button onClick={addRandomTodo}>Add a todo</button>
    </div>
  );
}
