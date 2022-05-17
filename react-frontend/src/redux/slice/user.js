import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.users = [...action.payload]
        }
    }
})

export const { setAllUsers } = userSlice.actions
export default userSlice.reducer