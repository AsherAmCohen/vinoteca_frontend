import { Box, Button, Card, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useRolesQuery } from "../../../../store/api/api"
import { setRoleListActions } from "../../../../store/slice/vinoteca/slice"
import { useEffect } from "react"
import { openModalAction } from "../../../../store/slice/UI/slice"
import { RoleListEdit } from "./role-list-edit"
import { HasPermissions } from "../../../../helpers/components/has-permission"

export const RoleListTable = () => {
    const dispatch = useDispatch()

    // Filtros
    const Filters = useSelector((state: any) => state.Vinoteca.RoleList)
    const { page, rowsPerPage } = Filters

    // Api
    const { data } = useRolesQuery(Filters)
    const { roles, count } = data ? data.data : []

    // Cambiar elementos por pagina
    const handleOnRowsPerPageChange = (value: string) => {
        const payload: any = {
            value: value,
            key: 'rowsPerPage'
        }
        dispatch(setRoleListActions(payload))
    }

    // Modificar Rol
    const handleChangeRole = (role: any) => {
        const payload: any = {
            title: `Cambiar permisos de rol ${role.name}`,
            component: RoleListEdit,
            args: role
        }
        dispatch(openModalAction(payload))
    }

    // Cambiar pagina
    const handleOnPageChange = (_e: any, value: any) => {
        const payload: any = {
            value: value,
            key: 'page'
        }
        dispatch(setRoleListActions(payload))
    }

    // Reiniciar pagina a 0 cuando se cambie el rowsPerPage
    useEffect(() => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setRoleListActions(payload))
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
                            <TableCell>Permisos</TableCell>
                            <HasPermissions permission="EDIT_ROLE">
                                <TableCell>Acciones</TableCell>
                            </HasPermissions>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {count >= 1
                            ? roles.map((role: any) => (
                                <TableRow key={role.name}>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.description}</TableCell>

                                    <TableCell>
                                        {role.permissions.map((permission: any) => (
                                            <li>
                                                <strong>{permission.name}</strong> — <span>{permission.description}</span>
                                            </li>
                                        ))}
                                    </TableCell>
                                    <HasPermissions permission="EDIT_ROLE">
                                        <TableCell>
                                            <Button
                                                disabled={role.name === 'ADMIN' || role.name === 'GUEST'}
                                                variant='contained'
                                                onClick={(_e) => handleChangeRole(role)}
                                            >
                                                Modificar permisos
                                            </Button>
                                        </TableCell>
                                    </HasPermissions>
                                </TableRow>
                            ))
                            : <TableRow>
                                <TableCell align="center" colSpan={8}>
                                    <Typography>
                                        No hay roles configurados
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