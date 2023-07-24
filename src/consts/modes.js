// Ideally would have this set up in a config to centrally disable/enable
// Will set up later
const isTesting = false;
const testingValues = 1;

const POMODORO = 'pomodoro';
const SHORTBREAK = 'shortBreak';
const LONGBREAK = 'longBreak';

const MODES = Object.freeze({
  [POMODORO]: {
    name: 'pomodoro',
    time: isTesting ? testingValues : 60,
    message: 'Time to focus!',
  },
  [SHORTBREAK]: {
    name: 'shortBreak',
    time: isTesting ? testingValues : 10,
    message: 'Time for a break!',
  },
  [LONGBREAK]: {
    name: 'longBreak',
    time: isTesting ? testingValues : 30,
    message: 'Time for an extended break!',
  },
});

export { MODES, POMODORO, SHORTBREAK, LONGBREAK };
