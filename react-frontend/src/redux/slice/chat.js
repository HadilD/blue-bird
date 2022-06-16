import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    currentChat: [],
    currentRoomId: ''
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload
        },
        setCurrentRoomId: (state, action) => {
            state.currentRoomId = action.payload
        }
    }
})

export const { setRooms, setCurrentChat, setCurrentRoomId } = chatSlice.actions
export default chatSlice.reducer