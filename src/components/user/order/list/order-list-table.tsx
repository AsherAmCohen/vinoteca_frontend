import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useShoppingPaymentQuery } from "../../../../store/api/api";
import { OrderListTableRow } from "./order-list-table-row";

export const OrderListTable = (props: any) => {
    const user = useSelector((state: any) => state.Auth.user);
    const { data } = useShoppingPaymentQuery({ email: user.email })
    const orders: any[] = data ? data.data : []

    console.log(orders)

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
                            orders.length >= 1
                                ? orders.map((order: any) => (
                                    <OrderListTableRow
                                        key={order.id}
                                        paymendAt={ order.paymendAt }
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
        </Card>
    )
}