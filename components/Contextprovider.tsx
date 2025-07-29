"use client"
import React, { createContext, useEffect, useContext } from 'react'
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import "@/app/globals.css";

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ContextproviderProps = {
    children: React.ReactNode;
};

const Contextprovider = ({ children }: ContextproviderProps) => {
    const [theme, setTheme] = useState<string>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            }
        } catch (error) {
            console.error("Error accessing theme preference:", error);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        try {
            localStorage.setItem('theme', theme);

            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } catch (error) {
            console.error("Error updating theme:", error);
        }
    }, [theme, mounted]);

    return (
        <SessionProvider>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
        </SessionProvider>
    );
};

export default Contextprovider;

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}