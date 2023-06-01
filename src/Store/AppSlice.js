import  {createSlice} from "@reduxjs/toolkit"

export const AppSlice = createSlice({
    name: 'app',
    initialState : {
        id: null,
        chatName: null, 
        channelType: null,
        participants:[] ,
        messages: [],
        timestamp:null, 
    },
    reducers:{
        setChannelInfo: (state,action) => {
           
            state.id = action.payload.channelId;
            state.chatName = action.payload.channelName;
            state.channelType = action.payload.channelType;  // do not exsist .. remove ?
            state.participants = action.payload.channelUsers;
            state.messages = action.payload.channelMessages;
            state.timestamp = action.payload.channelCreated;
        },
        addChannelMessage: (state, action) => {
            state.messages.push(action.payload);
          },
          editChannelMessage: (state, action) => {
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
        addFriendToChannel: (state,action) =>  {
            state.channelUsers.push(action.payload);
          },
      
    },
});

export const{setChannelInfo,addChannelMessage,addFriendToChannel,editChannelMessage,deleteMessage} = AppSlice.actions;

export const selectChannelId = (state) => state.app.id;
export const selectChannelName = (state) => state.app.chatName;
export const selectChannelType = (state) => state.app.channelType;
export const selectChannelUsers = (state) => state.app.participants;
export const selectChannelMessages = (state) => state.app.messages;
export const selectchannelCreated = (state) => state.app.timestamp;
export default AppSlice.reducer;

