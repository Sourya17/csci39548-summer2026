import { useState } from "react";
import type { Todo, Filter } from "./types";
import TodoSummary from "./components/TodoSummary";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Buy groceries", done: false, minutes: 30 },
    { id: 2, text: "Walk the dog", done: true, minutes: 20 },
    { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
    { id: 4, text: "Write report", done: true, minutes: 60 },
  ]);
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  function addTodo(text: string, minutes: number) {
    setTodos([...todos, { id: Date.now(), text, done: false, minutes }]);
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
      <TodoSummary todos={todos} />
      <TodoFilter filter={filter} onChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <TodoForm onAdd={addTodo} />
    </div>
  );
}
