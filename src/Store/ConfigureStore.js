import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import AppSlice from "./AppSlice";
import PlaySlice from "./playSlice";



export default configureStore({
   reducer: {
      app: AppSlice,
      play: PlaySlice,
      user: UserSlice,
   },
   devTools: true,
});
