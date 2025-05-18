import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import { SideNav } from "../../components/user/side-nav"
import { MainNav } from "../../components/user/main-nav"
import baseTheme from "../../styles/theme/color-schemes"
import { components } from "../../styles/theme/components/components"
import '../../styles/global.css'

export const User = () => {
    const localTheme = createTheme({
        components,
        typography: {
            fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
            body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.57 },
            button: { fontWeight: 500 },
            caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.66 },
            subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.57 },
            subtitle2: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.57 },
            overline: {
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.5px',
                lineHeight: 2.5,
                textTransform: 'uppercase',
            },
            h1: { fontSize: '3.5rem', fontWeight: 500, lineHeight: 1.2 },
            h2: { fontSize: '3rem', fontWeight: 500, lineHeight: 1.2 },
            h3: { fontSize: '2.25rem', fontWeight: 500, lineHeight: 1.2 },
            h4: { fontSize: '2rem', fontWeight: 500, lineHeight: 1.2 },
            h5: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2 },
            h6: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.2 },
        },
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
                            <Outlet />
                        </Container>
                    </main>
                </Box>
            </Box>
        </ThemeProvider>
    )
}