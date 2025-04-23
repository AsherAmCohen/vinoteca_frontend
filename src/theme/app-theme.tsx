import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppThemeProps } from "../types/app-theme";
import { colorSchemes } from "./color-schemes";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { shape } from "./shape";

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        highlighted: true;
    }
}
declare module '@mui/material/styles' {
    interface ColorRange {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    }

    interface PaletteColor extends ColorRange { }

    interface Palette {
        baseShadow: string;
    }
}

export const AppTheme = (props: AppThemeProps) => {
    const { children } = props;

    const theme = createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'vinoteca'
        },
        colorSchemes,
        typography,
        shadows,
        shape
    })

    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}