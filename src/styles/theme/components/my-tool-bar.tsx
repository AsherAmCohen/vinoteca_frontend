import { styled } from "@mui/material";
import MuiToolbar from "@mui/material/Toolbar";

export const MyToolBar = styled(MuiToolbar)(({theme}) => ({
    display: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: 'var(--vinoteca-palette-neutral-950)',
    backgroundColor: 'var(--vinoteca-palette-neutral-950)',
    boxShadow: `0 0 10px 2px var(--vinoteca-palette-neutral-950)`,
    padding: '8px 12px'
}))