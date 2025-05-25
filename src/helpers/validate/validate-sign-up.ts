import { SignUpErrorsProps, validateSignUpProps } from "../../types/validate";

const esFechaValida = (fechaStr: string): boolean => {
    // Verificamos el formato con una expresión regular
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(fechaStr)) return false;

    // Verificamos que sea una fecha real
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia); // mes es base 0 en JS

    return (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia
    );
}

const comprobarMayoriaEdad = (fechaNacimientoStr: string): boolean => {
    const hoy = new Date();
    const [anio, mes, dia] = fechaNacimientoStr.split('-').map(Number);
    const nacimiento = new Date(anio, mes - 1, dia);

    // Fecha en la que cumple 18
    const cumple18 = new Date(nacimiento);
    cumple18.setFullYear(cumple18.getFullYear() + 18);

    // Comparar fechas
    return hoy >= cumple18;
}



const validateSignUpErrors: SignUpErrorsProps = {
    name: {
        msg: 'Introduce tu nombre(s)',
        error: false
    },
    lastname: {
        msg: 'Introduce tu apellido(s)',
        error: false
    },
    gender: {
        msg: 'Selecciona tu genero',
        error: false
    },
    birthdate: {
        msg: 'Introduce tu fecha de nacimiento',
        error: false
    },
    email: {
        msg: 'Introduce tu correo electronico',
        error: false
    },
    phone: {
        msg: 'Introduce tu número telefonico',
        error: false
    },
    address: {
        msg: 'Introduce tu domicilio',
        error: false
    },
    password: {
        msg: 'Introduce tu contraseña',
        error: false
    },
    confirm_password: {
        msg: 'Confirma tu contraseña',
        error: false
    }
}

export const validateSignUp = (values: validateSignUpProps) => {
    let errors: SignUpErrorsProps = validateSignUpErrors;
    let isOk: boolean = true;

    const {
        name,
        lastname,
        gender,
        birthdate,
        email,
        phone,
        address,
        password,
        confirm_password,
    } = values

    if (!name) {
        errors = { ...errors, 'name': { ...errors.name, error: true } }
    }

    if (!lastname) {
        errors = { ...errors, 'lastname': { ...errors.lastname, error: true } }
    }

    if (!birthdate) {
        errors = { ...errors, 'birthdate': { ...errors.birthdate, error: true } }
    } else if (!esFechaValida(birthdate)) {
        errors = {...errors, 'birthdate': { ...errors.birthdate, error: true, msg: 'Introduce una fecha válida (ej. 15/05/1990)' }}
    } else if(!comprobarMayoriaEdad(birthdate)) {
        errors = {...errors, 'birthdate': { ...errors.birthdate, error: true, msg: 'Debes de tener la mayoria de edad para poder crear una cuenta' }}
    }

    if (!gender) {
        errors = { ...errors, 'gender': { ...errors.gender, error: true } }
    }

    if (!email) {
        errors = { ...errors, 'email': { ...errors.email, error: true } }
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors = { ...errors, 'email': { ...errors, error: true, msg: 'Introduce un correo electronico valido' } }
    }

    if (!phone) {
        errors = { ...errors, 'phone': { ...errors.phone, error: true } }
    } else if (!/^\d{3} \d{2} \d{2} \d{2}$/.test(phone)) {
        errors = { ...errors, 'phone': { ...errors.phone, error: true, msg: 'Introduce un número telefonico correcto' } }
    }

    if (!address) {
        errors = { ...errors, 'address': { ...errors.address, error: true } }
    }

    if (!password) {
        errors = { ...errors, 'password': { ...errors.password, error: true } }
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/.test(password)) {
        errors = { ...errors, 'password': { ...errors.password, error: true, msg: 'La contraseña es poco segura, esta debe tener: Al menos 8 caracteres, Una mayúscula, Un número, Un símbolo' } }
    }

    if (!confirm_password) {
        errors = { ...errors, 'confirm_password': { ...errors.confirm_password, error: true } }
    } else if (confirm_password != password) {
        errors = { ...errors, 'confirm_password': { ...errors.confirm_password, error: true, msg: 'Las contraseñas no coinciden' } }
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