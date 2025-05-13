import { Button, DialogActions, DialogContent, Typography } from "@mui/material";

export const WineInfo = (props: any) => {
    const { category, description, id, image, mark, name, price , sale, stock } = props.args.wine

    console.log(category)

    // Obtener imagen
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

    return (
        <>
            <DialogContent>
                <Typography>Categoria: {category}</Typography>
                <Typography>Descripcion: {description}</Typography>
                <Typography>Id: {id}</Typography>
                <img src={`${apiUrl}${image}`}/>
                <Typography>Marca: {mark}</Typography>
                <Typography>Nombre: {name}</Typography>
                <Typography>Precio: {price}</Typography>
                <Typography>Ventidos: {sale}</Typography>
                <Typography>Almacen: {stock}</Typography>


            </DialogContent>
            <DialogActions>
                <Button variant='contained'>
                    Botones de accion
                </Button>
            </DialogActions>
        </>
    )
}