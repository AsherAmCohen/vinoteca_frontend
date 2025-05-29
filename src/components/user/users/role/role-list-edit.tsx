import { Alert, Autocomplete, Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { usePermissionsQuery, useUpdateRoleMutation } from "../../../../store/api/api"
import { validateRoleEdit } from "../../../../helpers/validate/validate-role-edit"
import { useDispatch } from "react-redux"
import { closeModalAction } from "../../../../store/slice/UI/slice"

export const RoleListEdit = (props: any) => {
    const dispatch = useDispatch()

    const { id, permissions } = props.args
    const [permissionsRef, setPermissionsRef] = useState<any>('')

    useEffect(() => {
        setPermissionsRef(permissions)
    }, [permissions])

    // Manejo de errores
    const [roleErrors, setRoleErrors] = useState<any>('')

    // Api
    const { data, isLoading: LoadingPermissions } = usePermissionsQuery({})
    const allPermissions = data ? data.data : []
    const [updateRole, { isSuccess, isLoading, error }] = useUpdateRoleMutation()

    const handleClose = () => {
        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    const handleSubmit = () => {
        // Evita que se recargue la pagina
        event?.preventDefault()

        const roleData: any = {
            roleId: id,
            permissions: permissionsRef
        }

        // Comprobar datos
        const { isOk, errors } = validateRoleEdit(roleData)

        setRoleErrors(errors)

        // Enviar resultados si no existen errores
        if (isOk) {
            updateRole(roleData)
        }

    }

    const handleChangePermissions = (_e: any, value: any) => {
        setPermissionsRef(value)
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Permisos editados
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al editar el rol
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <FormLabel
                            htmlFor='permissions'
                            error={roleErrors?.permissions?.error}
                        >
                            Permisos
                        </FormLabel>
                        <Autocomplete
                            multiple
                            value={permissionsRef}
                            id='permissions'
                            onChange={handleChangePermissions}
                            isOptionEqualToValue={(option, value) => option.id === value.id} // 💡 clave
                            options={allPermissions}
                            autoHighlight
                            loading={LoadingPermissions}
                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props, option: any) => (
                                <li {...props}>
                                    <div>
                                        <strong>{option.name}</strong> — <span style={{ color: '#888' }}>{option.description}</span>
                                    </div>
                                </li>
                            )}
                            renderInput={
                                params => (
                                    <TextField
                                        {...params}
                                        placeholder='Permisos del rol'
                                        fullWidth
                                        error={roleErrors?.permissions?.error}
                                        helperText={roleErrors?.permissions?.error && roleErrors?.permissions.msg}
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
                    type='submit'
                >
                    Cambiar permisos
                </Button>
            </DialogActions>
        </Box>
    )
}