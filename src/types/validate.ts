
export interface validateSignInProps {
    email: string;
    password: string;
}

type FieldError = {
    msg: string;
    error: boolean;
};

export type SignInErrors = {
    [K in keyof validateSignInProps]: FieldError;
};