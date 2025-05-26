import { Box, Button, Chip, Divider, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useAuth } from "../../auth-context";
import { useSelector } from "react-redux";
import { useWinesShoppingCartQuery } from "../../store/api/api";
import { useEffect, useState } from "react";
import { Plus as Add } from "@phosphor-icons/react";
import { Minus as Remove } from "@phosphor-icons/react";
import { TagSimple as LabelOutlined } from "@phosphor-icons/react";
import { Trademark as Business } from "@phosphor-icons/react"
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";

interface Props {
    anchorEl: Element | null;
    onClose: () => void;
    open: boolean
}
// Obtener imagen
const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

export const ShoppingCartPopover = (props: Props) => {
    // Abrir o cerrar el menu
    const { anchorEl, open, onClose } = props
    // Todos los vinos
    const [wines, setWines] = useState<any>([])
    // Precio total del carrito
    const [price, setPrice] = useState<any>(0)

    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth()

    // Datos del carrito
    const { shoppingCart } = useSelector((state: any) => state.Auth.user || {})

    // Si el usuario esta autenticado, obtener los productos desde API
    const { data } = useWinesShoppingCartQuery(
        { shoppingCartId: shoppingCart },
        { skip: !isAuthenticated }
    )

    // Si esta autenticado, actualiza los productos cuando llegue data
    useEffect(() => {
        if (isAuthenticated && data?.data != null) {
            setWines(data.data.wines)
            setPrice(data.data.total)
        }
    }, [isAuthenticated, data])

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
                    <Box
                        key={wine.id}
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
                                <img
                                    src={`${apiUrl}${wine.image}`}
                                    style={{ maxWidth: '200px', borderRadius: '8px' }}
                                    alt={wine.name}
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
                                            <TableCell>{wine.price}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <AttachMoney fontSize="small" />
                                                    <strong>Precio Total</strong>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{wine.totalPrice}</TableCell>
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
                                                // handleDeleteProduct();
                                            }}
                                            sx={{ p: 0.5, color: 'var(--vinoteca-palette-common-white)' }}
                                        >
                                            <Remove fontSize="small" />
                                        </IconButton>

                                        <span><strong>{wine.amount}</strong></span>

                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // handleAddProduct();
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
                ))
            }

            <Divider />

            <TableRow>
                <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoney fontSize="small" />
                        <strong>Precio de todo el carrito</strong>
                    </Box>
                </TableCell>
                <TableCell>{price}</TableCell>
            </TableRow>

            <Divider/>

            <Button
                variant='contained'
                fullWidth
            >
                Pagar
            </Button>

        </Popover >
    )
}