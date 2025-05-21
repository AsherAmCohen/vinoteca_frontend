import { ReactNode } from "react";
import { useAuth } from "../../auth-context";

export interface HasPermissions {
    permission: string;
    children: ReactNode;
}

export const HasPermissions = (props: HasPermissions) => {
    const { permission, children } = props

    const { hasPermission } = useAuth()

    const authorized = hasPermission(permission)

    if(!authorized) {
        return null
    }
    
    return (
        <>
            {children}
        </>
    )
}