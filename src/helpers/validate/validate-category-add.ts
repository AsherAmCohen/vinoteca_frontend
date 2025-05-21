import { CategoryAddErrorProps, validateCategoryAddProps } from "../../types/validate";

const validateCategoryAddErrors: CategoryAddErrorProps = {
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
    } else if (name.trim().length < 3) {
        errors = { ...errors, 'name': { ...errors.name, error: true, msg: 'El nombre debe de contener al menos 3 letras' } }
    }

    if (!description) {
        errors = { ...errors, 'description': { ...errors.description, error: true } }
    }

    for(const [_key, value] of Object.entries(errors)) {
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