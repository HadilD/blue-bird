import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    currentChat : []

}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            console.log('Action', action.payload)
            state.rooms = action.payload
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload
        }
    }
})

export const { setRooms, setCurrentChat } = chatSlice.actions
export default chatSlice.reducer