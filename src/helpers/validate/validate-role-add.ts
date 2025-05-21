import { RoleAddErrorsProps, validateRoleAddProps } from "../../types/validate";

const validateRoleAddErrors: RoleAddErrorsProps = {
    name: {
        msg: 'Introduce el nombre del rol',
        error: false
    },
    description: {
        msg: 'Introduce la descripción del rol',
        error: false
    },
    permissions: {
        msg: 'Selecciona los permisos del rol',
        error: false
    }
}

export const validateRoleAdd = (values: validateRoleAddProps) => {
    let errors: RoleAddErrorsProps = validateRoleAddErrors
    let isOk: boolean = true

    const {
        name,
        description,
        permissions
    } = values

    if (!name) {
        errors = { ...errors, 'name': { ...errors.name, error: true } }
    }

    if (!description) {
        errors = { ...errors, 'description': { ...errors.description, error: true } }
    }

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