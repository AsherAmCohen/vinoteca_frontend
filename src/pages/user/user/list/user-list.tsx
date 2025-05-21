import { Stack, Typography } from "@mui/material"
import { UserListTable } from "../../../../components/user/users/list/user-list-table"

export const UserList = () => {
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
                    <Typography variant="h4">
                        Lista de usuarios registrados
                    </Typography>
                </Stack>
            </Stack>
            <UserListTable/>
        </Stack>
    )
}