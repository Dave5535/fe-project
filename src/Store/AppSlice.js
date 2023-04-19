import  {createSlice} from "@reduxjs/toolkit"

export const AppSlice = createSlice({
    name: 'app',
    initialState : {
        channelId: null,
        channelName: null, 
    },
    reducers:{
        setChannelId: (state,action) => {
            state.app += action.payload;
        },
       
    },
});

export const{setChannelId} = AppSlice.actions;


export const selectChanelId = (state) => state.app.channelId;
export const selectChanelName = (state) => state.app.channelName;
export default AppSlice.reducer;

