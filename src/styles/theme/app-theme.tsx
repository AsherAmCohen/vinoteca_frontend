import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { shape } from "./shape";
import { AppThemeProps } from "../../types/app-theme";
import { colorSchemes } from "./color-schemes";
import { components } from "./components/components";

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        highlighted: true;
    }
}

declare module '@mui/material/styles' {
    interface PaletteRange {
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
        950: string;
    }

    interface Palette {
        neutral: PaletteRange
    }

    interface PaletteOptions {
        neutral?: PaletteRange
    }

    interface TypeBackground {
        level1: string;
        level2: string;
        level3: string;
    }
}

export const AppTheme = (props: AppThemeProps) => {
    const { children } = props;

    const theme = createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'vinoteca'
        },
        breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
        colorSchemes,
        components,
        typography,
        shadows,
        shape
    })

    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}