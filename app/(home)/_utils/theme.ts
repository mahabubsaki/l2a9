'use client';

import { PaletteMode, ThemeOptions } from "@mui/material";
import { amber, green, red } from "@mui/material/colors";

const getTheme = (mode: PaletteMode) => {
    const lightTheme: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: green[500],
            },
            secondary: {
                main: '#19857b',
            },
        },
    };
    const darkTheme: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: amber[500],
            },
            secondary: {
                main: red[400]
            },
        },
    };

    const commonTheme = mode === 'light' ? lightTheme : darkTheme;

    return commonTheme;
};




export default getTheme;
