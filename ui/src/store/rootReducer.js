import { createSlice } from '@reduxjs/toolkit';

export const rootSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
        username: localStorage.getItem("username"),
        userArtistId: localStorage.getItem("userArtistId")
    },
    reducers: {
        setAuthData: (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            state.email = action.payload.email;
            localStorage.setItem("email", action.payload.email);
            state.username = action.payload.userName;
            localStorage.setItem("username", action.payload.userName);
            console.log(action.payload);
            if (action.payload.artists && action.payload.artists.length > 0) {
                state.userArtistId = action.payload.artists[0].id;
                localStorage.setItem("userArtistId", action.payload.artists[0].id);
            }
        },
        setUserArtistId: (state, action) => {
            state.userArtistId = action.payload;
            localStorage.setItem("userArtistId", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.email = null;
            state.username = null;
            state.userArtistId = null;
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("userArtistId");
        }
    }
});

export const { setAuthData, setUserArtistId, logout } = rootSlice.actions;

export default rootSlice.reducer;