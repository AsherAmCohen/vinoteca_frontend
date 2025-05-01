import { Avatar, Box, Button, Card, Divider, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useWinesQuery } from "../../../../store/api/api"
import { useDispatch, useSelector } from "react-redux"
import { setWineActions } from "../../../../store/slice/vinoteca/slice"
import { useEffect } from "react"

export const WineListTable = () => {
    const dispatch = useDispatch()

    // Datos filtrados
    const Filters = useSelector((state: any) => state.Vinoteca.Wine)
    const { page, rowsPerPage } = Filters;

    // Api
    const { data } = useWinesQuery(Filters)
    const { wines, count } = data ? data.data : []

    // Obtener imagen
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/wine/image?image=`;

    // Cambiar elementos por pagina
    const handleOnRowsPerPageChange = (value: string) => {
        const payload: any = {
            value: value,
            key: 'rowsPerPage'
        }
        dispatch(setWineActions(payload))
    }

    // Cambiar pagina
    const handleOnPageChange = (_e: any, value: any) => {
        const payload: any = {
            value: value,
            key: 'page'
        }
        dispatch(setWineActions(payload))
    }

    // Reiniciar pagina a 0 cuando se cambie el rowsPerPage
    useEffect(() => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setWineActions(payload))
    }, [rowsPerPage])


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
                            <TableCell>Categoria</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad almacenados</TableCell>
                            <TableCell>Cantidad vendidos</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {count >= 1
                            ? wines.map((wine: any) => (
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
                                    <TableCell>{wine.mark}</TableCell>
                                    <TableCell>{wine.category}</TableCell>
                                    <TableCell>{wine.description}</TableCell>
                                    <TableCell>{wine.price}</TableCell>
                                    <TableCell>{wine.stock}</TableCell>
                                    <TableCell>{wine.sale}</TableCell>
                                    <TableCell>
                                        <Button variant='contained'>
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                            : <TableRow>
                                <TableCell align='center' colSpan={8}>
                                    <Typography>
                                        No se han agregado vinos
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component='div'
                count={count}
                onPageChange={handleOnPageChange}
                onRowsPerPageChange={(e) => handleOnRowsPerPageChange(e.target.value)}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage='Elementos por pagina'
            />
        </Card>
    )
}