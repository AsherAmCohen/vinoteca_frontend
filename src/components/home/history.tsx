import { Box, Container, Grid, Typography } from "@mui/material"
import { MyBox } from "../../styles/theme/components/my-box"

export const History = () => {
    return (
        <Box>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <MyBox
                    sx={{
                        backgroundImage: 'url(/history.jpg)',
                        height: '50vh'
                    }}
                />
                <Grid
                    container
                    direction='row'
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '50vh',
                        width: '90vw'
                    }}
                >
                    <Grid size={{ xs: 12, sm: 12, md: 4 }} textAlign='center'>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(5rem, 2vw, 2rem)',
                                textAlign: 'center'
                            }}
                        >
                            Nuestra Historia
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 7 }} textAlign='center'>
                        <Box display='flex' justifyContent='center'>
                            <Typography
                                variant='h2'
                                sx={{
                                    textAlign: 'left',
                                    fontSize: 'clamp(1rem, 2vw, 2rem)'
                                }}
                            >
                                En una región vinícola, una bodega centenaria fue fundada por
                                una familia apasionada por la viticultura, comenzando con pocas
                                hectáreas y el sueño de crear vinos que reflejaran la tierra. Con el
                                tiempo, perfeccionaron sus técnicas, combinando métodos
                                tradicionales y modernos, y expandieron su producción. Hoy, sus
                                vinos son reconocidos por su calidad y carácter único, fruto de la
                                dedicación familiar a lo largo de generaciones.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}