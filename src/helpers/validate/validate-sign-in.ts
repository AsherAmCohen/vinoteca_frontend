import { SignInErrorsProps, validateSignInProps } from "../../types/validate";

const validateSignInErrors: SignInErrorsProps = {
    email: {
        msg: 'Introduce tu correo electronico',
        error: false
    },
    password: {
        msg: 'Introduce tu contraseña',
        error: false
    }
}

export const validateSignIn = (values: validateSignInProps) => {
    let errors: SignInErrorsProps = validateSignInErrors;
    let isOk: boolean = true;

    const {
        email,
        password
    } = values

    if(!email) {
        errors = {...errors, 'email': {...errors.email, error: true}}
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors = {...errors, 'email': {...errors, error: true, msg: 'Introduce un correo electronico valido'}}
    }

    if(!password) {
        errors = {...errors, 'password': {...errors.password, error: true}}
    } else if (password.length < 8) {
        errors = {...errors, 'password': {...errors.password, error: true, msg: 'La contraseña es de al manos 8 caracteres'}}
    }

    for(const [_key, value] of Object.entries(errors)) {
        if (value.error) {
            isOk = false;
            break
        }
    }

    return {
        errors,
        isOk
    }
}