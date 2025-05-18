import { Box, Popover, Typography } from "@mui/material"

interface Props {
    anchorEl: Element | null;
    onClose: () => void;
    open: boolean
}

export const ShoppingCartPopover = (props: Props) => {
    const { anchorEl, open, onClose } = props
    
    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            open={open}
            onClose={onClose}
            slotProps={{ paper: { sx: { width: 'auto' } } }}
        >
            <Box sx={{ p: '16px 20px' }}>
                <Typography variant='subtitle2'>Carrito de Compras</Typography>
            </Box>
        </Popover>
    )
}