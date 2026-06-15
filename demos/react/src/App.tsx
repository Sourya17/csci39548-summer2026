// Same Todo shape we used in the TypeScript demo.
interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

// A component is a function that takes props and returns JSX.
// Props are an object — we destructure { todo } out of it.
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
  // Static data for now. We'll make this dynamic in the next snapshot.
  const todo1: Todo = { id: 1, text: "Buy groceries", done: false, minutes: 30 };
  const todo2: Todo = { id: 2, text: "Walk the dog", done: true, minutes: 20 };
  const todo3: Todo = { id: 3, text: "Read 20 pages", done: false, minutes: 40 };

  return (
    <div style={{ fontFamily: "system-ui", padding: "2rem", maxWidth: "32rem" }}>
      <h1>Todos</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <TodoCard todo={todo1} />
        <TodoCard todo={todo2} />
        <TodoCard todo={todo3} />
      </ul>
    </div>
  );
}
