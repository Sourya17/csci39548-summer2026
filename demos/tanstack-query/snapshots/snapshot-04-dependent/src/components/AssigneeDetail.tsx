import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api";

interface AssigneeDetailProps {
  // The assignee to load. null when no todo is selected.
  assigneeId: number | null;
}

export default function AssigneeDetail({ assigneeId }: AssigneeDetailProps) {
  // DEPENDENT QUERY: this only runs when `enabled` is true — i.e. once a todo
  // is selected and we actually have an id to fetch. Until then it stays idle.
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", assigneeId],
    queryFn: () => fetchUser(assigneeId!),
    enabled: assigneeId !== null,
  });

  const box =
    "mt-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 px-4 py-3 text-sm";

  if (assigneeId === null) {
    return (
      <div className={box + " text-gray-400 dark:text-gray-500 italic"}>
        Click a todo to see who it's assigned to.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={box + " text-gray-500 dark:text-gray-400"}>
        Loading assignee…
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className={box + " text-red-600 dark:text-red-400"}>
        Couldn't load the assignee.
      </div>
    );
  }

  return (
    <div className={box + " text-gray-700 dark:text-gray-200"}>
      Assigned to <strong>{user.name}</strong>
      <span className="text-gray-500 dark:text-gray-400"> · {user.email}</span>
    </div>
  );
}
