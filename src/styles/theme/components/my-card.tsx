import { Card, styled } from "@mui/material";

export const MyCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px'
    },
    boxShadow:
        'var(--Vinoteca-Background-Light) 0px 5px 15px 0px, var(--Vinoteca-Background-Light) 0px 15px 35px -5px'
}))