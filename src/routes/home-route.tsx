import { Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

export const HomeRoute = () => {
    const { loading } = useAuth()

    if (loading) return <>Cargando...</>
    return <Outlet />
}