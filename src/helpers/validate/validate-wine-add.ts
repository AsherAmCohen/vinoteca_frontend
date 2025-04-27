import { validateWineAddProps, WineAddErros } from "../../types/validate";

export const validateWineAddErros: WineAddErros = {
    name: {
        msg: 'Introduce el nombre del vino',
        error: false
    },
    description: {
        msg: 'Introduce una descripción del vino',
        error: false
    },
    mark: {
        msg: 'Selecciona la marca del vino',
        error: false
    },
    price: {
        msg: 'Introduce el precio del vino',
        error: false
    },
    stock: {
        msg: 'Introduce la cantidad de vinos disponibles',
        error: false
    },
    image: {
        msg: 'Selecciona una imagen representativa del vino',
        error: false
    }
}

export const validateWineAdd = (values: validateWineAddProps) => {
    let errors: WineAddErros = validateWineAddErros;
    let isOk: boolean = true;

    const {
        name,
        description,
        mark,
        price,
        stock,
        image
    } = values

    const normalized = price
        .replace(/[€\s]/g, '') // elimina € y espacios
        .replace(/\./g, '')    // elimina puntos (miles)
        .replace(',', '.');    // cambia coma por punto (decimales)

    const floatPrice = parseFloat(normalized); // ahora sí es un número JS real

    // Vilidar 
    if (!name) {
        errors = { ...errors, 'name': { ...errors.name, error: true } }
    }

    if (!description) {
        errors = { ...errors, 'description': { ...errors.name, error: true } }
    }

    if (!mark) {
        errors = { ...errors, 'mark': { ...errors.mark, error: true } }
    }

    if (!floatPrice) {
        errors = { ...errors, 'price': { ...errors.price, error: true } }
    }

    if (!stock) {
        errors = { ...errors, 'stock': { ...errors.stock, error: true } }
    }

    if(!image) {
        errors = {...errors, 'image': {...errors.image, error: true}}
    }

    for (const [key, value] of Object.entries(errors)) {
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