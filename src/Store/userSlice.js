import  {createSlice} from "@reduxjs/toolkit"
import { act } from "@testing-library/react";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        
    },
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state)=> {
           state.user = null;
        },
        updatePhoto: (state, action) => {
            state.user.photo = action.payload;
          },
          addConversation: (state,action) =>  {
            state.user.conversations.push(action.payload);
          },
          addFriend: (state, action) => {
            
            state.user.friends.push(action.payload);
          },
    },
});

export const{login,logout,updatePhoto,addConversation,addFriend} = UserSlice.actions;

export const selectUser = (state) => state.user.user;

export default UserSlice.reducer;

