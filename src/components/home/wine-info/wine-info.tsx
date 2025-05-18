import {
    Box,
    DialogActions,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Chip,
    IconButton
} from "@mui/material";

import { TagSimple as LabelOutlined } from "@phosphor-icons/react";
import { Trademark as Business } from "@phosphor-icons/react"
import { Tag as Category } from "@phosphor-icons/react"
import { Article as Description } from "@phosphor-icons/react";
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";
import { StackOverflowLogo as Inventory } from "@phosphor-icons/react";
import { ShoppingCart as Repeat } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { useAddShoppingCartMutation, useAmountProductQuery, useUpdateAmountProductMutation } from "../../../store/api/api";
import { Plus as Add } from "@phosphor-icons/react";
import { Minus as Remove } from "@phosphor-icons/react";

export const WineInfo = (props: any) => {
    const { category, description, id, image, mark, name, price, sale, stock } = props.args.wine;

    // Obtener imagen
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

    // Obtener el ID del carrito
    const { shoppingCart } = useSelector((state: any) => state.Auth.user)

    // Obtener cantidad del producto si ya esta agregado al carrito
    const dataWine = {
        wineId: id,
        shoppingCartId: shoppingCart,
        amount: 0
    }

    const { data } = useAmountProductQuery(dataWine)
    const amount = data ? data.data : 0

    const [addWine] = useAddShoppingCartMutation();
    const [updateAmount] = useUpdateAmountProductMutation();

    const handleAddShoppingCart = () => {
        addWine(dataWine)
    }

    const handleAddProduct = () => {
        dataWine.amount = amount + 1
        updateAmount(dataWine)
    }

    const handleDeleteProdudct = () => {
        dataWine.amount = amount - 1
        updateAmount(dataWine)
    }


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
                                    <TableCell>{mark}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Category fontSize="small" />
                                            <strong>Categoría</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{category}</TableCell>
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
                                    <TableCell>${price}</TableCell>
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
                {amount < 1 ?
                    <Chip
                        variant="outlined"
                        clickable={false}
                        label={
                            <>
                                Agregar a carrito
                                <Repeat/>
                            </>
                        }
                        onClick={handleAddShoppingCart}
                        sx={{
                            cursor: 'pointer',
                            px: 1.5,
                            py: 0.5,
                            '.MuiChip-label': { display: 'flex', alignItems: 'center', gap: 1 },
                            background: 'var(--Vinoteca-Background-Dark)',
                            color: 'var(--Vinoteca-Background-Light)',
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
                                        handleDeleteProdudct();
                                    }}
                                    sx={{ p: 0.5, color: 'var(--Vinoteca-Background-Light)' }}
                                >
                                    <Remove fontSize="small" />
                                </IconButton>

                                <span><strong>{amount}</strong></span>

                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddProduct();
                                    }}
                                    sx={{ p: 0.5, color: 'var(--Vinoteca-Background-Light)' }}
                                >
                                    <Add fontSize="small" />
                                </IconButton>
                            </Box>
                        }
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            '.MuiChip-label': { display: 'flex', alignItems: 'center', gap: 1 },
                            background: 'var(--Vinoteca-Background-Dark)',
                            color: 'var(--Vinoteca-Background-Light)'
                        }}
                    />
                }
            </DialogActions>
        </>
    );
};
