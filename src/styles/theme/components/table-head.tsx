import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Theme } from '../../../types/theme';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--vinoteca-palette-neutral-950)',
        color: 'var(--vinoteca-palette-common-white)',
        lineHeight: 1,
      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];