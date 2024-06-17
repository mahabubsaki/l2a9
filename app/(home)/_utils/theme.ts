'use client';

import { alpha, getContrastRatio, PaletteMode, ThemeOptions } from "@mui/material";
import { green, purple, red, } from "@mui/material/colors";


const redBase = '#7F00FF';
const redMain = alpha(redBase, 0.7);



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
                main: purple[500],
            }
        },
    };

    const commonTheme = mode === 'light' ? lightTheme : darkTheme;

    const modifeidTheme: ThemeOptions = {
        ...commonTheme,
        components: {
            MuiLink: {
                defaultProps: {
                    color: 'inherit',
                    underline: 'none'
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                        {
                            display: 'none',
                        },
                        '& input[type=number]': {
                            MozAppearance: 'textfield',
                        },

                    }
                }
            }

        }
    };

    return modifeidTheme;
};




export default getTheme;
