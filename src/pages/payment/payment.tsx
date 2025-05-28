import { Box, Button, Divider, Typography } from "@mui/material"
import { useAuth } from "../../auth-context"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usePaymentShoppingCartMutation, useWinesShoppingCartQuery } from "../../store/api/api"
import { PaymentWine } from "../../components/payment/payment-wine"
import { formatEuro } from "../../components/home/shopping-cart-popover"
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom"
import { setShoppingCartId } from "../../store/slice/auth/slice"
import { ProtectedByPermission } from "../../components/protected-by-permission"

export const Payment = () => {
    const diapatch = useDispatch()

    // Navigate
    const navigate = useNavigate()

    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/SignIn')
        }
    }, [isAuthenticated])


    // Api
    const [PaymentShoppingCart] = usePaymentShoppingCartMutation()

    // Todos los vinos
    const [wines, setWines] = useState<[]>([])

    // Precio total del carrito
    const [priceShoppingCart, setPriceShoppingCart] = useState<number>(0)

    // Datos del carrito
    const shoppingCartId = useSelector((state: any) => state.Auth.shoppingCartId);
    const localCart = useSelector((state: any) => state.ShoppingCart);

    // Si el usuario esta autenticado, obtener los productos desde API
    const { data } = useWinesShoppingCartQuery(
        { shoppingCartId },
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
    const handlePayment = async () => {
        const paymentData = {
            shoppingCartId
        }

        const newCart = await PaymentShoppingCart(paymentData).unwrap()

        await diapatch(setShoppingCartId(newCart.data))

        navigate('/user/orders')
    }

    return (
        <ProtectedByPermission permission={['PAYMENT']}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh', // ⬅️ esto es clave para centrar verticalmente
                    p: 2, // padding opcional para que no quede pegado a los bordes en pantallas pequeñas
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

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <AttachMoney fontSize="small" />
                                <strong>Precio de todo el carrito</strong>{formatEuro(parseInt(totalPrice))}
                            </Box>

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
        </ProtectedByPermission>
    );
}