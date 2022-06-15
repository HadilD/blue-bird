import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: false,
    isSignInDisplayed: false,
    users: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.users = action.payload
        },
        setLoginStatus: (state, action) => {
            state.isUserLoggedIn = action.payload
        }
    }
})

export const { setAllUsers, setLoginStatus } = userSlice.actions
export default userSlice.reducer