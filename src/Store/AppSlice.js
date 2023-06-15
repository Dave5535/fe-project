import  {createSlice} from "@reduxjs/toolkit"

export const AppSlice = createSlice({
    name: 'app',
    initialState : {
        id: null,
        chatName: null, 
        participants:[] ,
        messages: [],
        timestamp:null, 
    },
    reducers:{
        setChatInfo: (state,action) => {
           
            state.id = action.payload.id;
            state.chatName = action.payload.chatName;
            state.participants = action.payload.participants;
            state.messages = action.payload.messages;
            state.timestamp = action.payload.timestamp;
          },
        addChatMessage: (state, action) => {
            state.messages.push(action.payload);
          },
          editChatMessage: (state, action) => {
            const { messageId, content } = action.payload;
            const message = state.messages.find((msg) => msg.id === messageId);
            if (message) {
              message.content = content;
            }
          },
          deleteMessage: (state, action) => {
            const messageId = action.payload;
            state.messages = state.messages.filter((msg) => msg.id !== messageId);
          },
        addFriendToChat: (state,action) =>  {
            state.channelUsers.push(action.payload);
          },
    },
});
export const{setChatInfo,addChatMessage,addFriendToChat,editChatMessage,deleteMessage} = AppSlice.actions;

export const selectChat = (state) => state.app;
export const selectChatId = (state) => state.app.id;
export const selectChatName = (state) => state.app.chatName;
export const selectChatUsers = (state) => state.app.participants;
export const selectChatMessages = (state) => state.app.messages;
export const selectChatTimestamp = (state) => state.app.timestamp;
export default AppSlice.reducer;

