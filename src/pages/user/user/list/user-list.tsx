import { Stack, Typography } from "@mui/material"
import { UserListTable } from "../../../../components/user/users/list/user-list-table"
import { ProtectedByPermission } from "../../../../components/protected-by-permission"

export const UserList = () => {
    return (
        <ProtectedByPermission permission={['VIEW_USER']}>
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
                        <Typography variant="h4">
                            Lista de usuarios registrados
                        </Typography>
                    </Stack>
                </Stack>
                <UserListTable />
            </Stack>
        </ProtectedByPermission>
    )
}