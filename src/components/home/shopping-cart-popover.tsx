import { Box, Button, Divider, Popover, TableCell, TableRow, Typography } from "@mui/material"
import { useAuth } from "../../auth-context";
import { useSelector } from "react-redux";
import { useWinesShoppingCartQuery } from "../../store/api/api";
import { useEffect, useState } from "react";
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";
import { ShoppingCartWine } from "./shopping-cart/shopping-cart-wine";

interface Props {
    anchorEl: Element | null;
    onClose: () => void;
    open: boolean
}

export const formatEuro = (value: any) => {
    const num = parseInt(value)
    return '€' + num
        .toFixed(2)                 // "1234.56"
        .replace('.', ',')         // "1234,56"
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // "1.234,56"
}

export const ShoppingCartPopover = (props: Props) => {
    // Abrir o cerrar el menu
    const { anchorEl, open, onClose } = props

    // Todos los vinos
    const [wines, setWines] = useState<[]>([])

    // Precio total del carrito
    const [priceShoppingCart, setPriceShoppingCart] = useState<number>(0)

    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth()

    // Datos del carrito
    const { shoppingCart } = useSelector((state: any) => state.Auth.user || {})
    const localCart = useSelector((state: any) => state.ShoppingCart);

    // Si el usuario esta autenticado, obtener los productos desde API
    const { data } = useWinesShoppingCartQuery(
        { shoppingCartId: shoppingCart },
        { skip: !isAuthenticated }
    )

    // Si esta autenticado, actualiza los productos cuando llegue data
    useEffect(() => {
        if (isAuthenticated && data) {
            setWines(data.data)
        }

        if (!isAuthenticated) {
            setWines(localCart.wines)
        }
    }, [isAuthenticated, data, localCart])

    // Calcular total
    const totalPrice = wines.length ? Object.values(priceShoppingCart).reduce((acc, price) => acc + price, 0) : 0;

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            open={open}
            onClose={onClose}
            slotProps={{ paper: { sx: { width: 'auto' } } }}
        >
            <Box sx={{ p: '16px 20px' }}>
                <Typography variant='subtitle2'>Carrito de Compras</Typography>
            </Box>
            <Divider />

            {
                wines.map((wine: any) => (
                    <ShoppingCartWine
                        key={wine.id}
                        id={wine.id}
                        amount={wine.amount}
                        setPriceShoppingCart={setPriceShoppingCart}
                    />
                ))
            }

            {totalPrice > 0 ?
                <>
                    <Divider />

                    <TableRow>
                        <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AttachMoney fontSize="small" />
                                <strong>Precio de todo el carrito</strong>
                            </Box>
                        </TableCell>
                        <TableCell>{formatEuro(parseInt(totalPrice))}</TableCell>
                    </TableRow>

                    <Divider />

                    <Button
                        variant='contained'
                        fullWidth
                    >
                        Pagar
                    </Button>
                </> :
                <Box sx={{ p: '16px 20px' }}>
                    <Typography variant='subtitle2'>No hay vinos agregados</Typography>
                </Box>
            }

        </Popover >
    )
}