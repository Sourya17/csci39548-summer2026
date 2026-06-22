import type { Filter } from "../types";

interface TodoFilterProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const OPTIONS: Filter[] = ["all", "active", "done"];

export default function TodoFilter({ filter, onChange }: TodoFilterProps) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      Show:{" "}
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          disabled={filter === opt}
          style={{ marginRight: "0.25rem", textTransform: "capitalize" }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
