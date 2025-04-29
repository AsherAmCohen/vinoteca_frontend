import { CategoryAddErrorProps, validateCategoryAddProps } from "../../types/validate";

export const validateCategoryAddErrors: CategoryAddErrorProps = {
    name: {
        msg: 'Introduce el nombre de la categoria',
        error: false
    },
    description: {
        msg: 'Introduce la descripción de la empresa',
        error: false
    }
}

export const validateCategoryAdd = (values: validateCategoryAddProps) => {
    let errors: CategoryAddErrorProps = validateCategoryAddErrors;
    let isOk: boolean = true;

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
        if(value.error){
            isOk = false;
            break;
        }
    }

    return {
        errors,
        isOk
    }
}