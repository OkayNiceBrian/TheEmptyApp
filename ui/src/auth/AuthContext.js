const { createContext, useState, useMemo, useContext } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const contextValue = useMemo(() => ({
        token,
        setToken
    }), [token]);

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