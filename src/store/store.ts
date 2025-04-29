import { configureStore } from "@reduxjs/toolkit";
import { vinotecaApi } from "./api/api";
import { UISlice } from "./slice/UI/slice";
import { VinotecaSlice } from "./slice/vinoteca/slice";

export const store = configureStore({
    reducer: {
        [vinotecaApi.reducerPath]: vinotecaApi.reducer,
        UI: UISlice.reducer,
        Vinoteca: VinotecaSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(
        vinotecaApi.middleware
    )
})