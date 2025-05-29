import { Alert, Box, Button, DialogActions, DialogContent, Grid } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useUpdateMarkMutation } from "../../../../store/api/api"
import { closeModalAction } from "../../../../store/slice/UI/slice"
import { validateMarkAdd } from "../../../../helpers/validate/validate-mark-add"
import { FormControl } from "../../../../helpers/components/form-control"

export const WineMarkEdit = (props: any) => {
    const { id, name, description } = props.args
    const dispatch = useDispatch()

    // Manejo de errores
    const [markErrors, setMarkErrors] = useState<any>('')

    // Api
    const [UpdateMark, { isLoading, isSuccess, error }] = useUpdateMarkMutation()

    // Referecias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

    const handleClose = () => {
        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    })

    // Enviar datos
    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        // Datos
        const markData: any = {
            id: id,
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || '',
        }

        const { isOk, errors } = validateMarkAdd(markData)

        setMarkErrors(errors)

        if (isOk) {
            UpdateMark(markData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Marca modificada
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al modificar la marca
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={name}
                            id='name'
                            label='Nombre'
                            type='text'
                            placeholder="Nombre de la categoria"
                            autoFocus
                            inputRef={nameRef}
                            error={markErrors?.name?.error}
                            helperText={markErrors?.name?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            defaultValue={description}
                            id='description'
                            label='Descripción'
                            type='text'
                            placeholder="Descripción de la categoria"
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
                    type='submit'
                    variant='contained'
                >
                    Editar categoria
                </Button>
            </DialogActions>
        </Box>
    )
}