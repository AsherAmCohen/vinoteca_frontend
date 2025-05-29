import { Alert, Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material"
import { FormControl } from "../../../../helpers/components/form-control"
import { useEffect, useRef, useState } from "react"
import { validateWineAdd } from "../../../../helpers/validate/validate-wine-add";
import { NumericFormat } from "react-number-format";
import { StockMask } from "../../../../helpers/mask/mask";
import { useAllCategorysQuery, useAllMarksQuery, useStoreWineMutation } from "../../../../store/api/api";
import { AutocompleteCatalog } from "../../../../helpers/components/autocomplete-catalog";
import { useDispatch } from "react-redux";
import { closeModalAction } from "../../../../store/slice/UI/slice";
import { setWineListActions } from "../../../../store/slice/vinoteca/slice";

export const WineListAdd = () => {
    const dispatch = useDispatch()

    // Manejo de Errores
    const [wineErrors, setWineErrors] = useState<any>('');

    // Manejo de autocomplete
    const [mark, setMark] = useState<any>()
    const [category, setCategory] = useState<any>()

    // Api
    const [StoreWine, { isLoading, isSuccess, error }] = useStoreWineMutation();

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const stockRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setWineListActions(payload))

        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        // Datos
        const wineData: any = {
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || '',
            mark: mark || '',
            category: category || '',
            price: priceRef.current?.value || '',
            stock: parseInt(stockRef.current?.value || ''),
            image: imageRef.current?.files?.[0] || null,
        }

        // Comprobar datos
        const { isOk, errors } = validateWineAdd(wineData)

        setWineErrors(errors)

        if (isOk) {
            // Crear un objeto FormData para enviar al backend
            const formData = new FormData();
            formData.append('name', wineData.name);
            formData.append('description', wineData.description);
            formData.append('mark', wineData.mark.id);
            formData.append('category', wineData.category.id);
            formData.append('price', wineData.price);
            formData.append('stock', wineData.stock);
            if (wineData.image) {
                formData.append('image', wineData.image); // Agregar la imagen al FormData
            }

            StoreWine(formData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Vino guardado
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al guardar el vino
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
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
                            api={useAllMarksQuery}
                            label="Marca"
                            id='mark'
                            placeholder="Marca del vino"
                            error={wineErrors?.mark?.error}
                            helperText={wineErrors?.mark?.msg}
                            setData={setMark}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 3 }}>
                        <AutocompleteCatalog
                            api={useAllCategorysQuery}
                            label="Categoria"
                            id='category'
                            placeholder="Categoria del vino"
                            error={wineErrors?.category?.error}
                            helperText={wineErrors?.category?.msg}
                            setData={setCategory}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 3 }}>
                        <FormLabel
                            htmlFor='price'
                            error={wineErrors?.price?.error}
                        >
                            Precio</FormLabel>
                        <NumericFormat
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
                    type='submit'
                    variant='contained'
                >
                    Agregar vino
                </Button>
            </DialogActions>
        </Box>
    )
}