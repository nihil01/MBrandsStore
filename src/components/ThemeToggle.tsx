import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "dark") {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    } else {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  const getTooltip = () => {
    if (theme === "light") return "Switch to dark mode";
    if (theme === "dark") return "Switch to system mode";
    return "Switch to light mode";
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={getTooltip()}
      data-testid="theme-toggle"
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}