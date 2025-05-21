import { Autocomplete, Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material"
import { FormControl } from "../../../../helpers/components/form-control"
import { useCreateRoleMutation, usePermissionsQuery } from "../../../../store/api/api"
import { useRef, useState } from "react"

export const RoleListAdd = () => {
    const [permissionsRef, setPermissionsRef] = useState('')

    // Api
    const [CreateRole, { isLoading, isSuccess, error }] = useCreateRoleMutation()
    const { data } = usePermissionsQuery({})
    const permissions = data ? data.data : []

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

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

        CreateRole(roleData)
    }

    const handleChangePermissions = (_e: any, value: any) => {
        setPermissionsRef(value)
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='name'
                            label='Nombre'
                            type='text'
                            placeholder="Nombre del rol"
                            inputRef={nameRef}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='description'
                            label='Descripción'
                            type='text'
                            placeholder="Descripción del rol"
                            inputRef={descriptionRef}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <FormLabel
                            htmlFor='permissions'
                        >
                            Permisos
                        </FormLabel>
                        <Autocomplete
                            multiple
                            id='permissions'
                            onChange={handleChangePermissions}
                            options={permissions}
                            autoHighlight
                            loading={isLoading}
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
                                    />
                                )
                            }
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
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