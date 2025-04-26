import { Box, Button, DialogActions, DialogContent, FormLabel, Grid, TextField } from "@mui/material"
import { FormControl } from "../../../helpers/components/form-control"
import { useRef, useState } from "react"
import { validateWineAdd } from "../../../helpers/validate/validate-wine-add";
import { NumericFormat } from "react-number-format";
import { StockMask } from "../../../helpers/mask/mask";
import { useStoreWineMutation } from "../../../store/api/api";

export const WineListAdd = () => {

    // Manejo de Errores
    const [wineErros, setWineErros] = useState<any>('');

    // Api
    const [StoreWine, {isSuccess, error}]: any = useStoreWineMutation();

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const markRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const stockRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        // Datos
        const wineData = {
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || '',
            mark: markRef.current?.value || '',
            price: priceRef.current?.value || '',
            stock: parseInt(stockRef.current?.value || ''),
        }

        // Comprobar datos
        const { isOk, errors } = validateWineAdd(wineData)
        
        setWineErros(errors)

        if (isOk) {
            StoreWine(wineData)
        } 
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='name'
                            label="Nombre"
                            type="text"
                            placeholder="Nombre del vino"
                            inputRef={nameRef}
                            error={wineErros?.name?.error}
                            helperText={wineErros?.name?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='description'
                            label="Descripción"
                            type="text"
                            placeholder="Descripción del vino"
                            inputRef={descriptionRef}
                            error={wineErros?.description?.error}
                            helperText={wineErros?.description?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <FormControl
                            id='mark'
                            label="Marca"
                            type="text"
                            placeholder="Marca del vino"
                            inputRef={markRef}
                            error={wineErros?.mark?.error}
                            helperText={wineErros?.mark?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
                        <FormLabel
                            htmlFor='price'
                            error={wineErros?.price?.error}
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
                            error={wineErros?.price?.error}
                            helperText={wineErros?.price?.error && wineErros?.price?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
                        <FormControl
                            id='stock'
                            label="Cantidad"
                            type="text"
                            placeholder="Cantidad del vino"
                            inputRef={stockRef}
                            inputComponent={StockMask}
                            error={wineErros?.stock?.error}
                            helperText={wineErros?.stock?.msg}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    type='submit'
                    variant='contained'
                >
                    Agregar vino
                </Button>
            </DialogActions>
        </Box>
    )
}