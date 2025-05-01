import { Alert, Box, Button, DialogActions, DialogContent, Grid } from "@mui/material"
import { FormControl } from "../../../../helpers/components/form-control"
import { useEffect, useRef, useState } from "react"
import { validateMarkAdd } from "../../../../helpers/validate/validate-mark-add"
import { useCreateMarkMutation } from "../../../../store/api/api"
import { useDispatch } from "react-redux"
import { closeModalAction } from "../../../../store/slice/UI/slice"
import { setMarkActions } from "../../../../store/slice/vinoteca/slice"

export const WineMarkAdd = () => {
    const dispatch = useDispatch()

    // Manejo de errores
    const [markErrors, setMarkErrors] = useState<any>('')

    // Api
    const [CreateMark, { isLoading, isSuccess, error }] = useCreateMarkMutation()

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setMarkActions(payload))

        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    const handleSubmit = () => {
        // Evita que se recargue la pagina
        event?.preventDefault()

        // Datos
        const markData: any = {
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || ''
        }

        // Comprobar datos
        const { isOk, errors } = validateMarkAdd(markData)

        setMarkErrors(errors)

        if (isOk) {
            CreateMark(markData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Marca guardada
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al guardar la marca
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='name'
                            label='Nombre'
                            type='text'
                            placeholder="Nombre de la marca"
                            inputRef={nameRef}
                            autoFocus
                            error={markErrors?.name?.error}
                            helperText={markErrors?.name?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='description'
                            label='Descripción'
                            type='text'
                            placeholder="Descripción de la marca"
                            inputRef={descriptionRef}
                            error={markErrors?.description?.error}
                            helperText={markErrors?.description?.msg}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    disabled={isSuccess}
                    loading={isLoading}
                    type="submit"
                    variant='contained'
                >
                    Agregar marca
                </Button>
            </DialogActions>
        </Box>
    )
}