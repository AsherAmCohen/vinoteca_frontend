import { Stack, Typography } from "@mui/material";
import { OrderListTable } from "../../../components/user/order/list/order-list-table";
import { ProtectedByPermission } from "../../../components/protected-by-permission";

export const UserOrders = () => {
    return (
        <ProtectedByPermission permission={['VIEW_ORDER']}>
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
                <OrderListTable />
            </Stack>
        </ProtectedByPermission>
    )
}