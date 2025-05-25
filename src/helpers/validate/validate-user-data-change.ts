import { UserDataChangeErrorsProps, validateUserDataChangeProps } from "../../types/validate";

const validateUserDataChangeErrors: UserDataChangeErrorsProps = {
    name: {
        msg: 'Introduce tu nombre(s)',
        error: false
    },
    lastname: {
        msg: 'Introduce tu apellido(s)',
        error: false
    },
    phone: {
        msg: 'Introduce tu número telefonico',
        error: false
    },
    address: {
        msg: 'Introduce tu domicilio',
        error: false
    }
}

export const validateUserDataChange = (values: validateUserDataChangeProps) => {
    let errors: UserDataChangeErrorsProps = validateUserDataChangeErrors;
    let isOk: boolean = true;

    const {
        name,
        lastname,
        phone,
        address
    } = values

    if (!name) {
        errors = { ...errors, 'name': { ...errors.name, error: true } }
    }

    if (!lastname) {
        errors = { ...errors, 'lastname': { ...errors.lastname, error: true } }
    }

    if (!phone) {
        errors = { ...errors, 'phone': { ...errors.phone, error: true } }
    } else if (!/^\d{3} \d{2} \d{2} \d{2}$/.test(phone)) {
        errors = { ...errors, 'phone': { ...errors.phone, error: true, msg: 'Introduce un número telefonico correcto' } }
    }

    if (!address) {
        errors = { ...errors, 'address': { ...errors.address, error: true } }
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