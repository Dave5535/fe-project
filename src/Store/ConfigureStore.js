import { configureStore } from "@reduxjs/toolkit";
import  UserSlice  from "./userSlice";
import AppSlice from "./AppSlice";


export default configureStore({
    reducer:{
       app: AppSlice,

       user: UserSlice,
    },
    devTools: true,
 });
