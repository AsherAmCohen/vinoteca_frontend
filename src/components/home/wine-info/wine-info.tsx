import { Box, Chip, DialogActions, DialogContent, IconButton, Typography } from "@mui/material";
import { useAddShoppingCartMutation, useAmountProductQuery, useUpdateAmountProductMutation } from "../../../store/api/api";
import { useSelector } from "react-redux";
import { Plus as Add } from "@phosphor-icons/react";
import { Minus as Remove } from "@phosphor-icons/react";
import { ShoppingCart as ShoppingCartIcon } from "@phosphor-icons/react"

export const WineInfo = (props: any) => {
    const { category, description, id, image, mark, name, price, sale, stock } = props.args.wine

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
                <Typography>Categoria: {category}</Typography>
                <Typography>Descripcion: {description}</Typography>
                <Typography>Id: {id}</Typography>
                {/* <img src={`${apiUrl}${image}`} /> */}
                <Typography>Marca: {mark}</Typography>
                <Typography>Nombre: {name}</Typography>
                <Typography>Precio: {price}</Typography>
                <Typography>Ventidos: {sale}</Typography>
                <Typography>Almacen: {stock}</Typography>


            </DialogContent>
            <DialogActions>
                {amount < 1 ?
                    <Chip
                        variant="outlined"
                        clickable={false}
                        label={
                            <>
                                Agregar a carrito
                                <ShoppingCartIcon/>
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
    )
}