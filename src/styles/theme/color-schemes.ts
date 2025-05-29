import type { ColorSystemOptions } from '@mui/material/styles';

import { california, kepple, neonBlue, nevada, redOrange, shakespeare, stormGrey } from './color-palette';
import type { ColorScheme } from '../../types/theme';

export const colorSchemes = {
    light: {
        palette: {
            action: { disabledBackground: 'rgba(0, 0, 0, 0.06)' },
            background: {
                default: 'var(--vinoteca-palette-common-white)',
                defaultChannel: '255 255 255',
                paper: 'var(--vinoteca-palette-common-white)',
                paperChannel: '255 255 255',
                level1: 'var(--vinoteca-palette-neutral-50)',
                level2: 'var(--vinoteca-palette-neutral-100)',
                level3: 'var(--vinoteca-palette-neutral-200)',
            },
            common: { black: '#000000', white: '#ffffff' },
            divider: 'var(--vinoteca-palette-neutral-200)',
            dividerChannel: '220 223 228',
            error: {
                ...redOrange,
                light: redOrange[400],
                main: redOrange[700],
                dark: redOrange[600],
                contrastText: 'var(--vinoteca-palette-common-white)',
            },
            info: {
                ...shakespeare,
                light: shakespeare[400],
                main: shakespeare[500],
                dark: shakespeare[600],
                contrastText: 'var(--vinoteca-palette-common-white)',
            },
            neutral: { ...stormGrey },
            primary: {
                ...neonBlue,
                light: neonBlue[400],
                main: stormGrey[950],
                dark: stormGrey[600],
                contrastText: 'var(--vinoteca-palette-common-white)',
            },
            secondary: {
                ...nevada,
                light: nevada[600],
                main: nevada[700],
                dark: nevada[800],
                contrastText: 'var(--vinoteca-palette-common-white)',
            },
            success: {
                ...kepple,
                light: kepple[400],
                main: kepple[500],
                dark: kepple[600],
                contrastText: 'var(--vinoteca-palette-common-white)',
            },
            text: {
                primary: 'var(--vinoteca-palette-neutral-900)',
                primaryChannel: '33 38 54',
                secondary: 'var(--vinoteca-palette-neutral-500)',
                secondaryChannel: '102 112 133',
                disabled: 'var(--vinoteca-palette-neutral-400)',
            },
            warning: {
                ...california,
                light: california[400],
                main: california[500],
                dark: california[600],
                contrastText: 'var(--vinoteca-palette-common-white)',
            },
        },
    },
} satisfies Partial<Record<ColorScheme, ColorSystemOptions>>;
