import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Typography } from "@mui/material";
import { useWinesQuery } from "../../store/api/api";
import { useSelector } from "react-redux";

export const WineList = () => {
    // Datos filtrados
    const Filters = useSelector((state: any) => state.Vinoteca.Wine)

    const { data } = useWinesQuery(Filters)
    const { wines, count } = data ? data.data : [];

    // Obtener imagen
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

    return (
        <Box
            sx={{
                width: "100%",
                backgroundImage: "url(/history.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                paddingTop: 4,
                paddingBottom: 0,
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                maxWidth="xl"
            >
                <Grid container spacing={2}>
                    {count >= 1 ?
                        wines.map((wine: any, index: number) => (
                            <Grid size={6}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        borderRadius: 3,
                                        boxShadow: 5,
                                        border: "2px solid #d4af37", // Borde dorado elegante
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            transform: "scale(1.03)",
                                            boxShadow: "0px 0px 10px 5px rgba(212, 175, 55, 0.6)", // Resplandor dorado
                                        },
                                    }}
                                    key={index}
                                >
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={`${apiUrl}${wine.image}`}
                                        alt={wine?.name || "Vino"}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {wine?.name || "Nombre no disponible"}
                                        </Typography>
                                        <Divider sx={{ my: 1, backgroundColor: "#b09a84" }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {wine?.description || "Descripción no disponible."}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )) : 'Por el momento no tenemos vinos'
                    }
                </Grid>
            </Container>

            {/* Franja negra debajo de todos los productos */}
            <Box
                sx={{
                    width: "100%",
                    height: "100px",
                    backgroundColor: "#000",
                    marginTop: 4,
                }}
            />
        </Box>
    );
};
