import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VinotecaSliceProps } from "../../../types/slice";

const initialState: VinotecaSliceProps = {
    Mark: {
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
        }
    }
})

export const {
    setMarkActions
} = VinotecaSlice.actions