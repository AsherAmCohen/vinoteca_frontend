import { Box, Divider, ListItemIcon, MenuItem, MenuList, Popover, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { SignOut as SignOutIcon } from "@phosphor-icons/react";
import { useAuth } from "../../auth-context";

interface Props {
    anchorEl: Element | null;
    onClose: () => void;
    open: boolean
}

export const UserPopover = (props: Props) => {
    const { anchorEl, open, onClose } = props;
    const { name, phone, email } = useSelector((state: any) => state.Auth.user)
    const {logout} = useAuth()

    const handleSignOut = () => {
        logout()
    }

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            open={open}
            onClose={onClose}
            slotProps={{ paper: { sx: { width: 'auto' } } }}
        >
            <Box sx={{ p: '16px 20px' }}>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography color="text.secondary" variant="body2">{email}</Typography>
                <Typography color="text.secondary" variant="body2">{phone}</Typography>
            </Box>
            <Divider />
            <MenuList>
                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                        <SignOutIcon fontSize="var(--icon-fontSize-md)"/>
                    </ListItemIcon>
                    Cerrar Sesión
                </MenuItem>
            </MenuList>
        </Popover>
    )
}