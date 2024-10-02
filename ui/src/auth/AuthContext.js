const { createContext, useState, useMemo, useContext } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [userArtists, setUserArtists] = useState(localStorage.getItem("userArtists"));

    const setUserData = (data) => {
        if (data) {
            setToken(data.token);
            setEmail(data.email);
            setUsername(data.userName);
            setUserArtists(data.artists);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.userName);
            localStorage.setItem("userArtists", data.userArtists);
        } else {
            setToken(null);
            setEmail(null);
            setUsername(null);
            setUserArtists(null);
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("userArtists");
        }
    }

    const logout = () => {
        setToken(null);
        setEmail(null);
        setUsername(null);
        setUserArtists(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("userArtists");
    }

    const contextValue = useMemo(() => ({
        token,
        email,
        username,
        userArtists,
        setUserData,
        logout
    }), [token, email, username, userArtists]);

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