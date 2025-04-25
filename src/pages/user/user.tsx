import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import { SideNav } from "../../components/user/side-nav"
import { MainNav } from "../../components/user/main-nav"
import baseTheme from "../../theme/color-schemes"

export const User = () => {
    const localTheme = createTheme({
        palette: {
            primary: {
                ...baseTheme.light.palette.primary
            },
            background: {
                default: 'var(--Vinoteca-Background-Light)'
            }
        }
    })

    return (
        <ThemeProvider theme={localTheme}>
            <CssBaseline />
            <Box
                sx={{
                    bgcolor: 'var(--Vinoteca-Background-Light)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minHeight: '100%'
                }}
            >
                <SideNav />
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        pl: {
                            lg: 'var(--Vinoteca-SideNav-width)'
                        }
                    }}
                >
                    <MainNav />
                    <main>
                        <Container
                            maxWidth='xl'
                            sx={{
                                py: '64px'
                            }}
                        >
                            <Outlet/>
                        </Container>
                    </main>
                </Box>
            </Box>
        </ThemeProvider>
    )
}