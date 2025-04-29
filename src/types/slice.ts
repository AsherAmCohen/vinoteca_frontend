export interface UISliceProps {
    Modal: {
        open: boolean,
        title: string,
        component: null,
        args: null
    }
}

export interface VinotecaSliceProps {
    Mark: {
        rowsPerPage: number;
        page: number,
    },
    Category: {
        rowsPerPage: number;
        page: number,
    }
}