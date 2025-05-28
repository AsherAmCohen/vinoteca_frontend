import { Box, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Chip, IconButton } from "@mui/material";
import { TagSimple as LabelOutlined } from "@phosphor-icons/react";
import { Trademark as Business } from "@phosphor-icons/react"
import { Tag as Category } from "@phosphor-icons/react"
import { Article as Description } from "@phosphor-icons/react";
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";
import { StackOverflowLogo as Inventory } from "@phosphor-icons/react";
import { ShoppingCart as Repeat } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { useAmountProductQuery, useUpdateAmountProductMutation } from "../../../store/api/api";
import { Plus as Add } from "@phosphor-icons/react";
import { Minus as Remove } from "@phosphor-icons/react";
import { useAuth } from "../../../auth-context";
import { useEffect, useState } from "react";
import { DeleteToCart, ToCart } from "../../../store/slice/shopping-cart/slice";

// Obtener imagen
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

export const WineInfo = (props: any) => {
    const dispatch = useDispatch()
    const { category, description, id, image, mark, name, price, sale, stock } = props.args;

    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth();

    const shoppingCartId = useSelector((state: any) => state.Auth.shoppingCartId);
    
    const localCart = useSelector((state: any) => state.ShoppingCart);

    // Cantidad del producto agregado al carrito
    const [amountShopping, setAmountShopping] = useState<number>(0)

    // Objeto para RTK Query solo si está autenticado
    const dataWine = isAuthenticated
        ? {
            wineId: id,
            shoppingCartId,
            amount: 0,
        }
        : null;

    const { data } = useAmountProductQuery(dataWine!, {
        skip: !isAuthenticated || !shoppingCartId,
    });

    // Sincronizar cantidad con query
    useEffect(() => {
        if (isAuthenticated && data) {
            setAmountShopping(data.data);
        }

        if (!isAuthenticated) {
            const localWine = localCart.wines.find((wine: any) => wine.id === id);
            setAmountShopping(localWine ? localWine.amount : 0);
        }
    }, [data, isAuthenticated, localCart]);

    const [updateAmount] = useUpdateAmountProductMutation();

    // Agregar productos al carrito
    const handleAddProduct = () => {
        if (amountShopping >= stock) return; // evitar que sobrepase el stock

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
    };

    return (
        <>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        gap: 3
                    }}
                >
                    {/* Imagen */}
                    <Box sx={{ flexShrink: 0 }}>
                        <img
                            src={`${apiUrl}${image}`}
                            alt={name}
                            style={{ maxWidth: '200px', borderRadius: '8px' }}
                        />
                    </Box>

                    {/* Tabla */}
                    <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LabelOutlined fontSize="small" />
                                            <strong>Nombre</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Business fontSize="small" />
                                            <strong>Marca</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{mark.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Category fontSize="small" />
                                            <strong>Categoría</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Description fontSize="small" />
                                            <strong>Descripción</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AttachMoney fontSize="small" />
                                            <strong>Precio</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Repeat fontSize="small" />
                                            <strong>Vendidos</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{sale}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Inventory fontSize="small" />
                                            <strong>Stock</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{stock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>

            <DialogActions>
                {amountShopping < 1 ?
                    <Chip
                        variant="outlined"
                        clickable={false}
                        label={
                            <>
                                Agregar a carrito
                                <Repeat />
                            </>
                        }
                        onClick={handleAddProduct}
                        sx={{
                            cursor: 'pointer',
                            px: 1.5,
                            py: 0.5,
                            '.MuiChip-label': { display: 'flex', alignItems: 'center', gap: 1 },
                            background: 'var(--vinoteca-palette-neutral-950)',
                            color: 'var(--vinoteca-palette-common-white)',
                        }}
                    />
                    :
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
                }
            </DialogActions>
        </>
    );
};
