import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string;
    email: string;
    phone: string;
    shoppingCart: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
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
            state = initialState
        }
    }
})

export const {
    login,
    logout
} = AuthSlice.actions