import { Avatar, Box, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import { useInfoWineQuery } from "../../store/api/api";
import {  useSelector } from "react-redux";
import { useAuth } from "../../auth-context";
import { formatEuro } from "../home/shopping-cart-popover";
import { TagSimple as LabelOutlined } from "@phosphor-icons/react";
import { Trademark as Business } from "@phosphor-icons/react"
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";
import { Hash as HashIcon } from "@phosphor-icons/react";
// Obtener imagen
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

interface Props {
    id: any;
    amount: number;
    setPriceShoppingCart: any;
}

export const PaymentWine = (props: Props) => {

    const { id, amount, setPriceShoppingCart } = props;

    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth();

    // Información del carrito y del vino
    const localCart = useSelector((state: any) => state.ShoppingCart);

    // Cantidad de producto agregado al carrito
    const [amountShopping, setAmountShopping] = useState<number>(amount)

    // Api
    const { data } = useInfoWineQuery({ id: id, amount: amountShopping })
    const wine = data ? data.data : []

    // Sincronizar cantidad con query
    useEffect(() => {
        if (isAuthenticated && data) {
            setAmountShopping(amount)
        }

        if (!isAuthenticated) {
            const localWine = localCart.wines.find((wine: any) => wine.id === id);
            setAmountShopping(localWine ? localWine.amount : 0);
        }
    }, [amount, id, isAuthenticated, localCart])

    // Actualizar precio total en el componente padre
    useEffect(() => {
        if (wine?.id) {
            setPriceShoppingCart((prev: any) => ({
                ...prev,
                [wine.id]: wine.totalPrice, // Actualizamos el precio total
            }));
        }
    }, [wine, amount])
    
    return (
        <Card
            sx={{ width: '100%' }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: 2,
                        borderBottom: '1px solid #ccc',
                    }}
                >
                    {/* Contenido principal: imagen + tabla */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'center', sm: 'flex-start' },
                            gap: 3,
                        }}
                    >
                        <Box sx={{ flexShrink: 0 }}>
                            <Avatar
                                src={`${apiUrl}${wine.image}`}
                                alt={wine.name}
                                sx={{ width: 100, height: 100 }}
                            />
                        </Box>

                        <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
                            <Table size='small'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LabelOutlined fontSize="small" />
                                                <strong>Nombre</strong>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{wine.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Business fontSize="small" />
                                                <strong>Marca</strong>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{wine.mark}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AttachMoney fontSize="small" />
                                                <strong>Precio</strong>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{formatEuro(wine.price)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <HashIcon fontSize="small" />
                                                <strong>Cantidad</strong>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{amount}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AttachMoney fontSize="small" />
                                                <strong>Precio Total</strong>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{formatEuro(wine.totalPrice)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}