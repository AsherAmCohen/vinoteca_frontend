import { configureStore } from "@reduxjs/toolkit";
import { vinotecaApi } from "./api/api";
import { UISlice } from "./slice/UI/slice";

export const store = configureStore({
    reducer: {
        [vinotecaApi.reducerPath]: vinotecaApi.reducer,
        UI: UISlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(
        vinotecaApi.middleware
    )
})