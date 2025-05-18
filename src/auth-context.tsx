import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { login as loginRedux, logout as logoutRedux } from "./store/slice/auth/slice";
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

const AuthProvider = ({ children }: Props) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('aqui')
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded)
                    dispatch(loginRedux({ user: decoded, token }))
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
        dispatch(loginRedux({user: decoded, token}))
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

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };