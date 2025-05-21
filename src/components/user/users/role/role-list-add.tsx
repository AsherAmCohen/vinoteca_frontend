import { Alert, Autocomplete, Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material"
import { FormControl } from "../../../../helpers/components/form-control"
import { useCreateRoleMutation, usePermissionsQuery } from "../../../../store/api/api"
import { useEffect, useRef, useState } from "react"
import { validateRoleAdd } from "../../../../helpers/validate/validate-role-add"
import { useDispatch } from "react-redux"
import { closeModalAction } from "../../../../store/slice/UI/slice"
import { setRoleListActions } from "../../../../store/slice/vinoteca/slice"

export const RoleListAdd = () => {
    const dispatch = useDispatch()
    const [permissionsRef, setPermissionsRef] = useState('')


    // Manejo de errores
    const [roleErrors, setRoleErrors] = useState<any>('')

    // Api
    const [CreateRole, { isLoading, isSuccess, error }] = useCreateRoleMutation()
    const { data, isLoading: LoadingPermissions } = usePermissionsQuery({})
    const permissions = data ? data.data : []

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

    const handleClose = () => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setRoleListActions(payload))

        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    const handleSubmit = () => {
        // Evita que se recargue la pagina
        event?.preventDefault()

        // Datos
        const roleData: any = {
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || '',
            permissions: permissionsRef
        }

        // Comprobar datos
        const { isOk, errors } = validateRoleAdd(roleData)

        setRoleErrors(errors)

        if (isOk) {
            CreateRole(roleData)
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
                    Rol guardado
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al guardar los permisos
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='name'
                            label='Nombre'
                            type='text'
                            placeholder="Nombre del rol"
                            inputRef={nameRef}
                            error={roleErrors?.name?.error}
                            helperText={roleErrors?.name?.msg}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='description'
                            label='Descripción'
                            type='text'
                            placeholder="Descripción del rol"
                            inputRef={descriptionRef}
                            error={roleErrors?.description?.error}
                            helperText={roleErrors?.description?.msg}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <FormLabel
                            htmlFor='permissions'
                            error={roleErrors?.permissions?.error}
                        >
                            Permisos
                        </FormLabel>
                        <Autocomplete
                            multiple
                            id='permissions'
                            onChange={handleChangePermissions}
                            options={permissions}
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
                    type='submit'
                    variant="contained"
                >
                    Agregar Rol
                </Button>
            </DialogActions>
        </Box>
    )
}