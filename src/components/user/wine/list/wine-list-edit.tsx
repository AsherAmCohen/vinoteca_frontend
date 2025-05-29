import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModalAction } from "../../../../store/slice/UI/slice";
import { Alert, Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material";
import { FormControl } from "../../../../helpers/components/form-control";
import { AutocompleteCatalog } from "../../../../helpers/components/autocomplete-catalog";
import { NumericFormat } from "react-number-format";
import { useAllCategorysQuery, useAllMarksQuery, useUpdateWineMutation } from "../../../../store/api/api";
import { StockMask } from "../../../../helpers/mask/mask";
import { validateWineEdit } from "../../../../helpers/validate/validate-wine-edit";

interface Props {
    args: {
        id: any;
        name: string;
        description: string;
        category: string;
        mark: string;
        price: string;
        stock: string;
    }
}

export const WineListEdit = (props: Props) => {
    const { id, name, description, category, mark, price, stock } = props.args
    const dispatch = useDispatch()

    // Manejo de errores
    const [wineErrors, setWineErrors] = useState<any>('')

    // Api
    const [updateWine, { isLoading, isSuccess, error }]: any = useUpdateWineMutation()

    // Manejo de autocomplete
    const [newMark, setNewMark] = useState<any>()
    const [newCategory, setNewCategory] = useState<any>()

    // Cargar los datos
    useEffect(() => {
        setNewMark(mark)
        setNewCategory(category)
    }, [category, mark])

    // Referencias para obtener datos
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const stockRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        const wineData: any = {
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || '',
            mark: newMark || '',
            category: newCategory || '',
            price: priceRef.current?.value || '',
            stock: parseInt(stockRef.current?.value || ''),
            image: imageRef.current?.files?.[0] || null,
        }

        // Comprobar datos
        const { isOk, errors } = validateWineEdit(wineData)

        setWineErrors(errors)

        if (isOk) {
            // Crear un objeto FormData para enviar al backend
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', wineData.name);
            formData.append('description', wineData.description);
            formData.append('mark', wineData.mark.id);
            formData.append('category', wineData.category.id);
            formData.append('price', wineData.price);
            formData.append('stock', wineData.stock);
            if (wineData.image) {
                formData.append('image', wineData.image); // Agregar la imagen al FormData
            }

            updateWine(formData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Vino modificado
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    {error.data.msg || 'Error al modificar el vino'}
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={name}
                            id='name'
                            label="Nombre"
                            type="text"
                            placeholder="Nombre del vino"
                            inputRef={nameRef}
                            autoFocus
                            error={wineErrors?.name?.error}
                            helperText={wineErrors?.name?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={description}
                            id='description'
                            label="Descripción"
                            type="text"
                            placeholder="Descripción del vino"
                            inputRef={descriptionRef}
                            error={wineErrors?.description?.error}
                            helperText={wineErrors?.description?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 3 }}>
                        <AutocompleteCatalog
                            defaultValue={mark}
                            api={useAllMarksQuery}
                            label="Marca"
                            id='mark'
                            placeholder="Marca del vino"
                            error={wineErrors?.mark?.error}
                            helperText={wineErrors?.mark?.msg}
                            setData={setNewMark}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 3 }}>
                        <AutocompleteCatalog
                            defaultValue={category}
                            api={useAllCategorysQuery}
                            label="Categoria"
                            id='category'
                            placeholder="Categoria del vino"
                            error={wineErrors?.category?.error}
                            helperText={wineErrors?.category?.msg}
                            setData={setNewCategory}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 3 }}>
                        <FormLabel
                            htmlFor='price'
                            error={wineErrors?.price?.error}
                        >
                            Precio
                        </FormLabel>
                        <NumericFormat
                            value={price}
                            id='price'
                            fullWidth
                            placeholder="Precio del vino"
                            customInput={TextField}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="€"
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowNegative={false}
                            displayType="input"
                            inputRef={priceRef}
                            error={wineErrors?.price?.error}
                            helperText={wineErrors?.price?.error && wineErrors?.price?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 3 }}>
                        <FormControl
                            defaultValue={stock}
                            id='stock'
                            label="Cantidad"
                            type="text"
                            placeholder="Cantidad del vino"
                            inputRef={stockRef}
                            inputComponent={StockMask}
                            error={wineErrors?.stock?.error}
                            helperText={wineErrors?.stock?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 12 }}>
                        <FormLabel
                            htmlFor='image'
                            error={wineErrors?.image?.error}
                        >
                            Imagen
                        </FormLabel>
                        <TextField
                            type='file'
                            variant='outlined'
                            id='image'
                            fullWidth
                            inputProps={{
                                accept: ".jpg, jpeg, .png" // Solo acepta imagenes
                            }}
                            inputRef={imageRef}
                            sx={{
                                '& input': {
                                    padding: 0,
                                    height: '56px',  // La altura estándar de un TextField
                                },
                                '& input::file-selector-button': {
                                    height: '100%',
                                    backgroundColor: 'var(--vinoteca-palette-neutral-950)',
                                    color: 'var(--vinoteca-palette-common-white)',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    mr: 2,
                                    padding: '20px',
                                },
                            }}
                            error={wineErrors?.image?.error}
                            helperText={wineErrors?.image?.error && wineErrors?.image?.msg}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={isSuccess}
                    loading={isLoading}
                    variant='contained'
                    type="submit"
                >
                    Editar vino
                </Button>
            </DialogActions>
        </Box>
    )
}