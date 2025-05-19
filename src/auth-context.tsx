import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { login as loginRedux, logout as logoutRedux } from "./store/slice/auth/slice";
import { ClearCart } from "./store/slice/shop/slice";

import { useUpdateAmountProductMutation } from "./store/api/api";
interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    loading: true
});

interface Props {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true);

    // Sincronizar carritos
    const localCart = useSelector((state: any) => state.ShoppingCart.wines);
    const [addToCart] = useUpdateAmountProductMutation();

    const syncCartWithAPI = async (userData: any) => {
        if (!userData?.shoppingCart || !localCart?.length) return;

        try {
            console.log(localCart)
            for (const item of localCart) {
                await addToCart({
                    wineId: item.id,
                    shoppingCartId: userData.shoppingCart,
                    amount: item.amount
                }).unwrap();
            }
            dispatch(ClearCart());
        } catch (error) {}
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded)
                    dispatch(loginRedux({ user: decoded, token }))
                    syncCartWithAPI(decoded); // sincronizar si hay token válido
                } else {
                    localStorage.removeItem('token')
                }
            } catch (error) {
                localStorage.removeItem('token')
            }
        }
        setLoading(false)
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token)
        const decoded: any = jwtDecode(token)
        setUser(decoded)
        dispatch(loginRedux({ user: decoded, token }))
        syncCartWithAPI(decoded); // sincronizar al iniar sesión
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        dispatch(logoutRedux())
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}