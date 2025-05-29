import { UserRoleEditErrorsProps, validateUserRoleEditProps } from "../../types/validate";

const validateUserRoleEditErrors: UserRoleEditErrorsProps = {
    role: {
        msg: 'Selecciona el rol del usuario',
        error: false
    }
}

export const validateUserRoleEdit = (values: validateUserRoleEditProps) => {
    let errors: UserRoleEditErrorsProps = validateUserRoleEditErrors
    let isOk: boolean = true

    const {role} = values

    if(role.length) {
        errors = {...errors, 'role': {...errors.role, error: true}}
    }

    for (const [_key, value] of Object.entries(errors)) {
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