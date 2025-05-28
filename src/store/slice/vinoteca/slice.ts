import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VinotecaSliceProps } from "../../../types/slice";

const initialState: VinotecaSliceProps = {
    Mark: {
        rowsPerPage: 5,
        page: 0
    },
    Category: {
        rowsPerPage: 5,
        page: 0
    },
    WineList: {
        rowsPerPage: 5,
        page: 0
    },
    WineInStock: {
        rowsPerPage: 20,
        page: 1
    },
    UserList: {
        rowsPerPage: 5,
        page: 0
    },
    RoleList: {
        rowsPerPage: 5,
        page: 0
    },
    OrderList: {
        rowsPerPage: 5,
        page: 0
    }
}

export const VinotecaSlice = createSlice({
    name: 'vinoteca',
    initialState,
    reducers: {
        setMarkActions: (state, action: PayloadAction<any>) => {
            state.Mark = {
                ...state.Mark,
                [action.payload.key]: action.payload.value
            }
        },
        setCategoryActions: (state, action: PayloadAction<any>) => {
            state.Category = {
                ...state.Category,
                [action.payload.key]: action.payload.value
            }
        },
        setWineListActions: (state, action: PayloadAction<any>) => {
            state.WineList = {
                ...state.WineList,
                [action.payload.key]: action.payload.value
            }
        },
        setWineInStockActions: (state, action: PayloadAction<any>) => {
            state.WineInStock = {
                ...state.WineInStock,
                [action.payload.key]: action.payload.value
            }
        },
        setUserListActions: (state, action: PayloadAction<any>) => {
            state.UserList = {
                ...state.UserList,
                [action.payload.key]: action.payload.value
            }
        },
        setRoleListActions: (state, action: PayloadAction<any>) => {
            state.RoleList = {
                ...state.RoleList,
                [action.payload.key]: action.payload.value
            }
        },
        setOrderListActions: (state, action: PayloadAction<any>) => {
            state.OrderList = {
                ...state.OrderList,
                [action.payload.key]: action.payload.value
            }
        }
    }
})

export const {
    setMarkActions,
    setCategoryActions,
    setWineInStockActions,
    setWineListActions,
    setUserListActions,
    setRoleListActions,
    setOrderListActions
} = VinotecaSlice.actions