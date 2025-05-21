
export interface validateSignInProps {
    email: string;
    password: string;
}

type FieldErrorProps = {
    msg: string;
    error: boolean;
};

export type SignInErrorsProps = {
    [K in keyof validateSignInProps]: FieldErrorProps;
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

export type SignUpErrorsProps = {
    [K in keyof validateSignUpProps]: FieldErrorProps;
};

export interface validateWineAddProps {
    name: string;
    description: string;
    mark: string;
    category: string;
    price: string;
    stock: number;
    image: any;
}

export type WineAddErrosProps = {
    [K in keyof validateWineAddProps]: FieldErrorProps;
}

export interface validateMarkAddProps {
    name: string;
    description: string;
}

export type MarkAddErrorProps = {
    [K in keyof validateMarkAddProps]: FieldErrorProps;
}

export interface validateCategoryAddProps {
    name: string;
    description: string;
}

export type CategoryAddErrorProps = {
    [K in keyof validateCategoryAddProps]: FieldErrorProps
}

export interface validateRoleAddProps {
    name: string;
    description: string;
    permissions: []
}

export type RoleAddErrorsProps = {
    [K in keyof validateRoleAddProps]: FieldErrorProps
}