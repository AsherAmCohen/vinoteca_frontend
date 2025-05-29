import { Alert, Autocomplete, Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material"
import { useAllRolesQuery, useUpdateUserRoleMutation } from "../../../../store/api/api"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { validateUserRoleEdit } from "../../../../helpers/validate/validate-user-role-edit"
import { closeModalAction } from "../../../../store/slice/UI/slice"

export const UserListEdit = (props: any) => {
    const dispatch = useDispatch()

    const { id, role } = props.args
    const [roleRef, setRoleRef] = useState<any>('')

    useEffect(() => {
        setRoleRef(role)
    }, [role])

    // Manejo de errores
    const [userErrors, setUserErrors] = useState<any>('')

    // Api
    const { data, isLoading: LoadingRoles } = useAllRolesQuery({})
    const allRoles = data ? data.data : []
    const [updateRole, { isSuccess, isLoading, error }] = useUpdateUserRoleMutation()

    const handleChangeRole = (_e: any, value: any) => {
        setRoleRef(value)
    }

    const handleClose = () => {
        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])


    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        const userData: any = {
            userId: id,
            role: roleRef
        }

        // Comprobar datos
        const { isOk, errors } = validateUserRoleEdit(userData)

        setUserErrors(errors)

        // Enviar resultados si no existen errores
        if (isOk) {
            updateRole(userData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Usuario editado
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al editar el usuario
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <FormLabel
                            htmlFor="role"
                            error={userErrors?.role?.error}
                        >
                            Rol
                        </FormLabel>
                        <Autocomplete
                            id='role'
                            onChange={handleChangeRole}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            defaultValue={role}
                            options={allRoles}
                            autoHighlight
                            loading={LoadingRoles}
                            getOptionLabel={(option: any) => option.name}
                            renderInput={
                                params => (
                                    <TextField
                                        {...params}
                                        placeholder="Rol del usuario"
                                        fullWidth
                                        error={userErrors?.role?.error}
                                        helperText={userErrors?.role?.error && userErrors?.role.msg}
                                    />
                                )
                            }
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={isSuccess}
                    loading={isLoading}
                    variant='contained'
                    type="submit"
                >
                    Cambiar rol
                </Button>
            </DialogActions>
        </Box>
    )
}