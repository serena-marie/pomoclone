import { createSlice } from '@reduxjs/toolkit';
import { MODES } from '../consts/modes';

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    value: MODES.POMODORO.name,
    time: 60,
    rounds: 4,
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
  },
});

export const { changeMode, changeTime } = modeSlice.actions;

export default modeSlice.reducer;

// if (Object.entries(TEST).find()})) {
//   console.log(`Yep`);
// } else {
//   console.log(`Nope`);
// }
// Works but is there something better
// console.log(JSON.stringify(`payload is ${action.payload}`));
// if (Object.entries(TEST).filter(([key, value]) => {
//   value?.name.includes(action.payload);
// }).length > 0) {
//   console.log('yelo');
// } else {
//   console.log('nope');
// }
// },
//   if (Object.entries(TEST).filter(([key, value]) => value?.name.includes(action.payload))) {
//     state.value = action.payload;
//   } else {
//     console.log(`Hrrrrrm. Did not receive an expected Mode. Received: ${action.payload}`);
//   }
// },
// changeMode: (state, action) => {
//   if (Object.values(MODES).includes(action.payload)) {
//     state.value = action.payload;
//   } else {
//     console.log(`Hrrrrrm. Did not receive an expected Mode. Received: ${action.payload}`);
//   }
// },
