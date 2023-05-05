import  {createSlice} from "@reduxjs/toolkit"

export const Roleslice = createSlice({
    name: "user",
    initialState: {
        user: "user",
        teacher: "teacher",
        admin: "admin",
    },
    reducers:{
       // No reducers pga is not needed no need to change role
    },
});
// no need to call reducers 
export const{} = Roleslice.actions;


export const selectUser = (state) => state.user.user;
export const selectTeacher = (state) => state.user.teacher;
export const selectAdmin = (state) => state.user.admin;

export default Roleslice.reducer;