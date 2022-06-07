import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mediaItems: []
}

export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setAllMediaItems: (state, action) => {
            state.mediaItems = [...action.payload]
        },
    }
})

export const { setAllMediaItems } = mediaSlice.actions
export default mediaSlice.reducer