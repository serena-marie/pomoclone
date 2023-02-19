import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import '../styles/pomo.scss';
import { TIMERCONTROLS } from '../../consts/timerControls';

/**
 * Not sure if this is the way for documenting components but it's a start!
 * @return {Component} Pomodoro timer component
 */
export function Timer({ timeTest, mode }) {
  console.log(`Received mode: ${mode}, Received time ${timeTest}`);
  const testTime = timeTest * 60;
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(testTime);
  const [buttonState, setButtonState] = useState('START');

  // // just for now, this will be set by settings
  // const testTime = 60 * 60 // minutes * seconds
  // const [time, setTime] = useState(testTime)
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/setInterval
    // https://stackoverflow.com/questions/39426083/update-react-component-every-second
    let timeInterval = null;
    if (timerActive) {
      timeInterval = setInterval(() => {
        if (time > 0) setTime(time - 1);
      }, 1000);
    }

    // called when unmounted
    return () => {
      clearInterval(timeInterval);
    };
  }, [timerActive, time]);

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
    setTime(testTime);
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
  return (
    <div>
      <div className='timerStringContainer'>
        <p> {formatTime(time)} </p>
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
    </div>
  );
}

Timer.propTypes = {
  timeTest: PropTypes.number,
  mode: PropTypes.string,
  modeChange: PropTypes.bool,
};
