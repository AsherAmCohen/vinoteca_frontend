import { Button, Stack, Typography } from "@mui/material"
import { Plus as AddIcon } from "@phosphor-icons/react"
import { RoleListTable } from "../../../../components/user/users/role/role-list-table"
import { useDispatch } from "react-redux"
import { RoleListAdd } from "../../../../components/user/users/role/role-list-add"
import { openModalAction } from "../../../../store/slice/UI/slice"

export const UserRole = () => {
    const dispatch = useDispatch()

    const handleAddRole = () => {
        const payload: any = {
            title: 'Agregar nuevo rol',
            component: RoleListAdd
        }
        dispatch(openModalAction(payload))
    }

    return (
        <Stack spacing={3}>
            <Stack direction='row' spacing={3}>
                <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Lista de Roles</Typography>
                </Stack>
                <div>
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={
                            <AddIcon fontSize='var(--Vinoteca-Icon-FontSize-md)' />
                        }
                        onClick={handleAddRole}
                    >
                        Agregar nuevo rol
                    </Button>
                </div>
            </Stack>
            <RoleListTable/>
        </Stack>
    )
}