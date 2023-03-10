import { createSlice } from '@reduxjs/toolkit';
import { MODES } from '../consts/modes';

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    value: MODES.POMODORO.name,
    time: 1,
    rounds: 4,
    currentRound: 1,
  },
  reducers: {
    changeMode: (state, action) => {
      const found = Object.values(MODES).find((value) => value?.name === action.payload?.name);
      if (found) {
        state.value = action.payload.name;
        state.time = found.time;
      } else {
        console.log(`Mode not found. Payload received ${action.payload}`);
      }
    },
    changeTime: (state, action) => {
      state.time = action.payload;
    },
    timerUpdate: (state, action) => {
      state.timeLeft = action.payload;
    },
    updateCurrentRound: (state, action) => {
      state.currentRound = action.payload;
    },
  },
});

export const { changeMode, updateCurrentRound } = modeSlice.actions;

export default modeSlice.reducer;
