import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedChatId: null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.selectedChatId = action.payload.chatId
        },
        removeChat: (state) => {
            state.selectedChatId = null
        }
    }
})

export const {selectChat, removeChat} = chatSlice.actions;
export default chatSlice.reducer