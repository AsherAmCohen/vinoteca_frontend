import { Alert, Box, Button, DialogActions, DialogContent, Grid } from "@mui/material"
import { FormControl } from "../../../helpers/components/form-control"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { PhoneMask } from "../../../helpers/mask/mask"
import { useChangeDataMutation } from "../../../store/api/api"
import { validateUserDataChange } from "../../../helpers/validate/validate-user-data-change"
import { closeModalAction } from "../../../store/slice/UI/slice"

export const PersonalDataEdit = (props: any) => {
    const { name, lastname, phone, address, email } = props.args

    const dispatch = useDispatch();

    // Manejo de errores
    const [userErrors, setUserErrors] = useState<any>('')

    // Api
    const [changeData, { isSuccess, isLoading, error }]: any = useChangeDataMutation()

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    const handleClose = () => {
        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    })

    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        const userData = {
            email: email,
            name: nameRef.current?.value || '',
            lastname: lastnameRef.current?.value || '',
            address: addressRef.current?.value || '',
            phone: phoneRef.current?.value || '',
        }

        // Validar si los datos son correctos
        const { isOk, errors } = validateUserDataChange(userData)

        setUserErrors(errors)

        if (isOk) {
            changeData(userData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Datos actualizados
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    {error.data.msg || 'Error al actualizar los datos'}
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={name}
                            label="Nombre(s)"
                            type="text"
                            id="name"
                            placeholder="Nombre(s)"
                            inputRef={nameRef}
                            error={userErrors?.name?.error}
                            helperText={userErrors?.name?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={lastname}
                            label="Apellido(s)"
                            type="text"
                            id="name"
                            placeholder="Apellidos(s)"
                            inputRef={lastnameRef}
                            error={userErrors?.lastname?.error}
                            helperText={userErrors?.lastname?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={phone}
                            label="Número telefonico"
                            type="phone"
                            id='phone'
                            placeholder="000 00 00 00"
                            inputComponent={PhoneMask}
                            inputRef={phoneRef}
                            error={userErrors?.phone?.error}
                            helperText={userErrors?.phone?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={address}
                            label="Domicilio"
                            type="text"
                            id="name"
                            placeholder="Dirección"
                            inputRef={addressRef}
                            error={userErrors?.address?.error}
                            helperText={userErrors?.address?.msg}
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
                    Cambiar información
                </Button>
            </DialogActions>
        </Box>
    )
}