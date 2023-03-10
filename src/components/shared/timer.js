import '../styles/pomo.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { TIMERCONTROLS } from '../../consts/timerControls';
import { MODES } from '../../consts/modes';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode, updateCurrentRound } from '../modeSlice';
import { updateTitle } from './updateTitle';

// eslint-disable-next-line require-jsdoc
export function Timer({ timeReceived, modeReceived }) {
  const timeSeconds = timeReceived * 60;
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(timeSeconds);
  const [buttonState, setButtonState] = useState('START');
  const [toggle, setToggle] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const maxRounds = useSelector((state) => state.mode.rounds);

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
    if (time === 0) {
      const nextMode = getNextMode(modeReceived, currentRound);
      dispatch(changeMode(nextMode));
    }
  }, [time]);

  // Why does initial state show nextMode as longBreak (but then switches to shortbreak)
  // - actually not just initial; nearly showing nextMode as longBreak but then properly switches
  useEffect(() => {
    const nextMode = getNextMode(modeReceived);
    console.log(`modeReceived ${modeReceived} nextMode ${JSON.stringify(nextMode)} time ${time}`);
    if (nextMode === MODES.POMODORO && time === 0) {
      const updatedRound = currentRound + 1;
      dispatch(updateCurrentRound(updatedRound));
      setCurrentRound(updatedRound);
    }
  }, [time]);

  /**
   * Gets the upcoming mode based on the current mode and pomodoro round number.
   * @param {String} mode Current mode's name
   * @param {Number} round Current round's number
   * @return {String} The name of the next round
   */
  function getNextMode(mode, round) {
    if (mode === MODES.POMODORO.name && round < maxRounds) return MODES.SHORTBREAK;
    if (mode === MODES.SHORTBREAK.name || mode === MODES.LONGBREAK.name) return MODES.POMODORO;
    return MODES.LONGBREAK;
  }

  /**
  * Formats time to be displayed
  * @param {number} time Time in seconds
  * @return {String} Formatted time 00:00
  */
  function formatTime(time) {
    let minute = Math.floor(time / 60);
    let second = Math.floor(time % 60);

    minute = minute.toString().length === 1 ? '0' + minute : minute;
    second = second.toString().length === 1 ? '0' + second : second;
    return `${minute}:${second}`;
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
  * Resets time back to last set time
  */
  function reset() {
    setTime(timeSeconds);
    setTimerActive(false);
    setButtonState(TIMERCONTROLS.start);
  }

  /**
   * Toggles time edit to false
   */
  function toggleTimeEdit() {
    setToggle(false);
  }

  /**
   * Updates time to user entered valued on Enter.
   * @param {Event} event
   */
  function handleChange(event) {
    if (event.key === 'Enter') {
      if (event.target.value % 1 == 0 && event.target.value > 0) {
        setTime(event.target.value * 60);
        setToggle(true);
      } else {
        console.log('Unexpected value. Please enter minutes as whole & positive number.');
        setToggle(true);
      }
    }
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
  return (
    <div>
      <div className='timerStringContainer'>
        {
          toggle ? (
            <div>
              <p onDoubleClick={toggleTimeEdit}> {formatTime(time)} </p>
              <div className='timerControls'>
                <button className='startPause' onClick={() => timerControl(buttonState)}> { buttonState } </button>
                <FontAwesomeIcon icon={faForwardStep} onClick={() => reset()}/>
                <button onClick={() => reset()}> { TIMERCONTROLS.reset }</button>

                {/** Only list Add / Subtract controls when timer is active */}
                {
                  timerActive &&
                            <div className='timerManipulate'>
                              <button onClick={() => modifyActiveTimer(5, TIMERCONTROLS.add)}>
                                { TIMERCONTROLS.add }
                              </button>
                              <button onClick={() => modifyActiveTimer(1, TIMERCONTROLS.subtract)}>
                                { TIMERCONTROLS.subtract }
                              </button>
                            </div>
                }
              </div>
            </div>
          ) : (
            <div>
              <p className='warning'>Please enter in minutes. Whole & positive numbers only. Press enter to submit.</p>
              <input type="number" defaultValue={timeReceived} onKeyDown={handleChange} />
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
