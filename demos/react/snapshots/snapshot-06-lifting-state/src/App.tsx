import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

// Props now include a callback. The CHILD does not own state.
// It asks the parent to toggle by calling onToggle(todo.id).
interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  
  const [localDone, setLocalDone] = useState(false);
  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <input
        type="checkbox"
        checked={localDone} 
        onChange={() => setLocalDone(!localDone)}
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
  ]);

  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);

  function addTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), done: false, minutes }]);
    setText("");
    setMinutes(15);
  }

  // STATE LIVES HERE. Children get callbacks to request changes.
  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos ({todos.length})</h1>

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
    </div>
  );
}
