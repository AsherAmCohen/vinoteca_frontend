import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Wine {
    id: string;
    amount: number;
}

interface ShoppingCartState {
    wines: Wine[];
}

const initialState: ShoppingCartState = {
    wines: []
}

export const ShoppingCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ToCart: (state, action: PayloadAction<Wine>) => {
            const item = state.wines.find(i => i.id === action.payload.id);
            if(item) {
                item.amount += action.payload.amount;
            } else {
                state.wines.push(action.payload)
            }
        },
        DeleteToCart: (state, action: PayloadAction<string>) => {
            state.wines = state.wines.filter(i => i.id !== action.payload)
        },
        ClearCart: (state) => {
            state.wines = [];
        }
    }
})

export const {
    ToCart,
    DeleteToCart,
    ClearCart
} = ShoppingCartSlice.actions