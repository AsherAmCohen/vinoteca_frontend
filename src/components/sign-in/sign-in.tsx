import { MyContainer } from "../../theme/components/my-container"
import { MyCard } from "../../theme/components/my-card"
import { Alert, Box, Button, Divider, Typography } from "@mui/material"
import { FormControl } from "../../helpers/components/form-control"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { validateSignIn } from "../../helpers/validate/validate-sign-in"
import { useSignInMutation } from "../../store/api/api"

export const SingIn = () => {
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
                            Registrarme
                        </Link>
                    </Typography>
                </Box>
            </MyCard>
        </MyContainer>
    )
}