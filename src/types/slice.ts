export interface UISliceProps {
    Modal: {
        open: boolean,
        title: string,
        component: null,
        args: null
    }
}

interface PageProps {
    rowsPerPage: number;
    page: number;
}

export interface VinotecaSliceProps {
    Mark: PageProps
    Category: PageProps
    WineInStock: PageProps
    WineList: PageProps
    UserList: PageProps
    RoleList: PageProps
    OrderList: PageProps
}