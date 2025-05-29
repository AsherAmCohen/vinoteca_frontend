import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UISliceProps } from "../../../types/slice";

const initialState: UISliceProps = {
    Modal: {
        open: false,
        title: '',
        component: null,
        args: null
    }
}

export const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        openModalAction: (state, action: PayloadAction<any>) => {
            state.Modal = {
                open: true,
                title: action.payload.title,
                component: action.payload.component,
                args: action.payload.args
            }
        },

        closeModalAction: (state) => {
            state.Modal = initialState.Modal
        }
    }
})

export const {
    openModalAction,
    closeModalAction
} = UISlice.actions