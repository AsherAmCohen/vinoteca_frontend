import { Drawer, drawerClasses } from "@mui/material";
import { styled } from "@mui/system";

const drawerWidth = 240;

export const MyDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
})