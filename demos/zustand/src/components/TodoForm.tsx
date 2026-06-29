import { useEffect, useRef, useState } from "react";
import { useTodoStore } from "../store/todoStore";

// No props. The form pulls addTodo straight from the store.
export default function TodoForm() {
  const addTodo = useTodoStore((s) => s.addTodo);

  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() === "") return;
    addTodo(text.trim(), minutes);
    setText("");
    setMinutes(15);
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        ref={inputRef}
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
  );
}
