import { AppBar, Box, Container, IconButton } from "@mui/material"
import { MyToolBar } from "../theme/components/my-tool-bar"
import { ScrollButton } from "./scroll-button"
import { ToolBarProps } from "../types/tool-bar"
import { UserCircle as UserCircleIcon } from "@phosphor-icons/react"
import { ShoppingCart as ShoppingCartIcon } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"

export const ToolBar = (props: ToolBarProps) => {
    const { homeRef, historyRef, winelistRef } = props;
    const navigate = useNavigate()

    const handleUser = () => {
        navigate('/SignIn')
    }

    return (
        <AppBar
            position='fixed'
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--vinoteca-frame-height, 0px) + 28px)'
            }}
        >
            <Container maxWidth='lg'>
                <MyToolBar variant='dense' disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            px: 0
                        }}
                    >
                        <Box
                            sx={{ mr: 1 }}
                        >
                            <img
                                src="/logo.png"
                                width='50wv'
                                style={{
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'flex'
                                }
                            }}
                        >
                            <ScrollButton
                                label='Inicio'
                                section={homeRef}
                            />

                            <ScrollButton
                                label='Historia'
                                section={historyRef}
                            />

                            <ScrollButton
                                label='Vinos'
                                section={winelistRef}
                            />
                        </Box>
                    </Box>

                    <Box>
                        <IconButton
                            sx={{
                                color: 'var(--Vinoteca-Background-Light)',
                                '&:hover': {
                                    color: 'var(--Vinoteca-Background-Dark)',
                                    background: 'var(--Vinoteca-Background-Light)'
                                }
                            }}
                            onClick={handleUser}
                        >
                            <UserCircleIcon/>
                        </IconButton>

                        <IconButton
                            sx={{
                                color: 'var(--Vinoteca-Background-Light)',
                                '&:hover': {
                                    color: 'var(--Vinoteca-Background-Dark)',
                                    background: 'var(--Vinoteca-Background-Light)'
                                }
                            }}
                        >
                            <ShoppingCartIcon/>
                        </IconButton>
                    </Box>
                </MyToolBar>
            </Container>
        </AppBar>
    )
}