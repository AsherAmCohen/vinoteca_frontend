import { createTheme, Shadows } from "@mui/material"

const defaultTheme = createTheme();

// @ts-ignore
const defaultShadows: Shadows = [
    'none',
    'var(--vinoteca-palette-baseShadows)',
    ...defaultTheme.shadows.slice(2)
]

export const shadows = defaultShadows