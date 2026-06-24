import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* A plain nav bar for now. <Link> changes the URL WITHOUT a full page
          reload — that's the whole point of a client-side router. */}
      <nav className="flex gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-sm font-medium">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Home
        </Link>
        <Link
          to="/todos"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        >
          Todos
        </Link>
        <Link
          to="/about"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
        >
          About
        </Link>
      </nav>

      {/* Whichever <Route> matches the current URL renders here. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}
