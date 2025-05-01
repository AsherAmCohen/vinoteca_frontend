import { Autocomplete, debounce, FormLabel, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { AutocompleteSearchProps } from "../../types/autocomplete-search"

export const AutocompleteSearch = (props: AutocompleteSearchProps) => {
    const { api, label, id, placeholder, error, helperText, setData } = props

    const [inputSearch, setInputSearch] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')

    // Api
    const [search, { data, isLoading }] = api();

    const options = data ? data.data : []

    // Busqueda
    useEffect(() => {
        let active = true;
        if (inputValue.length >= 3) {
            if (active) {
                search(inputValue)
            }
        }
        return () => {
            active = false
        }
    }, [inputSearch])

    const debounceOnChange = useCallback(
        debounce(value => {
            setInputSearch(value)
        }, 400), []
    )

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
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                debounceOnChange(e.target.value)
                            }}
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