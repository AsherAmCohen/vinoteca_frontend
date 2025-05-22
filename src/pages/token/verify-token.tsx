import { useNavigate, useSearchParams } from "react-router-dom"
import { useVerifyUserMutation } from "../../store/api/api";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Warning as WarningIcon } from "@phosphor-icons/react";
import { CheckCircle as CheckCircleIcon } from "@phosphor-icons/react";
import { WarningDiamond as WarningDiamondIcon } from "@phosphor-icons/react";
import { useAuth } from "../../auth-context";

export const VerifyEmail = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    // Cerrar sesión si es necesarios
    const { logout } = useAuth();

    const [verifyEmail, { isLoading, isSuccess, error }]: any = useVerifyUserMutation()

    useEffect(() => {
        if (!token) return;

        verifyEmail({ token: token })
    }, [token])

    const redirect = () => {
        logout()
        navigate('/')
    }

    useEffect(() => {
        if (isSuccess || error) setTimeout(() => redirect(), 2000)
    }, [isSuccess, error])

    if (isLoading) {
        return (
            <Box
                position="fixed"
                top="50%"
                left="50%"
                sx={{
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
            >
                <WarningIcon fontSize={200} color='var(--vinoteca-palette-warning-main)' />
                <Typography variant="caption" sx={{ mt: 1, fontSize: '20px', color: '#333' }}>
                    Validatendo Token
                </Typography>
            </Box>
        )
    }

    if (isSuccess) {
        return (
            <Box
                position="fixed"
                top="50%"
                left="50%"
                sx={{
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
            >
                <CheckCircleIcon fontSize={200} color='var(--vinoteca-palette-success-main)' />
                <Typography variant="caption" sx={{ mt: 1, fontSize: '20px', color: '#333' }}>
                    Correo verificado
                </Typography>
            </Box>
        )
    }

    if (error) {
        return (
            <Box
                position="fixed"
                top="50%"
                left="50%"
                sx={{
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
            >
                <WarningDiamondIcon fontSize={200} color='var(--vinoteca-palette-error-main)' />
                <Typography variant="caption" sx={{ mt: 1, fontSize: '20px', color: '#333' }}>
                    {error.data.msg}
                </Typography>
            </Box>
        )
    }

    return (
        <>
        </>
    )
}