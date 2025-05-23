import { Box, Divider, Drawer, Stack } from "@mui/material";
import { NavItemConfigProps } from "../../types/side-nav";
import { renderNavItems } from "./side-nav";
import { useLocation } from "react-router-dom";
import { navItem } from "./config";
import { useSelector } from "react-redux";

interface MobileNavProps {
    onClose?: () => void;
    open?: boolean;
    items?: NavItemConfigProps[]
}

export const MobileNav = (props: MobileNavProps) => {
    const { open, onClose } = props
    const location = useLocation()
    const pathname = location.pathname

    // Permisos del usuario
    const userPermissions = useSelector((state: any) => state.Auth.user?.permissions || []);

    return (
        <Drawer
            PaperProps={{
                sx: {
                    bgcolor: 'var(--vinoteca-palette-neutral-950)',
                    color: 'var(--vinoteca-palette-common-white)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    left: 0,
                    maxWidth: '100%',
                    position: 'fixed',
                    scrollbarWidth: 'none',
                    top: 0,
                    width: 'var(--Vinoteca-SideNav-width)',
                    zIndex: 'var(--Vinoteca-Sidenav-zIndex)',
                    '&::-webkit-scrollbar': { display: 'none' }
                }
            }}
            onClose={onClose}
            open={open}
        >
            <Stack>
                Logo
            </Stack>
            <Divider
                sx={{ bgcolor: 'var(--vinoteca-palette-common-white)' }}
            />
            <Box
                component='nav'
                sx={{
                    flex: '0 1 auto',
                    p: '12px'
                }}
            >
                {renderNavItems({ pathname, items: navItem, userPermissions })}
            </Box>
        </Drawer>
    )
}