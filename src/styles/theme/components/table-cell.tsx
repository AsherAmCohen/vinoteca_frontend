import type { Components } from '@mui/material/styles';

import { Theme } from '../../../types/theme';

export const MuiTableCell = {
  styleOverrides: {
    root: { borderBottom: 'var(--TableCell-borderWidth, 1px) solid var(--Vinoteca-Divider)' },
    paddingCheckbox: { padding: '0 0 0 24px' },
  },
} satisfies Components<Theme>['MuiTableCell'];