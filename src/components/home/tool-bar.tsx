import { AppBar, Badge, Box, Container, Drawer, IconButton, styled, Tooltip } from "@mui/material"
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
import { UserPopover } from "./user-popover"
import { List as MenuIcon } from "@phosphor-icons/react"
import { XCircle as XCircleIcon } from "@phosphor-icons/react"
import { ScrollButtonMenuItem } from "./scroll-button-menu-item"

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
    // Abrir o cerrar el menu en pantallas pequeñas
    const [open, setOpen] = useState(false)
    // Contador del carrito
    const [countShopping, setCountShopping] = useState<any>(0)
    const shoppingCartPopover = usePopover<HTMLDivElement>();
    const userPopover = usePopover<HTMLDivElement>();
    // Comprobar si existe un usuario iniciado
    const { isAuthenticated } = useAuth()

    // Datos del carrito
    const shoppingCartId = useSelector((state: any) => state.Auth.shoppingCartId);

    // Si el usuario está autenticado, obtener conteo desde API
    const { data } = useCountProductsQuery(
        { shoppingCartId },
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

    const toggleDrawer = (value: boolean) => () => {
        setOpen(value)
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
                                    alt='Logo Vinoteca'
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
                                    isActive={props.currentIndex === 0}
                                />

                                <ScrollButton
                                    label='Historia'
                                    section={historyRef}
                                    isActive={props.currentIndex === 1}
                                />

                                <ScrollButton
                                    label='Vinos'
                                    section={winelistRef}
                                    isActive={props.currentIndex === 2}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                variant={isAuthenticated ? 'dot' : 'standard'}
                            >
                                <Tooltip title='Usuario'>
                                    <div ref={userPopover.anchorRef}>
                                        <IconButton
                                            sx={{
                                                color: 'var(--vinoteca-palette-common-white)',
                                                '&:hover': {
                                                    color: 'var(--vinoteca-palette-neutral-950)',
                                                    background: 'var(--vinoteca-palette-common-white)'
                                                }
                                            }}
                                            onClick={isAuthenticated ? userPopover.handleOpen : handleUser}
                                        >
                                            <UserCircleIcon />
                                        </IconButton>
                                    </div>
                                </Tooltip>
                            </StyledBadge>

                            <Tooltip title='Carrito'>
                                <div
                                    ref={shoppingCartPopover.anchorRef}

                                >
                                    <IconButton
                                        sx={{
                                            color: 'var(--vinoteca-palette-common-white)',
                                            '&:hover': {
                                                color: 'var(--vinoteca-palette-neutral-950)',
                                                background: 'var(--vinoteca-palette-common-white)'
                                            }
                                        }}
                                        onClick={shoppingCartPopover.handleOpen}
                                    >
                                        <Badge
                                            badgeContent={countShopping > 0 ? countShopping : null}
                                            color='warning'
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Box>

                        {/* Barra para pantallas pequeñas */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                            <IconButton
                                aria-label="Boton de menu"
                                onClick={toggleDrawer(true)}
                                sx={{
                                    color: 'var(--vinoteca-palette-common-white)',
                                    '&:hover': {
                                        color: 'var(--vinoteca-palette-neutral-950)',
                                        background: 'var(--vinoteca-palette-common-white)'
                                    }
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor='top'
                                open={open}
                                onClose={toggleDrawer(false)}
                                PaperProps={{
                                    sx: {
                                        top: 'var(--vinoteca-frame-height, 0px)',
                                    },
                                }}

                            >
                                <Box sx={{ p: 2, background: 'var(--vinoteca-palette-neutral-950)' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <IconButton
                                            onClick={toggleDrawer(false)}
                                            sx={{
                                                color: 'var(--vinoteca-palette-common-white)',
                                                '&:hover': {
                                                    color: 'var(--vinoteca-palette-neutral-950)',
                                                    background: 'var(--vinoteca-palette-common-white)'
                                                }
                                            }}
                                        >
                                            <XCircleIcon />
                                        </IconButton>
                                    </Box>
                                    <ScrollButtonMenuItem
                                        label='Inicio'
                                        section={homeRef}
                                    />

                                    <ScrollButtonMenuItem
                                        label='Historia'
                                        section={historyRef}
                                    />

                                    <ScrollButtonMenuItem
                                        label='Vinos'
                                        section={winelistRef}
                                    />
                                </Box>
                            </Drawer>
                        </Box>
                    </MyToolBar>
                </Container>
            </AppBar>
            <ShoppingCartPopover
                anchorEl={shoppingCartPopover.anchorRef.current}
                open={shoppingCartPopover.open}
                onClose={shoppingCartPopover.handleClose}
            />
            <UserPopover
                anchorEl={userPopover.anchorRef.current}
                open={userPopover.open}
                onClose={userPopover.handleClose}
            />
        </>
    )
}