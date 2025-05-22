import type { Components } from '@mui/material/styles';
import { Theme } from '../../../types/theme';

export const MuiStack = { defaultProps: { useFlexGap: true } } satisfies Components<Theme>['MuiStack'];