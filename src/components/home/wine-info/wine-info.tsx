import { Avatar, Box, Button, Card, DialogActions, DialogContent, Divider, Stack, Typography } from "@mui/material";
import { useWinesQuery } from "../../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setWineActions } from "../../../store/slice/vinoteca/slice";
import { useEffect } from "react";

export const WineInfo = (props: any) => {
    const { category, description, id, image, mark, name, price , sale, stock } = props.args.wine;

    const dispatch = useDispatch();
    const Filters = useSelector((state: any) => state.Vinoteca.Wine);
    const { page, rowsPerPage } = Filters;

    const { data } = useWinesQuery(Filters);
    const { wines, count } = data ? data.data : [];

    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

    const handleOnRowsPerPageChange = (value: string) => {
        dispatch(setWineActions({ value, key: 'rowsPerPage' }));
    };

    const handleOnPageChange = (_e: any, value: any) => {
        dispatch(setWineActions({ value, key: 'page' }));
    };

    useEffect(() => {
        dispatch(setWineActions({ value: 0, key: 'page' }));
    }, [rowsPerPage]);

    return (
        <>
            <DialogContent>
                <Typography variant="h6">Información del Vino</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={`${apiUrl}${image}`} alt={name} style={{ maxWidth: '200px', marginBottom: '16px' }} />
                    <Typography variant="body1"><strong>Nombre:</strong> {name}</Typography>
                    <Typography variant="body1"><strong>Marca:</strong> {mark}</Typography>
                    <Typography variant="body1"><strong>Categoría:</strong> {category}</Typography>
                    <Typography variant="body1"><strong>Descripción:</strong> {description}</Typography>
                    <Typography variant="body1"><strong>Precio:</strong> ${price}</Typography>
                    <Typography variant="body1"><strong>Vendidos:</strong> {sale}</Typography>
                    <Typography variant="body1"><strong>Stock:</strong> {stock}</Typography>
                    <Typography variant="body1"><strong>ID:</strong> {id}</Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={() => console.log("Botón de acción")}>
                    Acción
                </Button>
            </DialogActions>
        </>
    );
};
