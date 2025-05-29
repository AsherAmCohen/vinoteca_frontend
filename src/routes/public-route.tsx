import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth-context"

export const PublicRoute = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) return <>Cargando...</>
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}