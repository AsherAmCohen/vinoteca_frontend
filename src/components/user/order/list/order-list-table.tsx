import { Box, Card, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useShoppingPaymentQuery } from "../../../../store/api/api";
import { OrderListTableRow } from "./order-list-table-row";
import { setOrderListActions } from "../../../../store/slice/vinoteca/slice";
import { useEffect } from "react";

export const OrderListTable = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.Auth.user);

    // Datos filtrados
    const Filters = useSelector((state: any) => state.Vinoteca.OrderList)
    const { page, rowsPerPage } = Filters;

    const { data, isLoading } = useShoppingPaymentQuery({ email: user.email, page: page, rowsPerPage: rowsPerPage })
    const { orders, count } = data ? data.data : []    

    // Cambiar elementos por pagina
    const handleOnRowsPerPageChange = (value: string) => {
        const payload: any = {
            value: value,
            key: 'rowsPerPage'
        }
        dispatch(setOrderListActions(payload))
    }

    // Cambiar pagina
    const handleOnPageChange = (_e: any, value: any) => {
        const payload: any = {
            value: value,
            key: 'page'
        }
        dispatch(setOrderListActions(payload))
    }

    // Reiniciar pagina a 0 cuando se cambie el rowsPerPage
    useEffect(() => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setOrderListActions(payload))
    }, [rowsPerPage])

    if(isLoading) {
        return (
            <>
                Cargando...
            </>
        )
    }

    return (
        <Card>
            <Box
                sx={{
                    overflow: 'auto'
                }}
            >
                <Table
                    sx={{
                        minWidth: '800px'
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Fecha de compra</TableCell>
                            <TableCell>Productos comprados</TableCell>
                            <TableCell>Cantidad de productos comprados</TableCell>
                            <TableCell>Precio total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders && orders.length > 1
                                ? orders.map((order: any) => (
                                    <OrderListTableRow
                                        key={order.id}
                                        paymendAt={order.paymendAt}
                                        wines={order.wines}
                                    />
                                ))
                                : <TableRow>
                                    <TableCell align="center" colSpan={8}>
                                        <Typography>
                                            Todavia no se han comprado productos
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