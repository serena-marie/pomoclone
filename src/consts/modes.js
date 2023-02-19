// const MODES = Object.freeze({
//   POMODORO: 'pomodoro',
//   SHORT_BREAK: 'shortBreak',
//   LONG_BREAK: 'longBreak',
// });

const MODES = Object.freeze({
  POMODORO: {
    name: 'pomodoro',
    time: 60,
  },
  SHORT_BREAK: {
    name: 'shortBreak',
    time: 10,
  },
  LONG_BREAK: {
    name: 'longBreak',
    time: 30,
  },
});

export { MODES };
