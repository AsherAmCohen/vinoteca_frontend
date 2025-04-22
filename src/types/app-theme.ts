import { ThemeOptions } from "@mui/material";
import { ReactNode } from "react";

export interface AppThemeProps {
    children: ReactNode;
    themeComponents?: ThemeOptions['components']
}