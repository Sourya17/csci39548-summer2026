import type { Filter } from "../types";

interface TodoFilterProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const OPTIONS: Filter[] = ["all", "active", "done"];

export default function TodoFilter({ filter, onChange }: TodoFilterProps) {
  return (
    <div className="flex gap-2 mb-4">
      {OPTIONS.map((opt) => {
        const isActive = filter === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            disabled={isActive}
            className={
              "px-3 py-1 rounded-full text-sm capitalize transition-colors " +
              (isActive
                ? "bg-blue-600 text-white cursor-default"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200")
            }
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
