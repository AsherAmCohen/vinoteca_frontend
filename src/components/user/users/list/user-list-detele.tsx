import { Alert, Box, Button, DialogActions } from "@mui/material"
import { useDispatch } from "react-redux"
import { useDeleteUserMutation } from "../../../../store/api/api"
import { useEffect } from "react"
import { closeModalAction } from "../../../../store/slice/UI/slice"

export const UserListDelete = (props: any) => {
    const dispatch = useDispatch()

    const { id } = props.args

    // Api
    const [deleteUser, { isSuccess, isLoading, error }] = useDeleteUserMutation()

    const handleSubmit = () => {
        // Evita que la pagina se recarge
        event?.preventDefault()

        const userData: any = {
            userId: id
        }

        // Enviar datos del usuario para eliminar
        deleteUser(userData)
    }

    // Cierra el modal
    const handleClose = () => {
        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Usuario eliminado
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al eliminar el usuario
                </Alert>
            }
            <Alert severity="warning">
                ¿Seguro que quieres eliminar el usuario?
            </Alert>
            <DialogActions>
                <Button
                    disabled={isSuccess}
                    loading={isLoading}
                    variant='contained'
                    color="error"
                    type="submit"
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Box>
    )
}