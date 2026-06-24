import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTodo, fetchUser } from "../api";

export default function TodoDetailPage() {
  // useParams reads the dynamic segment from the URL: /todos/:id
  const { id } = useParams();
  const todoId = Number(id);
  const navigate = useNavigate();

  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos", todoId],
    queryFn: () => fetchTodo(todoId),
  });

  // Dependent query: load the assignee once we have the todo.
  const { data: assignee } = useQuery({
    queryKey: ["user", todo?.assigneeId],
    queryFn: () => fetchUser(todo!.assigneeId),
    enabled: !!todo,
  });

  return (
    <div className="py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
        {/* useNavigate(-1) goes back one entry in history, like the browser
            back button. */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
        >
          ← Back
        </button>

        {isLoading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
        )}

        {isError && (
          <div>
            <p className="text-sm text-red-600 dark:text-red-400 mb-3">
              No todo with id {todoId}.
            </p>
            <Link
              to="/todos"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Back to all todos
            </Link>
          </div>
        )}

        {todo && (
          <>
            <h1
              className={
                "text-2xl font-bold mb-2 " +
                (todo.done
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-900 dark:text-gray-100")
              }
            >
              {todo.text}
            </h1>
            <dl className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>
                Status:{" "}
                <strong className="text-gray-800 dark:text-gray-200">
                  {todo.done ? "Done" : "Active"}
                </strong>
              </div>
              <div>
                Estimate:{" "}
                <strong className="text-gray-800 dark:text-gray-200">
                  {todo.minutes} min
                </strong>
              </div>
              <div>
                Assignee:{" "}
                <strong className="text-gray-800 dark:text-gray-200">
                  {assignee ? assignee.name : "…"}
                </strong>
              </div>
            </dl>
          </>
        )}
      </div>
    </div>
  );
}
