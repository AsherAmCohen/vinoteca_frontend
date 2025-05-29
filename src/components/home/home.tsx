import { Box, Container, Typography } from "@mui/material"
import { MyBox } from "../../styles/theme/components/my-box"

export const Home = () => {
    return (
        <Box>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <MyBox sx={{ backgroundImage: 'url(/home.jpg)' }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            zIndex: 'center'
                        }}
                    >
                        <img
                            src='/logo.png'
                            alt='Logo Vinoteca'
                            style={{
                                width: 'clamp(20rem, 2vw, 2rem)',
                                height: 'auto'
                            }}
                        />

                        <Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: 'clamp(4rem, 3vw, 2rem)',
                                    fontWeight: 'bold',
                                    fontFamily: '"Playfair Display", serif',
                                    color: 'white',
                                    textAlign: 'center',
                                    zIndex: 3,
                                    textShadow: '10px 10px 10px var(--vinoteca-palette-neutral-950)'
                                }}
                            >
                                VINOTECA
                            </Typography>
                        </Box>
                    </Box>
                </MyBox>
            </Container>
        </Box>
    )
}