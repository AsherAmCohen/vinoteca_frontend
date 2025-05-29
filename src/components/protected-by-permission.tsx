import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
    permission: string[]; // Ej: ["can_view_admin_panel"]
}

export const ProtectedByPermission = ({ children, permission }: Props) => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.Auth.user);
    const isAuthenticated = useSelector((state: any) => state.Auth.isAuthenticated);

    const userPermissions: string[] = user?.permissions || [];

    const hasPermission = permission.every((perm) => userPermissions.includes(perm));

    useEffect(() => {
        if (!isAuthenticated || !hasPermission) {
            navigate("/user", { replace: true });
        }
    }, [isAuthenticated, hasPermission, navigate]);

    return <>{children}</>;
};