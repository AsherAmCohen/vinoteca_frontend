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
    Wine: {
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
        setWineActions: (state, action: PayloadAction<any>) => {
            state.Wine = {
                ...state.Wine,
                [action.payload.key]: action.payload.value
            }
        },
    }
})

export const {
    setMarkActions,
    setCategoryActions,
    setWineActions
} = VinotecaSlice.actions