import { createSlice } from "@reduxjs/toolkit"

export const PlaySlice = createSlice({

    name: "play",
    initialState: {
      
        plays: []
        
    },
    reducers: {
        setPlayinfo: (state, action) => {
            state.id = action.payload.id;
            state.eventName = action.payload.eventName;
            state.description = action.payload.description;
            state.startTime = action.payload.startTime;
            state.endTime = action.payload.endTime;
            state.organizer = action.payload.organizer;
            state.script = action.payload.script; // do not exsist in BE .. removed ? 
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
export const selectPlayId = (state) => state.play.id;
export const selectPlayName = (state) => state.play.eventName;
export const selectDescription = (state) => state.play.description;
export const selectTimeStart = (state) => state.play.startTime;
export const selectTimeEnd = (state) => state.play.endTime;
export const selectScript = (state) => state.play.script;
export const selectOrganizer = (state) => state.play.organizer;
export const selectPlays = (state) => state.play.plays;

export default PlaySlice.reducer;