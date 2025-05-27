import { Avatar, Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Plus as Add } from "@phosphor-icons/react";
import { Minus as Remove } from "@phosphor-icons/react";
import { TagSimple as LabelOutlined } from "@phosphor-icons/react";
import { Trademark as Business } from "@phosphor-icons/react"
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";
import { useInfoWineQuery, useUpdateAmountProductMutation } from "../../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../auth-context";
import { formatEuro } from "../shopping-cart-popover";
import { useEffect, useState } from "react";
import { DeleteToCart, ToCart } from "../../../store/slice/shopping-cart/slice";

interface Props {
    id: any;
    amount: number;
    setPriceShoppingCart: any;
}

// Obtener imagen
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

export const ShoppingCartWine = (props: Props) => {
    const dispatch = useDispatch()

    const { id, amount, setPriceShoppingCart } = props;

    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth();

    // Información del carrito y del vino
    const shoppingCartId = useSelector((state: any) => state.Auth.shoppingCartId);
    const localCart = useSelector((state: any) => state.ShoppingCart);

    // Cantidad de producto agregado al carrito
    const [amountShopping, setAmountShopping] = useState<number>(amount)

    // Objeto para RTK Query solo si está autenticado
    const dataWine = isAuthenticated
        ? {
            wineId: id,
            shoppingCartId,
            amount: 0,
        }
        : null;


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
    },  [amount, id, isAuthenticated, localCart])

    const [updateAmount] = useUpdateAmountProductMutation()

    // Agregar productos al carrito
    const handleAddProduct = () => {
        if (amountShopping >= wine.stock) return; // evitar que sobrepase el stock

        if (isAuthenticated) {
            const newAmount = amountShopping + 1;
            setAmountShopping(newAmount);
            updateAmount({ ...dataWine, amount: newAmount });
        } else {
            // Redux local: incrementar cantidad
            dispatch(ToCart({ id, amount: 1 }));
            setAmountShopping(prev => prev + 1);
        }
    };

    // Eliminar producto
    const handleDeleteProduct = () => {
        const newAmount = amountShopping - 1;

        // Si el nuevo valor es 0 o menor, elimina el producto
        if (newAmount <= 0) {
            if (isAuthenticated) {
                updateAmount({ ...dataWine, amount: 0 });
            } else {
                dispatch(DeleteToCart(id));
            }
            setAmountShopping(0);
            return;
        }

        // Si sigue siendo mayor a 0, solo actualiza la cantidad
        if (isAuthenticated) {
            updateAmount({ ...dataWine, amount: newAmount });
        } else {
            dispatch(ToCart({ id, amount: -1 }));
        }

        setAmountShopping(newAmount);
    }

    // Actualizar precio total en el componente padre
    useEffect(() => {
        if (wine?.id) {
            setPriceShoppingCart((prev: any) => ({
                ...prev,
                [wine.id]: wine.totalPrice, // Actualizamos el precio total
            }));
        }
    }, [wine, amount]);

    return (
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

            {/* Botón alineado a la derecha, debajo del contenido */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Chip
                    variant="outlined"
                    label={
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation(); // para evitar cerrar el chip si se hace clic
                                    handleDeleteProduct();
                                }}
                                sx={{ p: 0.5, color: 'var(--vinoteca-palette-common-white)' }}
                            >
                                <Remove fontSize="small" />
                            </IconButton>

                            <span><strong>{amountShopping}</strong></span>

                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddProduct();
                                }}
                                sx={{ p: 0.5, color: 'var(--vinoteca-palette-common-white)' }}
                            >
                                <Add fontSize="small" />
                            </IconButton>
                        </Box>
                    }
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        '.MuiChip-label': { display: 'flex', alignItems: 'center', gap: 1 },
                        background: 'var(--vinoteca-palette-neutral-950)',
                        color: 'var(--vinoteca-palette-common-white)'
                    }}
                />
            </Box>
        </Box>
    )
}