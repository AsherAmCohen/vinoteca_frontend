import { Button, Stack, Typography } from "@mui/material"
import { Plus as AddIcon } from "@phosphor-icons/react"
import { WineMarkTable } from "../../../../components/user/wine/mark/wine-mark-table"
import { useDispatch } from "react-redux"
import { WineMarkAdd } from "../../../../components/user/wine/mark/wine-mark-add"
import { openModalAction } from "../../../../store/slice/UI/slice"
import { HasPermissions } from "../../../../helpers/components/has-permission"
import { ProtectedByPermission } from "../../../../components/protected-by-permission"

export const WineMark = () => {
    const dispath = useDispatch()

    const handleAddMark = () => {
        const payload: any = {
            title: 'Agrega nueva marca',
            component: WineMarkAdd
        }
        dispath(openModalAction(payload))
    }

    return (
        <ProtectedByPermission permission={['VIEW_MARK']}>
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
                        <Typography variant="h4">Marcas</Typography>
                    </Stack>
                    <div>
                        <HasPermissions permission="ADD_MARK">
                            <Button
                                color='primary'
                                variant='contained'
                                startIcon={
                                    <AddIcon fontSize='var(--Vinoteca-Icon-FontSize-md)' />
                                }
                                onClick={handleAddMark}
                            >
                                Agregar nueva marca
                            </Button>
                        </HasPermissions>
                    </div>
                </Stack>
                <WineMarkTable />
            </Stack>
        </ProtectedByPermission>
    )
}