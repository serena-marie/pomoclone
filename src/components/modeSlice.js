import { createSlice, current } from '@reduxjs/toolkit';
import { LONGBREAK, MODES, POMODORO, SHORTBREAK } from '../consts/modes';

// Define before putting into slice otherwise may get an undefined error
const defaultSettings = MODES;

const userSettings = {
  [POMODORO]: {
    time: defaultSettings[POMODORO].time,
  },
  [SHORTBREAK]: {
    time: defaultSettings[SHORTBREAK].time,
  },
  [LONGBREAK]: {
    time: defaultSettings[LONGBREAK].time,
  },
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    defaultSettings,
    userSettings,
    currentMode: MODES[POMODORO].name,
    currentTime: defaultSettings[POMODORO].time,
    rounds: 4,
    currentRound: 1,
  },
  reducers: {
    changeCurrentMode: (state, action) => {
      // updating this from userSettings[] to state.userSettings works....
      const found = state.userSettings[action.payload];
      if (found) {
        state.currentMode = action.payload;
        state.currentTime = found.time;
      } else {
        console.log(`Mode not found. Payload received ${JSON.stringify(action.payload)}`);
      }
    },
    // Used whenever a user changes the app defaults - time received should be in minutes
    updateTimeSettings: (state, action) => {
      console.log('state currently', current(state));
      const { mode, time } = action.payload;

      // eslint-disable-next-line max-len
      if (mode && time && (mode === POMODORO || mode === SHORTBREAK || mode === LONGBREAK)) {
        state.userSettings[mode].time = time;
        state.currentTime = time;
      }
    },
    timerUpdate: (state, action) => {
      state.timeLeft = action.payload;
    },
    updateCurrentRound: (state, action) => {
      state.currentRound = action.payload;
    },
    resetUserSettings: (state, action) => {
      console.log(`resetUserSettings dispatched. Returning initial state`);
      // // reset userSettings to default settings
      // state.userSettings[POMODORO].time = defaultSettings[POMODORO].time;
      // state.userSettings[SHORTBREAK].time = defaultSettings[SHORTBREAK].time;
      // state.userSettings[LONGBREAK].time = defaultSettings[LONGBREAK].time;

      // // update the current mode to default
      // state.currentMode = defaultSettings[action.payload].name;
      // state.currentTime = defaultSettings[action.payload].time;

      if (action.payload.mode === POMODORO || action.payload.mode === SHORTBREAK || action.payload.mode === LONGBREAK) {
        console.log('Received valid mode');
        state.currentTime = defaultSettings[action.payload.mode].time;
        state.userSettings = Object.fromEntries(
            Object.entries(userSettings).map(([key, { time }]) => [key, { time: defaultSettings[key]?.time ?? time }]),
        );
      } else {
        console.log(`action.payload `, action.payload);
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(handleReset.fulfilled, (state) => {
  //     state.status = 'succeeded';
  //   });
  // },
});

export const { changeCurrentMode, updateCurrentRound, updateTimeSettings, resetUserSettings } = modeSlice.actions;

export default modeSlice.reducer;
