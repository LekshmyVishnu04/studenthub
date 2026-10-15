import { createSlice } from "@reduxjs/toolkit"

const getInitialUser = () => {
    try {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
        localStorage.removeItem("user");
        return null;
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: getInitialUser
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            window.localStorage.setItem('user', JSON.stringify(action.payload))
        },
        removeUser: (state) => {
            state.user = null;
            window.localStorage.removeItem("user");
        },
        setUserFromLocalStorage: (state) => {
            var user = window.localStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                state.user = user;
            } else {
                state.user = null;
            }
        }
    }
});

export const { setUser, removeUser, setUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;