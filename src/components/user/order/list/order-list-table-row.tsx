import { Avatar, AvatarGroup, Box, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import { CaretUp as CaretUpIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { formatEuro } from "../../../home/shopping-cart-popover";

// Obtener imagen
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

const fechaLegible = (date: string) => {
    const fecha = new Date(date);

    // Usamos `toLocaleString` para mostrar la fecha de manera legible
    const fechaLegible = fecha.toLocaleString('es-ES', {
        weekday: 'long', // Día de la semana (ejemplo: "martes")
        year: 'numeric',
        month: 'long',  // Mes (ejemplo: "mayo")
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,  // 24 horas
    });

    return fechaLegible
}

interface Props {
    paymendAt: string
    wines: any
}

export const OrderListTableRow = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const { paymendAt, wines }: any = props

    const totalAmount = wines.reduce((acc: number, item: any) => acc + item.amount, 0)

    const totalPrice = wines.reduce((acc: number, item: any) => {
        const price = parseFloat(item.wine.price)
        return acc + price * item.amount;
    }, 0)

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <CaretUpIcon /> : <CaretDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {fechaLegible(paymendAt)}
                </TableCell>
                <TableCell align='center'>
                    <AvatarGroup max={5}>
                        {wines.map((wine: any) => (
                            <Avatar
                                alt={wine.wine.name}
                                src={`${apiUrl}${wine.wine.image}`}
                            />
                        ))}
                    </AvatarGroup>
                </TableCell>
                <TableCell>
                    {totalAmount}
                </TableCell>
                <TableCell>
                    {formatEuro(totalPrice)}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component='div'>
                                Productos
                            </Typography>
                            <Table aria-label="vinos" size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Marca</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell>Cantidad comprado</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {wines.map((wine: any) => (
                                        <TableRow key={wine.wine.id}>
                                            <TableCell>
                                                <Stack
                                                    sx={{ alignItems: 'center' }}
                                                    direction='row'
                                                    spacing={2}
                                                >
                                                    <Avatar 
                                                        src={`${apiUrl}${wine.wine.image}`}
                                                    />
                                                    <Typography variant='subtitle2'>
                                                        {wine.wine.name}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                {wine.wine.Mark.name}
                                            </TableCell>
                                            <TableCell>
                                                {formatEuro(wine.wine.price)}
                                            </TableCell>
                                            <TableCell>
                                                {wine.amount}
                                            </TableCell>
                                            <TableCell>
                                                {formatEuro(wine.amount * wine.wine.price)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}