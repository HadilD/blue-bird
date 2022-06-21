import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminMedia: []
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminMediaItems: (state, action) => {
            state.adminMedia = action.payload
        },
    }
})

export const { setAdminMediaItems } = adminSlice.actions
export default adminSlice.reducer