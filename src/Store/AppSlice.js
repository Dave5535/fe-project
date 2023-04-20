import  {createSlice} from "@reduxjs/toolkit"

export const AppSlice = createSlice({
    name: 'app',
    initialState : {
        channelId: null,
        channelName: null, 
    },
    reducers:{
        setChannelInfo: (state,action) => {
            state.channelId = action.payload.id;
            state.channelName = action.payload.channelName;
        },
       
    },
});

export const{setChannelInfo} = AppSlice.actions;


export const selectChanelId = (state) => state.app.channelId;
export const selectChanelName = (state) => state.app.channelName;

export default AppSlice.reducer;

