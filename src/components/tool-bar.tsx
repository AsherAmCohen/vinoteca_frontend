import { AppBar, Box, Container, IconButton } from "@mui/material"
import { MyToolBar } from "../theme/components/my-tool-bar"
import { ScrollButton } from "./scroll-button"
import { ToolBarProps } from "../types/tool-bar"
import { UserCircle as UserCircleIcon } from "@phosphor-icons/react"

export const ToolBar = (props: ToolBarProps) => {
    const { homeRef, historyRef, winelistRef } = props;

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
                        
                        >
                            <UserCircleIcon/>
                        </IconButton>
                    </Box>
                </MyToolBar>
            </Container>
        </AppBar>
    )
}