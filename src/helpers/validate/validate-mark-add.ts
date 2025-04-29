import { MarkAddErrorProps, validateMarkAddProps } from "../../types/validate";

export const validateMarkAddErrors: MarkAddErrorProps = {
    name: {
        msg: 'Introduce el nombre de la empresa',
        error: false
    },
    description: {
        msg: 'Introduce la descripción de la empresa',
        error: false
    }
}

export const validateMarkAdd = (values: validateMarkAddProps) => {
    let errors: MarkAddErrorProps = validateMarkAddErrors;
    let isOk: boolean = true

    const {
        name,
        description
    } = values

    // Validar
    if (!name) {
        errors = { ...errors, 'name': { ...errors.name, error: true } }
    }

    if (!description) {
        errors = { ...errors, 'description': { ...errors.description, error: true } }
    }

    for(const [key, value] of Object.entries(errors)) {
        if(value.error) {
            isOk = false
            break;
        }
    }

    return {
        errors,
        isOk
    }
}