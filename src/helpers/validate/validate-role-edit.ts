import { RoleEditErrorsProps, validateRoleEditProps } from "../../types/validate";

const validateRoleEditErrors: RoleEditErrorsProps = {
    permissions: {
        msg: 'Selecciona los permisos',
        error: false
    }
}

export const validateRoleEdit = (values: validateRoleEditProps) => {
    let errors: RoleEditErrorsProps = validateRoleEditErrors
    let isOk: boolean = true

    const { permissions } = values

    if (permissions.length < 1) {
        errors = { ...errors, 'permissions': { ...errors.permissions, error: true } }
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