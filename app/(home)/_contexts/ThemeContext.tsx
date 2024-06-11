'use client';

import { PaletteMode, Theme, createTheme, useMediaQuery } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import getTheme from "../_utils/theme";

export const ThemeContext = createContext<{
    mode: PaletteMode;
    setMode: (mode: PaletteMode) => void;
    theme: Theme;
    changeColorMode: (mode: PaletteMode) => void;
} | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode; }) {

    const prefersMode = useMediaQuery('(prefers-color-scheme: dark)');
    useEffect(() => {
        const storedMode = localStorage.getItem('color-mode') as PaletteMode | null;

        if (storedMode) {
            setMode(storedMode);
        } else {
            setMode(prefersMode ? 'dark' : 'light');
        }
    }, [prefersMode]);



    const [mode, setMode] = useState<PaletteMode>(prefersMode ? 'dark' : 'light');
    const changeColorMode = (currentMode: PaletteMode) => {
        setMode(currentMode);

        localStorage.setItem('color-mode', currentMode);
    };

    const theme = createTheme(getTheme(mode));
    return (
        <ThemeContext.Provider value={{ mode, setMode, theme, changeColorMode }}>
            {children}
        </ThemeContext.Provider>
    );
}