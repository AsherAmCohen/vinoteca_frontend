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
    const { homeRef, historyRef, winelistRef } = props;
    const { isAuthenticated } = useAuth()

    const shoppingCartPopover = usePopover<HTMLDivElement>();

    const navigate = useNavigate()

    const handleUser = () => {
        navigate('/SignIn')
    }

    // Id del carrito
    const { shoppingCart } = useSelector((state: any) => state.Auth.user)

    // Cantidad de productos agregados en el carrito
    const { data } = useCountProductsQuery({ shoppingCartId: shoppingCart })
    const countProducts = data ? data.data : 0

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
                                        badgeContent={countProducts > 0 ? countProducts : null}
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