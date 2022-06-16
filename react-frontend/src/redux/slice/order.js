import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myOrders: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setMyOrders: (state, action) => {
            state.myOrders = action.payload
        }
    }
})

export const { setMyOrders } = orderSlice.actions
export default orderSlice.reducer