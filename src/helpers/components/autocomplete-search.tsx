import { Autocomplete, createFilterOptions, debounce, FormLabel, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { AutocompleteSearchProps } from "../../types/autocomplete-search"

const filter = createFilterOptions<any>();

export const AutocompleteSearch = (props: AutocompleteSearchProps) => {
    const { api, label, id, placeholder, error, helperText, add, inputRef } = props

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
                noOptionsText={options && "Escribe al menos 3 letras"}
                getOptionLabel={(option: any) => {
                    if (typeof option === 'string') {
                        return option;
                    }

                    if (option.inputValue) {
                        return option.inputValue
                    }

                    return option.name
                }}
                filterOptions={(options, params) => {
                    if (!add) {
                        return options
                    } else {
                        const filtered = filter(options, params);
                        const { inputValue } = params;

                        const isExisting = options.some((option) => inputValue === option.name);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push({
                                inputValue,
                                name: `Agregar "${inputValue}"`
                            })
                        }

                        return filtered
                    }
                }}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            {option.name}
                        </li>
                    );
                }}
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
                            inputRef={inputRef}
                        />
                    )
                }
            />
        </>
    )
}