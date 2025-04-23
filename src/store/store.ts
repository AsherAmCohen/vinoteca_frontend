import { configureStore } from "@reduxjs/toolkit";
import { vinotecaApi } from "./api/api";

export const store = configureStore({
    reducer: {
        [vinotecaApi.reducerPath]: vinotecaApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(
        vinotecaApi.middleware
    )
})