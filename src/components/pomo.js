import {useEffect, useState} from 'react';
import './modal';
import './styles/pomo.scss';

// https://blog.bitsrc.io/explaining-enums-enumerations-in-plain-javascript-895a226622e3
const TimerControls = Object.freeze({
  start: 'START',
  stop: 'STOP',
  pause: 'PAUSE',
  reset: 'RESET',
  add: 'ADD',
  subtract: 'SUBTRACT',
});

/**
 * Not sure if this is the way for documenting components but it's a start!
 * @return {Component} Pomodoro timer component
 */
export default function Pomo() {
  const minuteTest = 1;
  const testTime = minuteTest * 60;
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
    console.log(`${minutes} seconds received`);
    switch (operation) {
      case TimerControls.add:
        setTime(time+minutes);
        break;
      case TimerControls.subtract:
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
  }

  /**
  * Controls timer
  * @param {String} state
  */
  function timerControl(state) {
    switch (state) {
      case TimerControls.start:
        setTimerActive(true);
        setButtonState(TimerControls.pause);
        break;
      case TimerControls.pause:
        setTimerActive(false);
        setButtonState(TimerControls.start);
        break;
      default:
        console.log(`Hrmmmm, how peculiar. An error occurred.`);
    }
  }
  return (
    <div>
      <div className='timerContainer'>
        <div className='timerStringContainer'>
          <p> {formatTime(time)} </p>
          <div className='timerControls'>
            <button onClick={() => timerControl(buttonState)}> { buttonState } </button>
            <button onClick={() => reset()}> { TimerControls.reset }</button>

            {/** Only list Add / Subtract controls when timer is active */}
            {
              timerActive &&
                        <div className='timerManipulate'>
                          <button onClick={() => modifyActiveTimer(5, TimerControls.add)}>
                            { TimerControls.add }
                          </button>
                          <button onClick={() => modifyActiveTimer(1, TimerControls.subtract)}>
                            { TimerControls.subtract }
                          </button>
                        </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
