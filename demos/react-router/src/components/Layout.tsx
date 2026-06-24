import { NavLink, Outlet } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";

// NavLink gives us `isActive` so the current page's link can style itself.
// We return a className string based on it.
const linkClass = ({ isActive }: { isActive: boolean }) =>
  "px-3 py-1 rounded-full text-sm font-medium transition-colors " +
  (isActive
    ? "bg-blue-600 text-white"
    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700");

// The shared shell: nav on top, then whatever child route matches renders in
// the <Outlet />. One place for the chrome every page shares.
export default function Layout() {
  const { isDark, toggle } = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          {/* `end` means "/" is only active on EXACTLY "/", not every route. */}
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/todos" className={linkClass}>
            Todos
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </div>
        <button
          onClick={toggle}
          className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {isDark ? "☀ light" : "☾ dark"}
        </button>
      </nav>

      <Outlet />
    </div>
  );
}
