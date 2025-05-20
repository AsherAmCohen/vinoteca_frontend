import { Stack, Typography } from "@mui/material"
import { UsersListTable } from "../../../../components/user/users/list/users-list-table"

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
            <UsersListTable/>
        </Stack>
    )
}