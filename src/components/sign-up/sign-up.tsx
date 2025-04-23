import { MyContainer } from "../../theme/components/my-container"
import { MyCard } from "../../theme/components/my-card"
import { Alert, Autocomplete, Box, Button, Divider, FormLabel, TextField, Typography } from "@mui/material"
import { FormControl } from "../../helpers/components/form-control"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { validateSignIn } from "../../helpers/validate/validate-sign-in"
import { useSignInMutation } from "../../store/api/api"
import { PhoneMask } from "../../helpers/mask/mask"

export const SignUp = () => {
    // Redireccionamiento
    const navigate = useNavigate()

    // Manejo de errores
    const [userErrors, setUserErrors] = useState<any>('')
    const [serverErrors, setServerErrors] = useState<any>('')

    // Api
    const [SignIn, { isSuccess, error }]: any = useSignInMutation()

    // Referencias para obtener los daots
    const emailRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        // Reinicia los errores
        setServerErrors('')
        setUserErrors('')

        const userData = {
            email: emailRef.current?.value || '',
            password: passwRef.current?.value || ''
        }

        const { isOk, errors } = validateSignIn(userData)

        if (isOk) {
            event?.preventDefault()
            SignIn(userData)
        } else {
            event?.preventDefault()
            setUserErrors(errors)
        }


    }

    useEffect(() => {
        if (error) {
            setServerErrors(error.data.msg)
        } else if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, error])

    return (
        <MyContainer direction='column' justifyContent='space-between'>
            <MyCard variant='outlined'>
                <Typography
                    component='h1'
                    variant='h4'
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)'
                    }}
                >
                    Registro
                </Typography>


                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2
                    }}
                >

                    {
                        serverErrors.length > 1 &&
                        <Alert severity='warning'>
                            {serverErrors}
                        </Alert>
                    }


                    {/* Nombre */}
                    <FormControl
                        label="Nombre(s)"
                        type="text"
                        id='name'
                        placeholder="Tu nombre(s)"
                        inputRef={emailRef}
                        autoFocus
                        error={userErrors?.email?.error}
                        helperText={userErrors?.email?.msg}
                    />

                    {/* Apellido */}
                    <FormControl
                        label="Apellido(s)"
                        type="text"
                        id='lastname'
                        placeholder="Tu apellido(s)"
                        inputRef={emailRef}
                        error={userErrors?.email?.error}
                        helperText={userErrors?.email?.msg}
                    />

                    {/* Genero */}
                    <Autocomplete
                        options={[
                            { value: 'Masculino' },
                            { value: 'Femenino' }
                        ]}
                        getOptionLabel={(option) => option.value}
                        renderInput={
                            params => (
                                <>
                                    <FormLabel htmlFor="gender">Genero</FormLabel>
                                    <TextField
                                        {...params}
                                        type='text'
                                        id='gender'
                                        placeholder="Selecciona tu genero"
                                    />
                                </>
                            )
                        }
                    />

                    {/* Fecha de nacimiento */}
                    <FormControl
                        label="Fecha de nacimiento"
                        type="date"
                        id='password'
                        placeholder="dd/mm/aaaa"
                        inputRef={passwRef}
                        error={userErrors?.password?.error}
                        helperText={userErrors?.password?.msg}
                    />

                    {/* Correo Electronico */}
                    <FormControl
                        label="Correo electronico"
                        type="email"
                        id='email'
                        placeholder="your@email.com"
                        inputRef={passwRef}
                        error={userErrors?.password?.error}
                        helperText={userErrors?.password?.msg}
                    />

                    {/* Número de telefono */}
                    <FormControl
                        label="Número telefonico"
                        type="phone"
                        id='phone'
                        placeholder="000 00 00 00"
                        inputRef={passwRef}
                        error={userErrors?.password?.error}
                        helperText={userErrors?.password?.msg}
                        inputComponent={PhoneMask}
                    />

                    {/* Domicilio */}
                    <FormControl
                        label="Domicilio"
                        type="text"
                        id='address'
                        placeholder="Calle y número"
                        inputRef={passwRef}
                        error={userErrors?.password?.error}
                        helperText={userErrors?.password?.msg}
                        inputComponent={PhoneMask}
                    />

                    {/* Contraseña */}
                    <FormControl
                        label="Contraseña"
                        type="password"
                        id='password'
                        placeholder="••••••••••••••••••"
                        inputRef={passwRef}
                        error={userErrors?.password?.error}
                        helperText={userErrors?.password?.msg}
                    />

                    {/* Confirmar contraseña */}
                    <FormControl
                        label="Confirmar contraseña"
                        type="password"
                        id='confirm_password'
                        placeholder="••••••••••••••••••"
                        inputRef={passwRef}
                        error={userErrors?.password?.error}
                        helperText={userErrors?.password?.msg}
                    />

                    <Button
                        color='primary'
                        type='submit'
                        fullWidth
                        variant='contained'
                    >
                        Iniciar
                    </Button>

                    <Divider>o</Divider>

                    <Typography
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            to='/SignIn'
                            style={{
                                alignSelf: 'center',
                                textDecoration: 'node',
                                color: 'black'
                            }}
                        >
                            Iniciar sesión
                        </Link>
                    </Typography>
                </Box>
            </MyCard>
        </MyContainer>
    )
}