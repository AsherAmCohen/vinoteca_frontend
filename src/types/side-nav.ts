export interface NavItemConfigProps {
    key: string;
    title?: string;
    disabled?: boolean;
    external?: boolean;
    label?: string;
    icon?: string;
    href?: string;
    items?: NavItemConfigProps[]
    matcher?: {
        type: 'startsWith' | 'equals';
        href: string
    }
    permissions?: string[]
}

export interface RenderNavItemsProps {
    items?: NavItemConfigProps[],
    pathname: string;
    userPermissions: string[]
}

export interface NavItemProps extends Omit<NavItemConfigProps, 'items'> {
    pathname: string;
}