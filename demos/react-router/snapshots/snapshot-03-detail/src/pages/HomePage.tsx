import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome 👋
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          A tiny multi-page app. The same Todo list you built, now one route
          among several.
        </p>
        <Link
          to="/todos"
          className="inline-block text-sm px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Go to your todos →
        </Link>
      </div>
    </div>
  );
}
