import { Box, Button, Card, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useMarksQuery } from "../../../../store/api/api"
import { useDispatch, useSelector } from "react-redux"
import { setMarkActions } from "../../../../store/slice/vinoteca/slice"
import { useEffect } from "react"

export const WineMarkTable = () => {
    const dispatch = useDispatch()

    // Datos filtrados
    const Filters = useSelector((state: any) => state.Vinoteca.Mark)
    const { page, rowsPerPage } = Filters

    const { data } = useMarksQuery(Filters)
    const { marks, count } = data ? data.data : []

    // Cambiar elementos por pagina
    const handleOnRowsPerPageChange = (value: string) => {
        const payload: any = {
            value: value,
            key: 'rowsPerPage'
        }
        dispatch(setMarkActions(payload))
    }

    // Cambiar pagina
    const handleOnPageChange = (_e: any, value: any) => {
        const payload: any = {
            value: value,
            key: 'page'
        }
        dispatch(setMarkActions(payload))
    }

    // Reinicar pagina a 0 cuando se cambie el rowsPerPage
    useEffect(() => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setMarkActions(payload))
    },  [rowsPerPage])

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
                            <TableCell>Descripción</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {count >= 1
                            ? marks.map((mark: any) => (
                                <TableRow>
                                    <TableCell>{mark.name}</TableCell>
                                    <TableCell>{mark.description}</TableCell>
                                    <TableCell>
                                        <Button variant='contained'>
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) :
                            <TableRow>
                                <TableCell align='center' colSpan={3}>
                                    <Typography>
                                        No hay marcas registradas
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