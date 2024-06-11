'use client';

import { PaletteMode, ThemeOptions } from "@mui/material";
import { amber, blue, green, red } from "@mui/material/colors";

const getTheme = (mode: PaletteMode) => {
    const lightTheme: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: green[500],
            },

        },
        // components: {
        //     MuiBadge: {
        //         defaultProps: {
        //             color: 'secondary',


        //         }
        //     }
        // }
    };
    const darkTheme: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: red[500],
            },
        },
        // components: {
        //     MuiBadge: {
        //         defaultProps: {
        //             color: 'secondary',


        //         }
        //     }
        // }
    };

    const commonTheme = mode === 'light' ? lightTheme : darkTheme;

    return commonTheme;
};




export default getTheme;
