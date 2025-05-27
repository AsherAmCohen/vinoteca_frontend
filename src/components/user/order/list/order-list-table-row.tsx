import { Avatar, AvatarGroup, IconButton, TableCell, TableRow } from "@mui/material"
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import { CaretUp as CaretUpIcon } from "@phosphor-icons/react";
import { useState } from "react";

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

    const { paymendAt, wines } = props

    return (
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
                <AvatarGroup>
                    {wines.map((wine: any) => (
                        <Avatar
                            alt={wine.wine.name}
                            src={`${apiUrl}${wine.wine.image}`}
                        />
                    ))}
                </AvatarGroup>
            </TableCell>
        </TableRow>
    )
}