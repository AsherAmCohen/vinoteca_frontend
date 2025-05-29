export interface FormControlProps {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    autoFocus?: boolean;
    inputRef?: any;
    error?: boolean;
    helperText?: string;
    inputComponent?: any;
    defaultValue?: any
}