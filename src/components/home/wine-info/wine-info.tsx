import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@mui/material";

import { TagSimple as LabelOutlined } from "@phosphor-icons/react";
import { Trademark as Business } from "@phosphor-icons/react"
import { Tag as Category } from "@phosphor-icons/react"
import { Article as Description } from "@phosphor-icons/react";
import { CurrencyDollar as AttachMoney } from "@phosphor-icons/react";
import { StackOverflowLogo as Inventory } from "@phosphor-icons/react";
import { Info as Info } from "@phosphor-icons/react";
import { ShoppingCart as Repeat } from "@phosphor-icons/react";

export const WineInfo = (props: any) => {
    const { category, description, id, image, mark, name, price, sale, stock } = props.args.wine;

    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

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
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Info fontSize="small" />
                                            <strong>ID</strong>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{id}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={() => console.log("Botón de acción")}>
                    Acción
                </Button>
            </DialogActions>
        </>
    );
};
