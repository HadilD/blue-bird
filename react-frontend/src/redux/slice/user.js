import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: false,
    isSignInDisplayed: false,
    userRole: '',
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.users = [...action.payload]
        },
        setLoginStatus: (state, action) => {
            state.isUserLoggedIn = action.payload
        },
        setUserRole: (state, action) => {
            state.setUserRole = action.payload
        }
    }
})

export const { setAllUsers, setLoginStatus, setUserRole } = userSlice.actions
export default userSlice.reducer