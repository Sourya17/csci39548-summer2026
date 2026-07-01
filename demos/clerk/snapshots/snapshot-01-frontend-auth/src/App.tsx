import { SignedIn, SignedOut, SignIn, SignUp, UserButton } from "@clerk/clerk-react";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Clerk Demo · Per-User Todos
        </h1>
        {/* UserButton shows the signed-in user's avatar + sign-out menu. */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>

      <main className="max-w-md mx-auto py-8 px-4">
        {/* SignedIn renders its children ONLY when a user is signed in.
            SignedOut is the inverse. No useState, no redirect — Clerk
            owns the auth state and re-renders the tree as it changes. */}
        <SignedIn>
          <TodoList />
        </SignedIn>

        <SignedOut>
          <div className="space-y-6">
            <p className="text-center text-gray-700 dark:text-gray-200">
              Sign in to see your todos.
            </p>
            {/* Clerk's hosted UI components. They handle email, OAuth,
                password rules, MFA, etc. — we don't write any of it. */}
            <SignIn routing="hash" />
            <SignUp routing="hash" />
          </div>
        </SignedOut>
      </main>
    </div>
  );
}
