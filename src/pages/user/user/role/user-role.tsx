import { Button, Stack, Typography } from "@mui/material"
import { Plus as AddIcon } from "@phosphor-icons/react"
import { RoleListTable } from "../../../../components/user/users/role/role-list-table"
import { useDispatch } from "react-redux"
import { RoleListAdd } from "../../../../components/user/users/role/role-list-add"
import { openModalAction } from "../../../../store/slice/UI/slice"
import { HasPermissions } from "../../../../helpers/components/has-permission"
import { ProtectedByPermission } from "../../../../components/protected-by-permission"

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
        <ProtectedByPermission permission={['VIEW_ROLE']}>
            <Stack spacing={3}>
                <Stack direction='row' spacing={3}>
                    <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h4">Lista de Roles</Typography>
                    </Stack>
                    <div>
                        <HasPermissions permission="ADD_ROLE">
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
                        </HasPermissions>
                    </div>
                </Stack>
                <RoleListTable />
            </Stack>
        </ProtectedByPermission>
    )
}