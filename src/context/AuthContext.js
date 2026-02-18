import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { loginUser, registerUser } from "../firebase/authServices";
import { auth } from "../firebase/firebase";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const register = (name, email, password) => registerUser(name, email, password);
    const login = (email, password) => loginUser(email, password);
    const logout = async () => {
        try {
            await signOut(auth);
            // Redirect to login page after successful logout
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            const currentPath = window.location.pathname;
            if (user) {
                if (currentPath === '/login' || currentPath === '/register') {
                    navigate('/dashboard');
                }
            } else {             
                if (currentPath !== '/login' && currentPath !== '/register') {
                    navigate('/login');
                }
            }
        });
        return unsubscribe;
    }, [])
    const isLoggedIn = !!currentUser;
    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)