/* eslint-disable no-unused-vars */
import '../../styles/pomo.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { TIMERCONTROLS } from '../../consts/timerControls';
import { MODES, POMODORO, LONGBREAK, SHORTBREAK } from '../../consts/modes';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentMode, updateCurrentRound, updateTimeSettings, resetUserSettings } from '../../store/modeSlice';
import { updateTitle } from '../../utils/updateTitle';
import TimerDisplay from './TimerDisplay';
import formatTime from '../../utils/formatTime';
import TimerControls from './TimerControls';
import TimerSettingsEditor from './TimerSettings';
// eslint-disable-next-line require-jsdoc
export function Timer({ timeReceived, modeReceived }) {
  const timeSeconds = timeReceived * 60;
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(timeSeconds);
  const [buttonState, setButtonState] = useState('START');
  const [toggle, setToggle] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = useSelector((state) => state.mode.rounds);
  const [isResetting, setIsResetting] = useState(false);
  const dispatch = useDispatch();

  // update page title
  useEffect(() => {
    updateTitle(formatTime(time), modeReceived);
  }, [time]);

  // Updates time when mode changes
  useEffect(() => {
    if (time !== timeSeconds && timerActive) reset();
    else {
      setTime(timeSeconds);
      // if trying to edit time when switching modes, toggle off.
      if (!toggle) setToggle(true);
    }
  }, [modeReceived]);

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    // https://stackoverflow.com/questions/39426083/update-react-component-every-second
    let timeInterval = null;
    if (timerActive) {
      timeInterval = setInterval(() => {
        setTime((prevTime) => {
          return prevTime > 0 ? prevTime - 1 : 0;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timeInterval);
    };
  }, [timerActive]);

  useEffect(() => {
    const nextMode = getNextMode(modeReceived, currentRound);
    if (nextMode === MODES.POMODORO && time === 0) {
      const updatedRound = currentRound + 1;
      dispatch(updateCurrentRound(updatedRound));
      setCurrentRound(updatedRound);
    }
  }, [time]);

  useEffect(() => {
    if (time === 0) {
      const nextMode = getNextMode(modeReceived, currentRound);
      dispatch(changeCurrentMode(nextMode));
    }
  }, [time]);

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

  // necessary to use this useEffect and state because dispatched actions are only avail on the next render
  useEffect(() => {
    if (isResetting) {
      reset();
      setIsResetting(false);
    }
  }, [isResetting]);

  /**
  * Resets time back to last set time
  * Note to self - send in timeSeconds in most cases
  */
  function reset() {
    setTime(timeSeconds);
    setTimerActive(false);
    setButtonState(TIMERCONTROLS.start);
  }

  /**
   * Controls timer
   * @param {String} state
   */
  function timerControl(state) {
    switch (state) {
      case TIMERCONTROLS.start:
        setTimerActive(true);
        setButtonState(TIMERCONTROLS.pause);
        break;
      case TIMERCONTROLS.pause:
        setTimerActive(false);
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
    <div>
      <div className='timerStringContainer'>
        {
          toggle ? (
            <div>
              <TimerDisplay time={time} onDoubleClick={toggleTimeEdit}/>
              <TimerControls timerActive={timerActive} buttonState={buttonState} onReset={reset}
                onTimerControl={timerControl} onResetSettings={resetSettings}
                onModifyActiveTimer={modifyActiveTimer}/>
            </div>
          ) : (
            <div>
              <TimerSettingsEditor timeReceived={timeReceived} modeReceived={modeReceived}
                onTimeSettingsChange={updateTimeSettings} onToggle={updateToggleState} updateTime={updateTime}/>
              <p>{(() => {
                console.log(`timeReceived ${timeReceived}`);
              })()}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

Timer.propTypes = {
  timeReceived: PropTypes.number,
  modeReceived: PropTypes.string,
};
