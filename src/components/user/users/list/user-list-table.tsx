import { Avatar, Box, Button, Card, Divider, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setUserListActions } from "../../../../store/slice/vinoteca/slice"
import { useEffect } from "react"
import { useUsersQuery } from "../../../../store/api/api"
import { HasPermissions } from "../../../../helpers/components/has-permission"
import { openModalAction } from "../../../../store/slice/UI/slice"
import { UserListEdit } from "./user-list-edit"
import { UserListDelete } from "./user-list-detele"

export const UserListTable = () => {
    const dispatch = useDispatch()

    // Correo del usuario para que no se muestre en la lista de usuarios
    const user = useSelector((state: any) => state.Auth.user);
    const { email } = user

    // Filtros
    const Filters = useSelector((state: any) => state.Vinoteca.UserList)
    const { page, rowsPerPage } = Filters

    // Api
    const { data } = useUsersQuery({ page: page, rowsPerPage: rowsPerPage, email: email })
    const { users, count } = data ? data.data : []

    // Modificar usuario
    const handleChangeUser = (user: any) => {
        const payload: any = {
            title: `Cambiar el rol de ${user.name}`,
            component: UserListEdit,
            args: user
        }
        dispatch(openModalAction(payload))
    }

    // Eliminar el usuario
    const handleDeleteUser = (user: any) => {
        const payload: any = {
            title: `Eliminar usuario ${user.name}`,
            component: UserListDelete,
            args: user
        }
        dispatch(openModalAction(payload))
    }

    // Cambiar elementos por pagina
    const handleOnRowsPerPageChange = (value: string) => {
        const payload: any = {
            value: value,
            key: 'rowsPerPage'
        }
        dispatch(setUserListActions(payload))
    }

    // Cambiar pagina
    const handleOnPageChange = (_e: any, value: any) => {
        const payload: any = {
            value: value,
            key: 'page'
        }
        dispatch(setUserListActions(payload))
    }

    useEffect(() => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setUserListActions(payload))
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
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Fecha de creación</TableCell>
                            <TableCell>Fecha de verificación</TableCell>
                            <TableCell>Fecha de eliminación</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {count >= 1
                            ? users.map((user: any) => (
                                <TableRow
                                    sx={{
                                        backgroundColor: user.deletedAt && '#ffebee' || user.verifiedAt && '#e8f5e9'
                                    }}

                                    hover key={user.name}>
                                    <TableCell>
                                        <Stack
                                            sx={{ alignItems: 'center' }}
                                            direction='row'
                                            spacing={2}
                                        >
                                            <Avatar />
                                            <Typography variant='subtitle2'>
                                                {user.name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role.name}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>{user.verifiedAt}</TableCell>
                                    <TableCell>{user.deletedAt}</TableCell>
                                    <TableCell>
                                        {!user.deletedAt &&
                                            <>
                                                <HasPermissions permission="EDIT_USER">
                                                    <Button
                                                        variant='contained'
                                                        onClick={(_e) => handleChangeUser(user)}
                                                    >
                                                        Cambiar rol
                                                    </Button>
                                                </HasPermissions>
                                                <HasPermissions permission="DELETE_USER">
                                                    <Button
                                                        variant='contained'
                                                        onClick={(_e) => handleDeleteUser(user)}
                                                        color='error'
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </HasPermissions>
                                            </>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                            : <TableRow>
                                <TableCell align='center' colSpan={8}>
                                    <Typography>
                                        No se han registrado nuevos usuarios
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