import { useEffect, useRef, useState } from "react";

interface TodoFormProps {
  onAdd: (text: string, minutes: number) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");
  const [minutes, setMinutes] = useState(15);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text.trim() === "") return;
    onAdd(text.trim(), minutes);
    setText("");
    setMinutes(15);
    inputRef.current?.focus();
  }

  const isEmpty = text.trim() === "";

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="What needs doing?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        className="w-16 px-2 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent tabular-nums"
      />
      <button
        type="submit"
        disabled={isEmpty}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
      >
        Add
      </button>
    </form>
  );
}
