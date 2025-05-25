import { UserEditPasswordErrorsProps, validateUserEditPasswordProps } from "../../types/validate";

const validateUserEditErrors: UserEditPasswordErrorsProps = {
    password: {
        msg: 'Introduce tu contraseña actual',
        error: false
    },
    newPassword: {
        msg: 'Introduce tu nueva contraseña',
        error: false
    },
    confirmNewPassword: {
        msg: 'Confirma tu contraseña',
        error: false
    }
}

export const validateUserEditPassword = (values: validateUserEditPasswordProps) => {
    let errors: UserEditPasswordErrorsProps = validateUserEditErrors;
    let isOk: boolean = true

    const {
        password,
        newPassword,
        confirmNewPassword,
    } = values

    if (!password) {
        errors = { ...errors, 'password': { ...errors.password, error: true } }
    }

    if (!newPassword) {
        errors = { ...errors, 'newPassword': { ...errors.newPassword, error: true } }
    } else if (password === newPassword) {
        errors = { ...errors, 'newPassword': { ...errors.newPassword, error: true, msg: 'La contraseña no puede ser la misma que la actual' } }
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/.test(newPassword)) {
        errors = { ...errors, 'newPassword': { ...errors.newPassword, error: true, msg: 'La contraseña es poco segura, esta debe tener: Al menos 8 caracteres, Una mayúscula, Un número, Un símbolo' } }
    }

    if (!confirmNewPassword) {
        errors = { ...errors, 'confirmNewPassword': { ...errors.confirmNewPassword, error: true } }
    } else if (confirmNewPassword != newPassword) {
        errors = { ...errors, 'confirmNewPassword': { ...errors.confirmNewPassword, error: true, msg: 'Las contraseñas no coinciden' } }
    }

    for (const [_key, value] of Object.entries(errors)) {
        if (value.error) {
            isOk = false;
            break;
        }
    }

    return {
        errors,
        isOk
    }
}