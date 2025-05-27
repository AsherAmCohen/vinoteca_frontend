import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string;
    email: string;
    phone: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    shoppingCartId: number | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    shoppingCartId: null
}
 
export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{user: User, token: string}>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            Object.assign(state, initialState)
        },
        setShoppingCartId: (state, action: PayloadAction<number>) => {
            state.shoppingCartId = action.payload
        }
    }
})

export const {
    login,
    logout,
    setShoppingCartId
} = AuthSlice.actions