const { createContext, useState, useMemo, useContext, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [username, setUsername] = useState(localStorage.getItem("username"));

    const setUserData = (data) => {
        if (data) {
            setToken(data.token);
            setEmail(data.email);
            setUsername(data.UserName);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.userName);
        } else {
            setToken(null);
            setEmail(null);
            setUsername(null);
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
        }
    }

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