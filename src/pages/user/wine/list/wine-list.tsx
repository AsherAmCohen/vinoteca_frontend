import { Button, Stack, Typography } from "@mui/material"
import { Plus as AddIcon } from "@phosphor-icons/react"
import { WineListTable } from "../../../../components/user/wine/list/wine-list-table"
import { useDispatch } from "react-redux"
import { openModalAction } from "../../../../store/slice/UI/slice"
import { WineListAdd } from "../../../../components/user/wine/list/wine-list-add"
import { HasPermissions } from "../../../../helpers/components/has-permission"
import { ProtectedByPermission } from "../../../../components/protected-by-permission"

export const WineList = () => {
    const dispath = useDispatch()

    const handleAddWine = () => {
        const payload: any = {
            title: 'Agregar nuevo vino',
            component: WineListAdd
        }
        dispath(openModalAction(payload))
    }

    return (
        <ProtectedByPermission permission={['VIEW_WINE']}>
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
                        <Typography variant="h4">Carta de vinos</Typography>
                    </Stack>
                    <div>
                        <HasPermissions permission="ADD_WINE">
                            <Button
                                color='primary'
                                variant='contained'
                                startIcon={
                                    <AddIcon fontSize='var(--Vinoteca-Icon-FontSize-md)' />
                                }
                                onClick={handleAddWine}
                            >
                                Agregar nuevo vino
                            </Button>
                        </HasPermissions>
                    </div>
                </Stack>
                <WineListTable />
            </Stack>
        </ProtectedByPermission>
    )
}