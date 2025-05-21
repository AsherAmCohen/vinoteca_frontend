import { Box, Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { useRolesQuery } from "../../../../store/api/api"

export const RoleListTable = () => {
    const dispath = useDispatch()

    // Api
    const { data } = useRolesQuery({})
    const { roles, count } = data ? data.data : []

    console.log(roles)

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
                            <TableCell>Acciones</TableCell>
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
                                                <strong>{permission.name}</strong> — <span style={{ color: '#888' }}>{permission.description}</span>
                                            </li>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            disabled={role.name === 'ADMIN'}
                                            variant='contained'
                                        >
                                            Modificar permisos
                                        </Button>
                                    </TableCell>
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
        </Card>
    )
}