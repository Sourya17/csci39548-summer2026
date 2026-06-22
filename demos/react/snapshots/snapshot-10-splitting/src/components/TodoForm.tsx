import { useState } from "react";

interface TodoFormProps {
  onAdd: (text: string, minutes: number) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() === "") return;
    onAdd(text.trim(), minutes);
    setText("");
    setMinutes(15);
  }

  return (
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
  );
}
