import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayUploadModal: false
}

export const uploadModalSlice = createSlice({
    name: 'uploadModal',
    initialState,
    reducers: {
        setUploadModal: (state, action) => {
            state.displayUploadModal = action.payload
        }
    }
})

export const { setUploadModal } = uploadModalSlice.actions
export default uploadModalSlice.reducer