import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

export const WineListTable = () => {
    return (
        <Card>
            <Box
                sx={{
                    overflowX: 'auto'
                }}
            >
                <Table
                    sx={{
                        minWidth: '800px'
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagen</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad almacen</TableCell>
                            <TableCell>Cantidad vendidos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
                Tabla de vinos
            </Box>
        </Card>
    )
}