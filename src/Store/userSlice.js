import  {createSlice} from "@reduxjs/toolkit"

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
    },
});

export const{login,logout,updatePhoto} = UserSlice.actions;


export const selectUser = (state) => state.user.user;

export default UserSlice.reducer;

