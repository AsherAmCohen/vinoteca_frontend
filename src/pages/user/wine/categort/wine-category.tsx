import { Button, Stack, Typography } from "@mui/material"
import { Plus as AddIcon } from "@phosphor-icons/react"
import { WineCategoryTable } from "../../../../components/user/wine/category/wine-category-table"
import { useDispatch } from "react-redux"
import { WineCategoryAdd } from "../../../../components/user/wine/category/wine-category-add"
import { openModalAction } from "../../../../store/slice/UI/slice"
export const WineCategory = () => {
    const dispatch = useDispatch()

    const handleAddCategory = () => {
        const payload: any = {
            title: 'Agregar nueva categoria',
            component: WineCategoryAdd
        }
        dispatch(openModalAction(payload))
    }

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
                    <Typography variant="h4">Categirias</Typography>
                </Stack>
                <div>
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={
                            <AddIcon fontSize='var(--Vinoteca-Icon-FontSize-md)' />
                        }
                        onClick={handleAddCategory}
                    >
                        Agregar nueva categoria
                    </Button>
                </div>
            </Stack>
            <WineCategoryTable/>
        </Stack>
    )
}