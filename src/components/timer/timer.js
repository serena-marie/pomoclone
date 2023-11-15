import '../../styles/pomo.scss';
import { useState } from 'react';
import { MODES, POMODORO, LONGBREAK, SHORTBREAK, TIMERCONTROLS } from '../../consts';
import { useSelector, useDispatch } from 'react-redux';
import { updateTimeSettings, resetUserSettings, updateTimerActive } from '../../store/modeSlice';
import { addToDatabase } from '../../database/db';
import PropTypes from 'prop-types';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerSettingsEditor from './TimerSettings';
import * as Hooks from './hooks';

/**
 * Displays Timer and handles timer functions
 * @param {number} timeReceived the time received, in minutes
 * @param {string} modeReceived the current timer mode ["pomodoro", "shortBreak", "longBreak"]
 * @return {JSX.Element}
 */
export function Timer({ timeReceived, modeReceived }) {
  const timeSeconds = timeReceived * 60;
  const [time, setTime] = useState(timeSeconds);
  const [buttonState, setButtonState] = useState('START');
  const [toggle, setToggle] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResetting, setIsResetting] = useState(false);
  const [currentStartTime, setCurrentStartTime] = useState(null);
  const maxRounds = useSelector((state) => state.mode.rounds);
  const timerActive = useSelector((state) => state.mode.timerActive);

  const dispatch = useDispatch();

  // CUSTOM HOOKS; see timer/hooks.js
  Hooks.usePageTitleUpdate(time, modeReceived);
  Hooks.useTimeSync(timeSeconds, timerActive, modeReceived, toggle,
      resetTimer, setToggle, setTime, logPomoSession);
  Hooks.useIndexedDbLogger(time, modeReceived, logPomoSession);
  Hooks.useTimerCountdown(timerActive, setTime);
  Hooks.useRoundCountUpdate(time, currentRound, modeReceived, setCurrentRound, getNextMode, dispatch);
  Hooks.useModeUpdate(time, modeReceived, currentRound, getNextMode, dispatch);
  Hooks.useDefaultSettings(isResetting, resetTimer, setIsResetting);

  /**
   * Adds logging for current pomo block, tracking pomo type, startTime, endTime, and totalDuration.
   * Once logged, updates the currentTime to null
   * @param {string} modeType
   */
  function logPomoSession(modeType) {
    const currentEndTime = new Date().toISOString();
    addToDatabase(modeType, currentStartTime, currentEndTime);
    setCurrentStartTime(null);
  }

  /**
   * Gets the upcoming mode based on the current mode and pomodoro round number.
   * @param {String} mode Current mode's name
   * @param {Number} round Current round's number
   * @return {String} The name of the next round
   */
  function getNextMode(mode, round) {
    if (mode === MODES[POMODORO].name && round < maxRounds) return MODES[SHORTBREAK]?.name;
    if (mode === MODES[SHORTBREAK].name || mode === MODES[LONGBREAK].name) return MODES[POMODORO]?.name;
    return MODES[LONGBREAK]?.name;
  }

  /**
  * Resets time back to last set time
  * Note to self - send in timeSeconds in most cases
  */
  function resetTimer() {
    setTime(timeSeconds);
    dispatch(updateTimerActive(false));
    setButtonState(TIMERCONTROLS.start);
  }

  /**
   * Controls timer's behavior based on provided state.
   * When the state is start: initiates timer's start time, activates the timer, and updates button's state
   * When the state is pause: logs the current pomodoro session, stops the timer, and updates button's state
   * @param {string} state The timer's current state
   */
  function timerControl(state) {
    switch (state) {
      case TIMERCONTROLS.start:
        setCurrentStartTime(new Date().toISOString());
        dispatch(updateTimerActive(true));
        setButtonState(TIMERCONTROLS.pause);
        break;
      case TIMERCONTROLS.pause:
        logPomoSession(modeReceived);
        dispatch(updateTimerActive(false));
        setButtonState(TIMERCONTROLS.start);
        break;
      default:
        console.log(`Hrmmmm, how peculiar. An error occurred.`);
    }
  }

  /**
   * Resets ALL settings back to app default
   * This doesn't quite work as expected because reset is called before dispatch finishes.
   */
  function resetSettings() {
    dispatch(resetUserSettings({ mode: modeReceived }));
    setIsResetting(true);
  }

  /**
  * Modifies active timer to either add or subtract time.
  * @param {number} minutes Number of seconds to be added/subtracted
  * @param {String} operation ADD or SUBTRACT
  */
  function modifyActiveTimer(minutes, operation) {
    minutes = minutes * 60; // if receiving seconds, *60 to convert to minutes
    console.log(`Modifying an Active Timer ${minutes} seconds received`);
    switch (operation) {
      case TIMERCONTROLS.add:
        setTime(time+minutes);
        break;
      case TIMERCONTROLS.subtract:
                // Can't have negative time :P
                time-minutes > 0 ? setTime(time-minutes) : setTime(0);
        break;
      default:
        console.log(`Hrmmmm, how peculiar. An error occurred.`);
    }
  }

  /**
 * Toggles time edit to false
 */
  function toggleTimeEdit() {
    setToggle(false);
  }

  /**
 * Callback to allow children components to update time
 * @param {number} newTime
 */
  const updateTime = (newTime) => {
    setTime(newTime);
  };

  const updateToggleState = (newState) => {
    if (typeof newState === 'boolean') setToggle(newState);
    else {
      console.log(`Toggle state must be boolean. Received ${typeof newState}`);
    }
  };

  return (
    <div className="timerStringContainer">
      {toggle ? (
        <div className="timerControlsContainer">
          <TimerDisplay time={time} onDoubleClick={toggleTimeEdit} />
          <TimerControls
            timerActive={timerActive}
            buttonState={buttonState}
            onReset={resetTimer}
            onTimerControl={timerControl}
            onResetSettings={resetSettings}
            onModifyActiveTimer={modifyActiveTimer}
          />
        </div>
      ) : (
        <div className="timerSettingsEditorContainer">
          <TimerSettingsEditor
            timeReceived={timeReceived}
            modeReceived={modeReceived}
            onTimeSettingsChange={updateTimeSettings}
            onToggle={updateToggleState}
            updateTime={updateTime}
          />
        </div>
      )}
    </div>
  );
}

Timer.propTypes = {
  timeReceived: PropTypes.number,
  modeReceived: PropTypes.string,
};
