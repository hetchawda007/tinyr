"use client"
import { createContext } from "react";

interface themeprops {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<themeprops | undefined>(undefined)
export default ThemeContext;