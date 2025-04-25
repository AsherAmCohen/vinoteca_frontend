import { Box, IconButton, Stack, Tooltip } from "@mui/material"
import { UserCircle as UserIcon } from "@phosphor-icons/react"
import { ShoppingCart as ShoppingCartIcon } from "@phosphor-icons/react"

export const MainNav = () => {
    return (
        <Box
            component='header'
            sx={{
                borderBottom: '1px solid var(--Vinoteca-Divider)',
                backgroundColor: 'var(--Vinoteca-Background-Light)',
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
                <Stack>

                </Stack>
                <Stack
                    sx={{ alignItems: 'center' }}
                    direction='row'
                >
                    <Tooltip title='Usuario'>
                        <IconButton
                            sx={{
                                color: 'var(--Vinoteca-Background-Dark)',
                                '&:hover': {
                                    color: 'var(--Vinoteca-Background-Light)',
                                    background: 'var(--Vinoteca-Background-Dark)'
                                }
                            }}
                        >
                            <UserIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Carrito'>
                        <IconButton
                            sx={{
                                color: 'var(--Vinoteca-Background-Dark)',
                                '&:hover': {
                                    color: 'var(--Vinoteca-Background-Light)',
                                    background: 'var(--Vinoteca-Background-Dark)'
                                }
                            }}
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
        </Box>
    )
}