import { Autocomplete, FormLabel, TextField } from "@mui/material"
import { AutocompleteSearchProps } from "../../types/autocomplete-search"

export const AutocompleteCatalog = (props: AutocompleteSearchProps) => {
    const { api, label, id, placeholder, error, helperText, setData } = props

    // Api
    const { data, isLoading } = api();

    const options = data ? data.data : []

    const handleChange = (_e: any, value: any) => {
        setData(value)
    }

    return (
        <>
            <FormLabel
                htmlFor={id}
                error={error}
            >
                {label}
            </FormLabel>
            <Autocomplete
                id={id}
                options={options}
                autoHighlight
                loading={isLoading}
                onChange={handleChange}
                noOptionsText={options && "Escribe al menos 3 letras"}
                getOptionLabel={(option: any) => option.name}
                renderInput={
                    params => (
                        <TextField
                            {...params}
                            placeholder={placeholder}
                            fullWidth
                            error={error}
                            helperText={error && helperText}
                        />
                    )
                }
            />
        </>
    )
}