import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { vinotecaApi } from "./api/api";
import { UISlice } from "./slice/UI/slice";
import { VinotecaSlice } from "./slice/vinoteca/slice";
import { AuthSlice } from "./slice/auth/slice";
import { ShoppingCartSlice } from "./slice/shopping-cart/slice";

// Persistencia
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // usa localStorage

// Combinar reducers
const rootReducer = combineReducers({
    [vinotecaApi.reducerPath]: vinotecaApi.reducer,
    UI: UISlice.reducer,
    Vinoteca: VinotecaSlice.reducer,
    Auth: AuthSlice.reducer,
    ShoppingCart: ShoppingCartSlice.reducer
})

// Configurar persistencia
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['ShoppingCart'],

}

// Aplicar persistencia
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Crear store con persistencias
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(
        vinotecaApi.middleware
    )
})

// Exportar persistor
export const persistor = persistStore(store)