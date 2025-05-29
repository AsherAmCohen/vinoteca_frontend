import { Alert, Box, Button, DialogActions, DialogContent, Grid } from "@mui/material"
import { FormControl } from "../../../../helpers/components/form-control"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useUpdateCategoryMutation } from "../../../../store/api/api"
import { validateCategoryAdd } from "../../../../helpers/validate/validate-category-add"
import { closeModalAction } from "../../../../store/slice/UI/slice"

export const WineCategoryEdit = (props: any) => {
    const { id, name, description } = props.args
    const dispatch = useDispatch()

    // Manejo de errores
    const [categoryErrors, setCategoryErrors] = useState<any>('')

    // Api
    const [UpdateCategory, { isLoading, isSuccess, error }]: any = useUpdateCategoryMutation()

    // Referencias para obtener los datos
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)


    const handleClose = () => {
        dispatch(closeModalAction())
    }

    useEffect(() => {
        if (isSuccess) setTimeout(() => handleClose(), 1000)
    }, [isSuccess])

    // Enviar datos
    const handleSubmit = () => {
        // Evita que se recarge la pagina
        event?.preventDefault()

        // Datos
        const categoryData: any = {
            id: id,
            name: nameRef.current?.value || '',
            description: descriptionRef.current?.value || '',
        }

        // Validar si los datos son correctos
        const { isOk, errors } = validateCategoryAdd(categoryData)

        setCategoryErrors(errors)

        if (isOk) {
            UpdateCategory(categoryData)
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
        >
            {isSuccess &&
                <Alert severity='success'>
                    Categoria modificada
                </Alert>
            }
            {error &&
                <Alert severity='error'>
                    {error.data.msg || 'Error al modificar la categoria'}
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
                            error={categoryErrors?.name?.error}
                            helperText={categoryErrors?.name?.msg}
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
                    Editar categoria
                </Button>
            </DialogActions>
        </Box>
    )
}