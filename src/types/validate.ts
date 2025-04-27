
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

export interface validateSignUpProps {
    name: string;
    lastname: string;
    gender: string;
    birthdate: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    confirm_password: string;
}

export type SignUpErrors = {
    [K in keyof validateSignUpProps]: FieldError;
};

export interface validateWineAddProps {
    name: string;
    description: string;
    mark: string;
    price: string;
    stock: number;
    image: any;
}

export type WineAddErros = {
    [K in keyof validateWineAddProps]: FieldError;
}