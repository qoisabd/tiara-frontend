import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../features/theme/themeSlice";
import { Button } from "./ui/button";
import { RootState } from "../store/store";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const ThemeToggle = () => {
  const darkMode = useSelector(
    (state: RootState) => state.themeReducer.darkMode
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          {darkMode ? (
            <Moon size={24} className="text-white" />
          ) : (
            <Sun size={24} className="text-white" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => dispatch(setDarkMode(false))}>
          <Sun className="mr-2 h-4 w-4 text-yellow-500" /> Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setDarkMode(true))}>
          <Moon className="mr-2 h-4 w-4 text-yellow-500" /> Dark Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
