import { createSlice } from "@reduxjs/toolkit"

export const PlaySlice = createSlice({

    name: "play",
    initialState: {
      
        plays: [] // initialize to an empty array
    },
    reducers: {
        setPlayinfo: (state, action) => {
            state.key = action.payload.key;
            state.playId = action.payload.playId;
            state.playName = action.payload.playName;
            state.description = action.payload.description;
            state.time = action.payload.time;
            state.script = action.payload.script;

        },

        setPlaysInfo: (state, action) => {
            state.plays = action.payload.plays;
        },
        addPlays: (state, action) => {
            state.plays.push(...action.payload.plays);
          },
    }

});

export const { setPlayinfo, addPlays, setPlaysInfo } = PlaySlice.actions;

export const selectPlayKey = (state) => state.play.key;
export const selectPlayId = (state) => state.play.playId;
export const selectPlayName = (state) => state.play.playName;
export const selectDescription = (state) => state.play.description;
export const selectTime = (state) => state.play.time;
export const selectScript = (state) => state.play.script;
export const selectPlays = (state) => state.play.plays;

export default PlaySlice.reducer;