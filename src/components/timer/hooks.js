import { useEffect } from 'react';
import { formatTitle, formatTime } from '../../utils/formattingHelpers';
import { MILLISECONDS_PER_SECOND, POMODORO } from '../../consts';
import { changeCurrentMode, updateCurrentRound } from '../../store/modeSlice';


/**
 * Updates the page title.
 * @param {number} time - current time, unformatted
 * @param {string} mode - current mode
 */
function usePageTitleUpdate(time, mode) {
  useEffect(() => {
    const newTitle = formatTitle(formatTime(time), mode);
    document.title = newTitle;
  }, [time]);
};

/**
 * Synchronizes timer on when mode is changed.
 * param {number} time Timer's current time
 * @param {number} timeSeconds Initial received time, in seconds
 * @param {boolean} timerActive Timer's state
 * @param {string} modeReceived The new mode user is switching to
 * @param {boolean} toggle Current toggle state
 * @param {Function} reset Function to reset timer
 * @param {Function} setToggle Function to toggle the timer state
 * @param {Function} setTime Function to set time
 * @param {Function} logPomoSession Function to log session
 */
function useTimeSync(timeSeconds, timerActive, modeReceived, toggle,
    reset, setToggle, setTime, logPomoSession) {
  useEffect(() => {
    if (timerActive) {
      logPomoSession(modeReceived);
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
function useIndexedDbLogger(time, modeReceived, addDatabaseLog) {
  useEffect(() => {
    if (time === 0) addDatabaseLog(modeReceived);
  }, [time]);
}

/**
 * Sets up the timer and decrements for each second while the timer is active
 * @param {boolean} timerActive Timer's active state
 * @param {Function} setTime Function to update the timer's state
 */
function useTimerCountdown(timerActive, setTime) {
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
 * @param {Function} setCurrentRound Function to set the current round local state
 * @param {Function} getNextMode Function to get the next mode
 * @param {Function} dispatch Redux dispatch function
 */
function useRoundCountUpdate(time, currentRound, modeReceived, setCurrentRound, getNextMode, dispatch) {
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
 * Updates the current mode when timer is complete
 * @param {number} time Timer's current time
 * @param {string} modeReceived Current mode
 * @param {number} currentRound Current round number
 * @param {Function} getNextMode Function to determine next mode
 * @param {Function} dispatch Redux dispatch function
 */
function useModeUpdate(time, modeReceived, currentRound, getNextMode, dispatch) {
  useEffect(() => {
    if (time === 0) {
      const nextMode = getNextMode(modeReceived, currentRound);
      dispatch(changeCurrentMode(nextMode));
    }
  }, [time]);
}

/**
 * Helper function to restore settings to default.
 * @param {boolean} isResetting Flag indicating whether to reset the settings
 * @param {Function} reset Function that performs the reset
 * @param {Function} setIsResetting Sets the isResseting flag to false
 */
function useDefaultSettings(isResetting, reset, setIsResetting) {
  // necessary to use this useEffect and state because dispatched actions are only avail on the next render
  useEffect(() => {
    if (isResetting) {
      reset();
      setIsResetting(false);
    }
  }, [isResetting]);
}

export { usePageTitleUpdate, useTimeSync, useIndexedDbLogger,
  useTimerCountdown, useRoundCountUpdate, useModeUpdate, useDefaultSettings };
