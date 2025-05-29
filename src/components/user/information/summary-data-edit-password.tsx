import { Alert, Box, Button, DialogActions, DialogContent, Grid } from "@mui/material"
import { FormControl } from "../../../helpers/components/form-control"
import { useEffect, useRef, useState } from "react"
import { validateUserEditPassword } from "../../../helpers/validate/validate-user-edit-password"
import { useChangePasswordMutation } from "../../../store/api/api"
import { useDispatch } from "react-redux"
import { closeModalAction } from "../../../store/slice/UI/slice"
import { useAuth } from "../../../auth-context"

export const SummaryDataEditPassword = (props: any) => {
    const email = props.args
    const dispath = useDispatch()
    const { logout } = useAuth()

    // Manejo de errores
    const [passwordErrors, setPasswordErrors] = useState<any>('')

    // api
    const [changePassword, { isLoading, isSuccess, error }]: any = useChangePasswordMutation()

    // Referencias para obtener los datos
    const passwordRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)
    const confirmNewPasswordRef = useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        // Datos
        const passwordData = {
            email: email,
            password: passwordRef.current?.value || '',
            newPassword: newPasswordRef.current?.value || '',
            confirmNewPassword: confirmNewPasswordRef.current?.value || ''
        }

        // Validar si los datos son correctos
        const { isOk, errors } = validateUserEditPassword(passwordData)

        setPasswordErrors(errors)

        if (isOk) {
            // Se elimina el parametro confirmar contraseña
            const { confirmNewPassword, ...rest } = passwordData
            changePassword(rest)
        }
    }

    const handleClose = () => {
        dispath(closeModalAction())
        // Cierra la sesión del usuario
        logout()
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    })

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Contraseña cambiada
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    {error.data.msg || 'Error al cambiar la contraseña'}
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <FormControl
                            label="Contraseña actual"
                            type="password"
                            id='password'
                            placeholder="••••••••••••••••••"
                            inputRef={passwordRef}
                            error={passwordErrors?.password?.error}
                            helperText={passwordErrors?.password?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            label="Nueva contraseña"
                            type="password"
                            id='new_password'
                            placeholder="••••••••••••••••••"
                            inputRef={newPasswordRef}
                            error={passwordErrors?.newPassword?.error}
                            helperText={passwordErrors?.newPassword?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            label="Confirmar contraseña"
                            type="password"
                            id='confirm_new_password'
                            placeholder="••••••••••••••••••"
                            inputRef={confirmNewPasswordRef}
                            error={passwordErrors?.confirmNewPassword?.error}
                            helperText={passwordErrors?.confirmNewPassword?.msg}
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
                    Cambiar contraseña
                </Button>
            </DialogActions>
        </Box>
    )
}