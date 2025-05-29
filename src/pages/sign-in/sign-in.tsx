import { MyContainer } from "../../styles/theme/components/my-container"
import { MyCard } from "../../styles/theme/components/my-card"
import { Alert, Box, Button, Divider, Typography } from "@mui/material"
import { FormControl } from "../../helpers/components/form-control"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { validateSignIn } from "../../helpers/validate/validate-sign-in"
import { useSignInMutation } from "../../store/api/api"
import { useAuth } from "../../auth-context"

export const SingIn = () => {
    // Comprobar si ya existe in inicio de sesión
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])


    // Obtiene la cookie almacenada, si es que existe
    const confirmCreateUser = localStorage.getItem('createCount')

    // Manejo de errores
    const [userErrors, setUserErrors] = useState<any>('')
    const [serverErrors, setServerErrors] = useState<any>('')
    const [createUser, setCreateUser] = useState<boolean>(false)


    // Api
    const [SignIn, { data, isLoading, isSuccess, error }]: any = useSignInMutation()

    // Referencias para obtener los datos
    const emailRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        // Evita que se recargue la pagina
        event?.preventDefault()

        // Reinicia los errores
        setCreateUser(false)
        setServerErrors('')

        const userData = {
            email: emailRef.current?.value || '',
            password: passwRef.current?.value || ''
        }

        // Validar datos
        const { isOk, errors } = validateSignIn(userData)
        setUserErrors(errors)


        if (isOk) {
            SignIn(userData)
        }
    }

    // Comprobar si se ha creado recientemente una cuenta
    useEffect(() => {
        if (confirmCreateUser) {
            setCreateUser(true)
            localStorage.removeItem('createCount')
        }
    }, [confirmCreateUser])

    // Comprueba la respuesta del backend
    useEffect(() => {
        if (error) {
            setServerErrors(error?.data?.msg || 'Error al iniciar sesión, intentalo más tarde')
        } else if (isSuccess) {
            const { token } = data.data
            login(token)
        }
    }, [isSuccess, error])

    return (
        <MyContainer>
            <MyCard>
                <Typography
                    component='h1'
                    variant='h4'
                    sx={{
                        width: '100%',
                        fontSize: 'clamp(2rem, 10vw, 2.15rem)'
                    }}
                >
                    Iniciar Sesión
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
                    {
                        createUser &&
                        <Alert severity='success'>
                            La cuenta se ha creado con exito
                        </Alert>
                    }


                    {/* Correo */}
                    <FormControl
                        label="Correo eletronico"
                        type="email"
                        id='email'
                        placeholder="your@email.com"
                        inputRef={emailRef}
                        autoFocus
                        error={userErrors?.email?.error}
                        helperText={userErrors?.email?.msg}
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

                    <Button
                        color='primary'
                        type='submit'
                        fullWidth
                        variant='contained'
                        loading={isLoading}
                        disabled={isSuccess}
                    >
                        Iniciar
                    </Button>

                    <Divider>o</Divider>

                    <Typography
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        ¿Aún no tienes una cuenta?{' '}
                        <Link
                            to='/SignUp'
                            style={{
                                alignSelf: 'center',
                                textDecoration: 'node',
                                color: 'black'
                            }}
                        >
                            Crear cuenta
                        </Link>
                    </Typography>
                </Box>
            </MyCard>
        </MyContainer>
    )
}