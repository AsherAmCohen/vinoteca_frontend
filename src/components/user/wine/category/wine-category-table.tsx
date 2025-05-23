import { Box, Button, Card, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useCategorysQuery } from "../../../../store/api/api"
import { setCategoryActions } from "../../../../store/slice/vinoteca/slice"
import { useEffect } from "react"
import { HasPermissions } from "../../../../helpers/components/has-permission"
import { WineCategoryEdit } from "./wine-category-edit"
import { openModalAction } from "../../../../store/slice/UI/slice"

export const WineCategoryTable = () => {
    const dispatch = useDispatch()

    // Datos filtrados
    const Filters = useSelector((state: any) => state.Vinoteca.Category)
    const { page, rowsPerPage } = Filters

    const { data } = useCategorysQuery(Filters)
    const { categorys, count } = data ? data.data : []

    // Cambiar elementos por pagina
    const handleOnRowsPerPageChange = (value: string) => {
        const payload: any = {
            value: value,
            key: 'rowsPerPage'
        }
        dispatch(setCategoryActions(payload))
    }

    // Cambiar pagina
    const handleOnPageChange = (_e: any, value: any) => {
        const payload: any = {
            value: value,
            key: 'page'
        }
        dispatch(setCategoryActions(payload))
    }

    // Modificar categoria
    const handleChangeCategory = (category: any) => {
        const payload: any = {
            title: `Editar categoria ${category.name}`,
            component: WineCategoryEdit,
            args: category
        }
        dispatch(openModalAction(payload))
    }

    // Reiniciar pagina a 0 cuando cambie el rowsPerpage
    useEffect(() => {
        const payload: any = {
            value: 0,
            key: 'page',
        }
        dispatch(setCategoryActions(payload))
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
                            <TableCell>Descripción</TableCell>
                            <HasPermissions permission="EDIT_CATEGORY">
                                <TableCell>Acciones</TableCell>
                            </HasPermissions>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {count >= 1
                            ? categorys.map((category: any) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <HasPermissions permission="EDIT_CATEGORY">
                                        <TableCell>
                                            <Button
                                                variant='contained'
                                                onClick={(_e) => handleChangeCategory(category)}
                                            >
                                                Editar
                                            </Button>
                                        </TableCell>
                                    </HasPermissions>
                                </TableRow>
                            )) :
                            <TableRow>
                                <TableCell align='center' colSpan={3}>
                                    <Typography>
                                        No hay categorias registradas
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