import { Avatar, Box, Button, Card, Divider, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useWinesQuery } from "../../../../store/api/api"

export const WineListTable = () => {
    const { data } = useWinesQuery({})
    const wines = data ? data.data : []
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

    const noop = () => {
        console.log('Cambio de pagina')
    }

    console.log(wines)
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
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad almacenados</TableCell>
                            <TableCell>Cantidad vendidos</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            wines.map((wine: any) => (
                                <TableRow hover key={wine.id}>
                                    <TableCell>
                                        <Stack
                                            sx={{ alignItems: 'center' }}
                                            direction='row'
                                            spacing={2}
                                        >
                                            <Avatar src={`${apiUrl}${wine.image}`} />
                                            <Typography variant='subtitle2'>{wine.name}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2'>{wine.mark}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2'>{wine.description}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2'>{wine.price}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2'>{wine.stock}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2'>{wine.sale}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='contained'>
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component='div'
                count={10}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                page={0}
                rowsPerPage={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage='Elementos por pagina'
            />
        </Card>
    )
}