import { Alert, Box, Button, DialogActions, DialogContent, Grid } from "@mui/material"
import { FormControl } from "../../../../helpers/components/form-control"
import { useEffect, useRef, useState } from "react"
import { validateCategoryAdd } from "../../../../helpers/validate/validate-category-add";
import { useDispatch } from "react-redux";
import { useCreateCategoryMutation } from "../../../../store/api/api";
import { closeModalAction } from "../../../../store/slice/UI/slice";
import { setCategoryActions } from "../../../../store/slice/vinoteca/slice";

export const WineCategoryAdd = () => {
    const dispatch = useDispatch()

    // Manejo de errores
    const [categoryErrors, setCategoryErrors] = useState<any>('')

    // Api
    const [CreateCategory, { isLoading, isSuccess, error }] = useCreateCategoryMutation()

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        const payload: any = {
            value: 0,
            key: 'page'
        }
        dispatch(setCategoryActions(payload))

        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    const handleSubmit = () => {
        // Evita que la pagina se recargue
        event?.preventDefault()

        // Datos
        const categoryData: any = {
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || ''
        }

        // Comprobar datos
        const { isOk, errors } = validateCategoryAdd(categoryData)

        setCategoryErrors(errors)

        if (isOk) {
            CreateCategory(categoryData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Categoria guardada
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    Error al guardar la categoria
                </Alert>
            }
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='name'
                            label='Nombre'
                            type='text'
                            placeholder="Nombre de la categoria"
                            autoFocus
                            inputRef={nameRef}
                            error={categoryErrors?.name?.error}
                            helperText={categoryErrors?.name?.msg}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl
                            id='description'
                            label='Descripción'
                            type='text'
                            placeholder="Descripción de la categoria"
                            inputRef={descriptionRef}
                            error={categoryErrors?.description?.error}
                            helperText={categoryErrors?.description?.msg}
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
                    Agregar categoria
                </Button>
            </DialogActions>
        </Box>
    )
}