import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageName: null
}

export const pageNameSlice = createSlice({
    name: 'pageName',
    initialState,
    reducers: {
        setPageName: (state, action) => {
            state.pageName = action.payload
        }
    }
})

export const { setPageName } = pageNameSlice.actions
export default pageNameSlice.reducer