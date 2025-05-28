import { MyContainer } from "../../styles/theme/components/my-container"
import { MyCard } from "../../styles/theme/components/my-card"
import { Alert, Autocomplete, Box, Button, Divider, FormLabel, Grid, TextField, Typography } from "@mui/material"
import { FormControl } from "../../helpers/components/form-control"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useSignUpMutation } from "../../store/api/api"
import { PhoneMask } from "../../helpers/mask/mask"
import { validateSignUp } from "../../helpers/validate/validate-sign-up"

export const SignUp = () => {
    // Obtener cookie de creación de cuenta
    const confirmCreateUser = localStorage.getItem('createCount')

    // Redireccionamiento
    const navigate = useNavigate()

    // Manejo de errores
    const [userErrors, setUserErrors] = useState<any>('')
    const [serverErrors, setServerErrors] = useState<any>('')

    // Api
    const [SignUp, { isSuccess, isLoading, error }]: any = useSignUpMutation()

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLInputElement>(null);
    const birthdateRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);
    const conf_passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        // Evita que se recargue la pagina
        event?.preventDefault()

        // Reinicia los errores
        setServerErrors('')

        const userData = {
            name: nameRef.current?.value || '',
            lastname: lastnameRef.current?.value || '',
            gender: genderRef.current?.value || '',
            birthdate: birthdateRef.current?.value || '',
            email: emailRef.current?.value || '',
            phone: phoneRef.current?.value || '',
            address: addressRef.current?.value || '',
            password: passwRef.current?.value || '',
            confirm_password: conf_passwordRef.current?.value || ''
        }

        // Comprobar datos
        const { isOk, errors } = validateSignUp(userData)
        setUserErrors(errors)

        if (isOk) {
            // Se elimina el parametro confirmar contraseña
            const { confirm_password, ...rest } = userData
            SignUp(rest)
        }
    }

    // Si existe una cookie de creación de cuenta, la elimina
    useEffect(() => {
        if (confirmCreateUser) {
            localStorage.removeItem('createCount')
        }
    }, [confirmCreateUser])

    useEffect(() => {
        if (error) {
            setServerErrors(error?.data?.msg || 'Error al crear la cuenta, intentalo más tarde')
        } else if (isSuccess) {
            localStorage.setItem('createCount', 'true')
            navigate('/SignIn')
        }
    }, [isSuccess, error])

    return (
        <MyContainer direction='column' justifyContent='space-between'>
            <MyCard>
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


                    <Grid container spacing={2}>

                        <Grid size={{ sm: 6, xs: 12 }}>
                            {/* Nombre */}
                            <FormControl
                                label="Nombre(s)"
                                type="text"
                                id='name'
                                placeholder="Tu nombre(s)"
                                inputRef={nameRef}
                                autoFocus
                                error={userErrors?.name?.error}
                                helperText={userErrors?.name?.msg}
                            />
                        </Grid>

                        <Grid size={{ sm: 6, xs: 12 }}>
                            {/* Apellido */}
                            <FormControl
                                label="Apellido(s)"
                                type="text"
                                id='lastname'
                                placeholder="Tu apellido(s)"
                                inputRef={lastnameRef}
                                error={userErrors?.lastname?.error}
                                helperText={userErrors?.lastname?.msg}
                            />
                        </Grid>

                        {/* Genero */}
                        <Autocomplete
                            fullWidth
                            options={[
                                { value: 'Masculino' },
                                { value: 'Femenino' }
                            ]}
                            autoHighlight
                            getOptionLabel={(option) => option.value}
                            renderInput={
                                params => (
                                    <>
                                        <FormLabel
                                            htmlFor="gender"
                                            error={userErrors?.gender?.error}
                                        >
                                            Genero
                                        </FormLabel>
                                        <TextField
                                            {...params}
                                            type='text'
                                            id='gender'
                                            placeholder="Selecciona tu genero"
                                            inputRef={genderRef}
                                            error={userErrors?.gender?.error}
                                            helperText={userErrors?.gender?.error && userErrors?.gender?.msg}
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
                            inputRef={birthdateRef}
                            error={userErrors?.birthdate?.error}
                            helperText={userErrors?.birthdate?.msg}
                        />

                        {/* Correo Electronico */}
                        <FormControl
                            label="Correo electronico"
                            type="email"
                            id='email'
                            placeholder="your@email.com"
                            inputRef={emailRef}
                            error={userErrors?.email?.error}
                            helperText={userErrors?.email?.msg}
                        />

                        {/* Número de telefono */}
                        <FormControl
                            label="Número telefonico"
                            type="phone"
                            id='phone'
                            placeholder="000 00 00 00"
                            inputRef={phoneRef}
                            error={userErrors?.phone?.error}
                            helperText={userErrors?.phone?.msg}
                            inputComponent={PhoneMask}
                        />

                        {/* Domicilio */}
                        <FormControl
                            label="Domicilio"
                            type="text"
                            id='address'
                            placeholder="Calle y número"
                            inputRef={addressRef}
                            error={userErrors?.address?.error}
                            helperText={userErrors?.address?.msg}
                        />

                        <Grid size={{ sm: 6, xs: 12 }}>
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
                        </Grid>

                        <Grid size={{ sm: 6, xs: 12 }}>
                            {/* Confirmar contraseña */}
                            <FormControl
                                label="Confirmar contraseña"
                                type="password"
                                id='confirm_password'
                                placeholder="••••••••••••••••••"
                                inputRef={conf_passwordRef}
                                error={userErrors?.confirm_password?.error}
                                helperText={userErrors?.confirm_password?.msg}
                            />
                        </Grid>

                        <Button
                            color='primary'
                            type='submit'
                            fullWidth
                            variant='contained'
                            loading={isLoading}
                            disabled={isSuccess}
                        >
                            Crear cuenta
                        </Button>

                    </Grid>
                    
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