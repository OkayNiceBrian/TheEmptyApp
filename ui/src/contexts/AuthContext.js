const { createContext, useState, useMemo, useContext } = require("react");

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [userArtistId, setUserArtistId] = useState(localStorage.getItem("userArtistId"));

    const setUserData = (data) => {
        if (data) {
            setToken(data.token);
            setEmail(data.email);
            setUsername(data.userName);
            if (data.artists.length > 0) {
                setUserArtistId(data.artists[0].id);
                localStorage.setItem("userArtistId", data.artists[0].id);
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.userName);
        } else {
            logout();
        }
    }

    const logout = () => {
        setToken(null);
        setEmail(null);
        setUsername(null);
        setUserArtistId(null);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("userArtistId");
        window.location.reload(false);
    }

    const setCurrentArtist = (artistId) => {
        if (artistId) {
            setUserArtistId(artistId);
            localStorage.setItem("userArtistId", artistId);
        }
    }

    const contextValue = useMemo(() => ({
        token,
        email,
        username,
        userArtistId,
        setUserData,
        setCurrentArtist,
        logout
    }), [token, email, username, userArtistId]); 

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