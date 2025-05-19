import { AppBar, Badge, Box, Container, IconButton, styled, Tooltip } from "@mui/material"
import { MyToolBar } from "../../styles/theme/components/my-tool-bar"
import { ScrollButton } from "./scroll-button"
import { ToolBarProps } from "../../types/tool-bar"
import { UserCircle as UserCircleIcon } from "@phosphor-icons/react"
import { ShoppingCart as ShoppingCartIcon } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth-context"
import { ShoppingCartPopover } from "./shopping-cart-popover"
import { usePopover } from "../../hooks/use-popover"
import { useCountProductsQuery } from "../../store/api/api"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export const ToolBar = (props: ToolBarProps) => {
    // Manejo de las secciones
    const { homeRef, historyRef, winelistRef } = props;
    // Contador del carrito
    const [countShopping, setCountShopping] = useState<any>(0)
    const shoppingCartPopover = usePopover<HTMLDivElement>();

    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth()

    // Datos del usuario
    const { shoppingCart } = useSelector((state: any) => state.Auth.user || {})

    // Si el usuario está autenticado, obtener conteo desde API
    const { data } = useCountProductsQuery(
        { shoppingCartId: shoppingCart },
        { skip: !isAuthenticated }
    )

    // Si está autenticado, actualiza el contador cuando llegue la data
    useEffect(() => {
        if (isAuthenticated && data?.data != null) {
            setCountShopping(data.data)
        }
    }, [isAuthenticated, data])

    // Si NO está autenticado, contar productos desde Redux (carrito local)
    const { wines } = useSelector((state: any) => state.ShoppingCart)

    useEffect(() => {
        if (!isAuthenticated) {
            const total = wines.reduce((sum: number, wine: any) => sum + wine.amount, 0)
            setCountShopping(total)
        }
    }, [isAuthenticated, wines])

    const navigate = useNavigate()

    const handleUser = () => {
        navigate('/SignIn')
    }

    return (
        <>
            <AppBar
                position='fixed'
                enableColorOnDark
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 'calc(var(--vinoteca-frame-height, 0px) + 28px)'
                }}
            >
                <Container maxWidth='lg'>
                    <MyToolBar variant='dense' disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                px: 0
                            }}
                        >
                            <Box
                                sx={{ mr: 1 }}
                            >
                                <img
                                    src="/logo.png"
                                    width='50wv'
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'flex'
                                    }
                                }}
                            >
                                <ScrollButton
                                    label='Inicio'
                                    section={homeRef}
                                />

                                <ScrollButton
                                    label='Historia'
                                    section={historyRef}
                                />

                                <ScrollButton
                                    label='Vinos'
                                    section={winelistRef}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                variant={isAuthenticated ? 'dot' : 'standard'}
                            >
                                <Tooltip title='Usuario'>
                                    <IconButton
                                        sx={{
                                            color: 'var(--Vinoteca-Background-Light)',
                                            '&:hover': {
                                                color: 'var(--Vinoteca-Background-Dark)',
                                                background: 'var(--Vinoteca-Background-Light)'
                                            }
                                        }}
                                        onClick={handleUser}
                                    >
                                        <UserCircleIcon />
                                    </IconButton>
                                </Tooltip>
                            </StyledBadge>

                            <Tooltip title='Carrito'>
                                <IconButton
                                    sx={{
                                        color: 'var(--Vinoteca-Background-Light)',
                                        '&:hover': {
                                            color: 'var(--Vinoteca-Background-Dark)',
                                            background: 'var(--Vinoteca-Background-Light)'
                                        }
                                    }}
                                    onClick={shoppingCartPopover.handleOpen}
                                    ref={shoppingCartPopover.anchorRef}
                                >
                                    <Badge
                                        badgeContent={countShopping > 0 ? countShopping : null}
                                        color='warning'
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </MyToolBar>
                </Container>
            </AppBar>
            <ShoppingCartPopover
                anchorEl={shoppingCartPopover.anchorRef.current}
                open={shoppingCartPopover.open}
                onClose={shoppingCartPopover.handleClose}
            />
        </>
    )
}