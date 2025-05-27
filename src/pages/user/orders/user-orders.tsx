import { Stack, Typography } from "@mui/material";
import { OrderListTable } from "../../../components/user/order/list/order-list-table";

export const UserOrders = () => {
    return (
        <Stack spacing={3}>
            <Stack
                direction='row'
                spacing={3}
            >
                <Stack
                    spacing={1}
                    sx={{
                        flex: '1 1 auto'
                    }}
                >
                    <Typography variant='h4'>
                        Pedidos
                    </Typography>
                </Stack>
            </Stack>
            <OrderListTable/>
        </Stack>
    )
}