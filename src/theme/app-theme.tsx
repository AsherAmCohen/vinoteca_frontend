import { createTheme, ThemeProvider } from "@mui/material";
import { AppThemeProps } from "../types/app-theme";
import { colorSchemes } from "./color-schemes";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { shape } from "./shape";

export const AppTheme = (props: AppThemeProps) => {
    const {children} = props;

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
            {children}
        </ThemeProvider>
    )
}