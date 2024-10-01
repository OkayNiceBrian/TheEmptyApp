const { createContext, useState, useMemo, useContext, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if (userData) {
            setToken(userData.token);
            setEmail(userData.email);
            setUsername(userData.UserName);
        }
    }, [userData]);

    const contextValue = useMemo(() => ({
        token,
        email,
        username,
        setUserData
    }), [token, email, username]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;