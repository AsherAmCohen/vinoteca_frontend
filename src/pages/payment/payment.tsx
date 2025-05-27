import { Box, Button, Divider, TableCell, TableRow, Typography } from "@mui/material"
import { useAuth } from "../../auth-context"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { usePaymentShoppingCartMutation, useWinesShoppingCartQuery } from "../../store/api/api"
import { PaymentWine } from "../../components/payment/payment-wine"
import { formatEuro } from "../../components/home/shopping-cart-popover"
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";

export const Payment = () => {
    // Api
    const [PaymentShoppingCart] = usePaymentShoppingCartMutation()

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

    // Realizar el pago
    const handlePayment = () => {
        const paymentData = {
            shoppingCart: shoppingCart
        }

        PaymentShoppingCart(paymentData)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',  // centra vertical y horizontalmente
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column', // ✅ una columna: un elemento por fila
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography variant="h4">Pagar productos</Typography>

                {wines.map((wine: any) => (
                    <PaymentWine
                        key={wine.id}
                        id={wine.id}
                        amount={wine.amount}
                        setPriceShoppingCart={setPriceShoppingCart}
                    />
                ))}

                {totalPrice > 0 ?
                    <Box
                        sx={{ mb: 10 }}
                    >
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
                            onClick={handlePayment}
                        >
                            Pagar
                        </Button>
                    </Box> :
                    <Box sx={{ p: '16px 20px' }}>
                        <Typography variant='subtitle2'>No hay vinos agregados</Typography>
                    </Box>
                }
            </Box>
        </Box>
    );
}