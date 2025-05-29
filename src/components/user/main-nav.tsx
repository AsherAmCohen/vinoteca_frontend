import { Box, IconButton, Stack, Tooltip } from "@mui/material"
import { UserCircle as UserIcon } from "@phosphor-icons/react"
import { ShoppingCart as ShoppingCartIcon } from "@phosphor-icons/react"
import { usePopover } from "../../hooks/use-popover"
import { UserPopover } from "./user-popover"
import { useState } from "react"
import { List as ListIcon } from "@phosphor-icons/react"
import { MobileNav } from "./mobile-nav"
import { useNavigate } from "react-router-dom"

export const MainNav = () => {
    const [openNav, setOpenNav] = useState<boolean>(false)

    const userPopover = usePopover<HTMLDivElement>();

    const navigate = useNavigate()

    const handleShoppingCart = () => {
        navigate('/payment')
    }

    return (
        <>
            <Box
                component='header'
                sx={{
                    borderBottom: '1px solid var(--vinoteca-palette-divider)',
                    backgroundColor: 'var(--vinoteca-palette-common-white)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}
            >
                <Stack
                    direction='row'
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: '64px',
                        px: 2
                    }}
                >
                    <Stack
                        sx={{ alignItems: 'center' }}
                        direction='row'
                        spacing={2}
                    >
                        <IconButton
                            sx={{
                                display: { lg: 'none' }
                            }}
                            onClick={(): void => {
                                setOpenNav(true)
                            }}
                        >
                            <ListIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        sx={{ alignItems: 'center' }}
                        direction='row'
                    >
                        <Tooltip title='Usuario'>
                            <div
                                ref={userPopover.anchorRef}
                            >
                                <IconButton
                                    sx={{
                                        color: 'var(--vinoteca-palette-neutral-950)',
                                        '&:hover': {
                                            color: 'var(--vinoteca-palette-common-white)',
                                            background: 'var(--vinoteca-palette-neutral-950)'
                                        }
                                    }}
                                    onClick={userPopover.handleOpen}
                                >
                                    <UserIcon />
                                </IconButton>
                            </div>
                        </Tooltip>

                        <Tooltip title='Carrito'>
                            <IconButton
                                sx={{
                                    color: 'var(--vinoteca-palette-neutral-950)',
                                    '&:hover': {
                                        color: 'var(--vinoteca-palette-common-white)',
                                        background: 'var(--vinoteca-palette-neutral-950)'
                                    }
                                }}
                                onClick={handleShoppingCart}
                            >
                                <ShoppingCartIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Box>
            <UserPopover
                anchorEl={userPopover.anchorRef.current}
                open={userPopover.open}
                onClose={userPopover.handleClose}
            />
            <MobileNav
                onClose={() => {
                    setOpenNav(false)
                }}
                open={openNav}
            />
        </>
    )
}