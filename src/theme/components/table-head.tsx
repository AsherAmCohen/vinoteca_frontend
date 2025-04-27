import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Theme } from '../../types/theme';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--Vinoteca-Background-Dark)',
        color: 'var(--Vinoteca-Background-Light)',
        lineHeight: 1,
      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];