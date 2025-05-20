import { Avatar, Box, Button, Card, Divider, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useAllUserRegisterQuery } from "../../../../store/api/api"
import { setUserListActions } from "../../../../store/slice/vinoteca/slice"
import { useEffect } from "react"

export const UsersListTable = () => {
    const dispatch = useDispatch()

    // Correo del usuario para que no se muestre en la lista de usuarios
    const user = useSelector((state: any) => state.Auth.user);
    const { email } = user

    // Filtros
    const Filters = useSelector((state: any) => state.Vinoteca.UserList)
    const { page, rowsPerPage } = Filters

    // Api
    const { data } = useAllUserRegisterQuery({ page: page, rowsPerPage: rowsPerPage, email: email })
    const { users, count } = data ? data.data : []

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
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {count >= 1
                            ? users.map((user: any) => (
                                <TableRow hover key={user}>
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
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>
                                        <Button variant='contained'>
                                            Cambiar rol
                                        </Button>
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