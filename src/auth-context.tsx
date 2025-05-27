import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login as loginRedux, logout as logoutRedux, setShoppingCartId } from "./store/slice/auth/slice";
import { ClearCart } from "./store/slice/shopping-cart/slice";

import { useLazyShoppingCartUserQuery, useUpdateAmountProductMutation } from "./store/api/api";

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
    hasPermission: (perm: string) => boolean;
    isRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    loading: true,
    hasPermission: () => false,
    isRole: () => false
});

interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true);

    // Api para obtener carrito del usuario
    const [getCartUser] = useLazyShoppingCartUserQuery();

    // Sincronizar carritos
    const localCart = useSelector((state: any) => state.ShoppingCart.wines);

    // Api para agregar los productos al carrito
    const [addToCart] = useUpdateAmountProductMutation();

    // Funcion para cargar el carrito a Redux
    const fetchAndSetCartId = async (email: string): Promise<string | null> => {
        try {
            const { data } = await getCartUser({ email }).unwrap();
            if (data) {
                dispatch(setShoppingCartId(data))
                return data
            }
        } catch { }
        return null
    }

    // Sincronizar el carrito cuando se inicie sesión
    const syncCartWithAPI = async (shoppingCartId: string) => {
        if (!shoppingCartId || !localCart?.length) return;

        try {
            for (const item of localCart) {
                await addToCart({
                    wineId: item.id,
                    shoppingCartId,
                    amount: item.amount
                }).unwrap();
            }
            dispatch(ClearCart());
        } catch (error) {
            console.error("Error sincronizando carrito:", error);
        }
    };


    useEffect(() => {
        const initialize = async () => {
            // Obtiene el token de las cookies
            const token = localStorage.getItem('token')

            if (token) {
                try {
                    // Decodifica el token
                    const decoded: any = jwtDecode(token)
                    // Comprueba si el token no esta expirado
                    if (decoded.exp * 1000 > Date.now()) {
                        setUser(decoded)
                        dispatch(loginRedux({ user: decoded, token }))

                        // Obtiene el ID del carrito
                        const cartId = await fetchAndSetCartId(decoded.email)
                        if (cartId) await syncCartWithAPI(cartId)
                    }
                    else {
                        localStorage.removeItem('token')
                    }
                } catch (error) {
                    localStorage.removeItem('token')
                }
            }
            setLoading(false)
        }

        initialize();
    }, [])

    const login = async (token: string) => {
        localStorage.setItem('token', token)
        const decoded: any = jwtDecode(token)
        setUser(decoded)
        dispatch(loginRedux({ user: decoded, token }))

        const cartId = await fetchAndSetCartId(decoded.email)
        if (cartId) await syncCartWithAPI(cartId)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        dispatch(logoutRedux())
    }

    const hasPermission = (perm: string) => {
        return user?.permissions?.includes(perm);
    }

    const isRole = (role: string) => {
        return user?.role === role;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading, hasPermission, isRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}