import { FormLabel, TextField } from "@mui/material"
import { FormControlProps } from "../../types/form-control"
import MuiFormControl from "@mui/material/FormControl"

export const FormControl = (props: FormControlProps) => {
    const {
        id,
        type,
        label,
        placeholder,
        autoFocus,
        inputRef,
        error,
        helperText,
        inputComponent
    } = props


    return (
        <MuiFormControl>
            <FormLabel
                htmlFor={id}
                error={error}
            >{label}</FormLabel>
            <TextField
                id={id}
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                inputRef={inputRef}
                error={error}
                helperText={error && helperText}
                required
                InputProps={{
                    inputComponent: inputComponent
                }}
            />
        </MuiFormControl>
    )
}