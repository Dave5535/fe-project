import  {createSlice} from "@reduxjs/toolkit"

export const AppSlice = createSlice({
    name: 'app',
    initialState : {
        key: null,
        channelId: null,
        channelName: null, 
        channelType: null,
        channelUsers:[] ,
        channelMessages: [],
    },
    reducers:{
        setChannelInfo: (state,action) => {
            state.key = action.payload.key;
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
            state.channelType = action.payload.channelType;
            state.channelUsers = action.payload.channelUsers;
            state.channelMessages = action.payload.channelMessages;
        },
        addChannelMessage: (state, action) => {
            state.channelMessages.push(action.payload);
          },
        addFriendToChannel: (state,action) =>  {
            state.channelUsers.push(action.payload);
          },
      
    },
});

export const{setChannelInfo,addChannelMessage,addFriendToChannel} = AppSlice.actions;

export const selectkey = (state) => state.app.key;
export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const selectChannelType = (state) => state.app.channelType;
export const selectChannelUsers = (state) => state.app.channelUsers;
export const selectChannelMessages = (state) => state.app.channelMessages;

export default AppSlice.reducer;

