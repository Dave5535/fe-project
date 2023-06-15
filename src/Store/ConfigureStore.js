import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import AppSlice from "./AppSlice";
import PlaySlice from "./playSlice";
import roleSlice from "./roleSlice";


export default configureStore({
   reducer: {
      app: AppSlice,
      play: PlaySlice,
      user: UserSlice,
      role: roleSlice,
   },
   devTools: true,
});
