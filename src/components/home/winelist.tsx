import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Grid, Pagination, Typography } from "@mui/material";
import { useWinesInStockQuery } from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { openModalAction } from "../../store/slice/UI/slice";
import { WineInfo } from "./wine-info/wine-info";
import { setWineInStockActions } from "../../store/slice/vinoteca/slice";

// Obtener imagen
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

export const WineList = () => {
    const dispatch = useDispatch();

    // Datos filtrados
    const Filters = useSelector((state: any) => state.Vinoteca.WineInStock)

    const { rowsPerPage } = Filters

    const { data } = useWinesInStockQuery(Filters)
    const { wines, count } = data ? data.data : [];

    // Total de paginas
    const totalPages = Math.ceil(count / rowsPerPage);

    const handleWineOpen = (wine: any) => {
        const payload: any = {
            title: wine.name,
            component: WineInfo,
            args: wine
        }
        dispatch(openModalAction(payload))
    }

    // Cambiar de pagina
    const handleOnPageChange = (_e: any, value: any) => {
        const payload: any = {
            value: value,
            key: 'page'
        }
        dispatch(setWineInStockActions(payload))
    }

    return (
        <Box>
            <Container
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    height: '100vh',
                    width: '100vw',
                    pt: '150px',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    alignItems='stretch'
                >
                    {count >= 1 ?
                        wines.map((wine: any, index: number) => (
                            <Grid
                                size={{ xs: 12, md: 3, lg: 3 }}
                                key={index}
                                display='flex'
                            >
                                <Card
                                    sx={{
                                        height: 400,
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        "&:hover": {
                                            transform: "scale(1.03)",
                                            boxShadow: "0px 0px 10px 5px var(--vinoteca-palette-neutral-950)", // Resplandor dorado
                                        },
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    }}
                                >
                                    <CardActionArea
                                        sx={{ height: '100%' }}
                                        onClick={(_e) => handleWineOpen(wine)}
                                    >

                                        <CardMedia
                                            component="img"
                                            image={`${apiUrl}${wine.image}`}
                                            alt={wine?.name || "Vino"}
                                            sx={{
                                                height: 250,            // altura fija del contenedor
                                                width: "100%",          // ocupa todo el ancho del Card
                                                objectFit: "contain",   // muestra toda la imagen sin recortarla
                                                objectPosition: "center",
                                                backgroundColor: "#fff" // fondo blanco opcional para mejor visual
                                            }}
                                        />
                                        <CardContent
                                            sx={{ flexGrow: 1 }}
                                        >
                                            <Typography variant="h6" component="div" gutterBottom>
                                                {wine?.name || "Nombre no disponible"}
                                            </Typography>
                                            <Divider sx={{ my: 1, backgroundColor: "#b09a84" }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {wine?.description || "Descripción no disponible."}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )) : 'Por el momento no tenemos vinos'
                    }
                </Grid>
                <Box display="flex" justifyContent="center">
                    {totalPages > 0 &&
                        < Pagination
                            sx={{
                                mt: 5,
                                mb: 10
                            }}
                            color='primary'
                            count={totalPages}
                            onChange={handleOnPageChange}
                        />
                    }
                </Box>
            </Container>
        </Box>
    );
};
