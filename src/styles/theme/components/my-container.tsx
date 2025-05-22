import { Stack, styled } from "@mui/material";

export const MyContainer = styled(Stack)(({theme}) => ({
    minHeight: '100dvh',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4)
    },
    justifyContent: 'center',
    alignItems: 'center',
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
    }
}))