import { MarkAddErrorProps, validateMarkAddProps } from "../../types/validate";

const validateMarkAddErrors: MarkAddErrorProps = {
    name: {
        msg: 'Introduce el nombre de la marca',
        error: false
    },
    description: {
        msg: 'Introduce la descripción de la marca',
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
    } else if (name.trim().length < 3) {
        errors = { ...errors, 'name': { ...errors.name, error: true, msg: 'El nombre debe de contener al menos 3 letras' } }
    }

    if (!description) {
        errors = { ...errors, 'description': { ...errors.description, error: true } }
    }

    for(const [_key, value] of Object.entries(errors)) {
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