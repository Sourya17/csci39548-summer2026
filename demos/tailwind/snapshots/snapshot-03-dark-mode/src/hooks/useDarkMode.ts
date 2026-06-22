import { useEffect, useState } from "react";

const STORAGE_KEY = "tailwind-demo.dark";

// Custom hook that mirrors the useTodos pattern: state + persistence + setter.
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEY, String(isDark));
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((prev) => !prev) };
}
