
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

export interface validateWineEditProps {
    name: string;
    description: string;
    mark: string;
    category: string;
    price: string;
    stock: number;
}

export type WineEditErrosProps = {
    [K in keyof validateWineEditProps]: FieldErrorProps;
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

export interface validateRoleEditProps {
    permissions: [];
}

export type RoleEditErrorsProps = {
    [K in keyof validateRoleEditProps]: FieldErrorProps
}

export interface validateUserRoleEditProps {
    role: string[]
}

export type UserRoleEditErrorsProps = {
    [K in keyof validateUserRoleEditProps]: FieldErrorProps
}

export interface validateUserEditPasswordProps {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}

export type UserEditPasswordErrorsProps = {
    [K in keyof validateUserEditPasswordProps]: FieldErrorProps
}


export interface validateUserDataChangeProps {
    name: string;
    lastname: string;
    phone: string;
    address: string;
}

export type UserDataChangeErrorsProps = {
    [K in keyof validateUserDataChangeProps]: FieldErrorProps;
};