import { alpha } from "@mui/material";
import { gray, vinoteca } from "./color-palette";

export const colorSchemes = {
    light: {
        palette: {
            primary: {
                main: vinoteca[100]
            },
            divider: alpha(gray[300], 0.4),
            background: {
                default: vinoteca[100],
                light: vinoteca[50]
            }
        }
    }
}