import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const toggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-indigo-700 dark:hover:bg-indigo-600"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4 text-yellow-300" />
      ) : (
        <Moon className="w-4 h-4 text-gray-800" />
      )}
    </button>
  );
}
