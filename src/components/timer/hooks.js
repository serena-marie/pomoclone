/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { updateTitle } from '../../utils/updateTitle';
import formatTime from '../../utils/formatTime';
import { MILLISECONDS_PER_SECOND } from '../../consts/timeMaths';
import { POMODORO } from '../../consts/modes';
import { changeCurrentMode, updateCurrentRound } from '../../store/modeSlice';


/**
 * Updates the page title.
 * @param {number} time - current time, unformatted
 * @param {string} mode - current mode
 */
function updatePageTitle(time, mode) {
  useEffect(() => {
    updateTitle(formatTime(time), mode);
  }, [time]);
};

/**
 * Synchronizes timer on when mode is manually changed.
 * @param {number} time Timer's current time
 * @param {number} timeSeconds Initial received time, in seconds
 * @param {boolean} timerActive Timer's state
 * @param {string} modeReceived The new mode user is switching to
 * @param {boolean} toggle Current toggle state
 * @param {Function} reset Function to reset timer
 * @param {Function} setToggle Function to toggle the timer state
 * @param {Function} setTime Function to set time
 */
function syncTimeOnModeSwitch(time, timeSeconds, timerActive, modeReceived, toggle, reset, setToggle, setTime) {
  useEffect(() => {
    if (time !== timeSeconds && timerActive) {
      reset();
    } else {
      setTime(timeSeconds);
      // if trying to edit time when switching modes, toggle off.
      if (!toggle) setToggle(true);
    }
  }, [modeReceived]);
};

/**
 * Inserts a Pomodoro session into IndexedDB database.
 * @param {number} time Timer's current time
 * @param {string} modeReceived Mode being logged
 * @param {Function} addDatabaseLog Function that adds log to database
 */
function addLogToIndexedDb(time, modeReceived, addDatabaseLog) {
  useEffect(() => {
    if (time === 0) {
      addDatabaseLog(modeReceived);
    }
  }, [time]);
}

/**
 * Sets up the timer and decrements for each second while the timer is active
 * @param {boolean} timerActive Timer's active state
 * @param {Function} setTime Function to update the timer's state
 */
function timerCountdown(timerActive, setTime) {
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    // https://stackoverflow.com/questions/39426083/update-react-component-every-second
    let timeInterval = null;
    if (timerActive) {
      timeInterval = setInterval(() => {
        setTime((prevTime) => {
          return prevTime > 0 ? prevTime - 1 : 0;
        });
      }, MILLISECONDS_PER_SECOND);
    }
    return () => {
      clearInterval(timeInterval);
    };
  }, [timerActive]);
}

/**
 * Updates the round count when timer is complete
 * @param {number} time Timer's current time
 * @param {number} currentRound Current pomodoro round number
 * @param {string} modeReceived Current mode
 * param {Function} updateCurrentRound Redux action to update the current round
 * @param {Function} setCurrentRound Function to set the current round local state
 * @param {Function} getNextMode Function to get the next mode
 * @param {Function} dispatch Redux dispatch function
 */
function updateRoundCount(time, currentRound, modeReceived, setCurrentRound, getNextMode, dispatch) {
  useEffect(() => {
    const nextMode = getNextMode(modeReceived, currentRound);
    if (nextMode === POMODORO && time === 0) {
      const updatedRound = currentRound + 1;
      dispatch(updateCurrentRound(updatedRound));
      setCurrentRound(updatedRound);
    }
  }, [time]);
}

/**
 * Updates the mode when timer is complete
 * @param {number} time Timer's current time
 * @param {string} modeReceived Current mode
 * @param {number} currentRound Current round number
 * @param {Function} getNextMode Function to determine next mode
 * param {Function} changeCurrentMode Function to update current mode
 * @param {Function} dispatch Redux dispatch function
 */
function updateMode(time, modeReceived, currentRound, getNextMode, dispatch) {
  useEffect(() => {
    if (time === 0) {
      const nextMode = getNextMode(modeReceived, currentRound);
      dispatch(changeCurrentMode(nextMode));
    }
  }, [time]);
}

export { updatePageTitle, syncTimeOnModeSwitch, addLogToIndexedDb, timerCountdown, updateRoundCount, updateMode };
