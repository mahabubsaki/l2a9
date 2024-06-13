'use client';

import { PaletteMode, ThemeOptions } from "@mui/material";
import { green, red } from "@mui/material/colors";




const getTheme = (mode: PaletteMode) => {
    const lightTheme: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: green[500],
            },

        },

    };
    const darkTheme: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: red[500],
            },
        },
    };

    const commonTheme = mode === 'light' ? lightTheme : darkTheme;

    const modifeidTheme: ThemeOptions = {
        ...commonTheme,

    };

    return modifeidTheme;
};




export default getTheme;
