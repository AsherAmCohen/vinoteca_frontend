import { Autocomplete, Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material"
import { useAllRolesQuery } from "../../../../store/api/api"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { validateUserRoleEdit } from "../../../../helpers/validate/validate-user-role-edit"

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

    const handleChangeRole = (_e: any, value: any) => {
        setRoleRef(value)
    }

    const handleSubmit = () => {
        // Evita que se recague la pagina
        event?.preventDefault()

        const userData: any = {
            userId: id,
            role: roleRef
        }

        // Comprobar datos
        const {isOk, errors} = validateUserRoleEdit(userData)

        setUserErrors(errors)

        if(isOk) {
            console.log(userData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
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
                            value={role}
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
                    variant='contained'
                    type="submit"
                >
                    Cambiar rol
                </Button>
            </DialogActions>
        </Box>
    )
}