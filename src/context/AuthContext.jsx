import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => {
        Cookies.remove("authToken");
        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
