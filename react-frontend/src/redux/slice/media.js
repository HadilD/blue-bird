import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mediaItems: [],
    myMedias: []
}

export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setAllMediaItems: (state, action) => {
            state.mediaItems = [...action.payload]
        },
        setMyMedias: (state, action) => {
            state.myMedias = action.payload
        }
    }
})

export const { setAllMediaItems, setMyMedias } = mediaSlice.actions
export default mediaSlice.reducer