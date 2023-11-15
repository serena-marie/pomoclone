import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { TIMERCONTROLS } from '../../consts/';

/**
 * Component that displays Timer Controls - Start / Pause and Skip Forward buttons
 * @param { boolean } timerActive timer state from redux
 * @param { string } buttonState current state to display for start / pause button
 * @param { Function } onTimerControl Function that handles timer's behavior based on buttonState
 * @param { Function } onReset Function that resets timer back to initial state
 * @param { Function } onResetSettings Function that resets ALL settings back to app default
 * @param { Function } onModifyActiveTimer Function that modifies the active timer to add or subtract time
 * @return { JSX.Element }
 */
function TimerControls({ timerActive, buttonState, onTimerControl, onReset, onResetSettings, onModifyActiveTimer}) {
  /**
   * Handles click on skip forward button by pausing (and logging) and then resetting the timer
   */
  function handleSkipForward() {
    onTimerControl(buttonState);
    onReset();
  }

  return (
    <div className='timerControls'>
      <button className='controls' onClick={() => onTimerControl(buttonState)}> { buttonState } </button>
      <FontAwesomeIcon icon={faForwardStep} onClick={() => handleSkipForward()}/>
      {/* <button onClick={onReset}> { TIMERCONTROLS.reset }</button>
      <button onClick={onResetSettings}>Restore Setting to default</button> */}
      {/** Only list Add / Subtract controls when timer is active */}
      {
        timerActive &&
                  <div className='timerManipulate'>
                    <button className='controls' onClick={() => onModifyActiveTimer(5, TIMERCONTROLS.add)}>
                      { TIMERCONTROLS.add }
                    </button>
                    <button className='controls' onClick={() => onModifyActiveTimer(1, TIMERCONTROLS.subtract)}>
                      { TIMERCONTROLS.subtract }
                    </button>
                  </div>
      }
    </div>
  );
};

TimerControls.propTypes = {
  timerActive: PropTypes.bool.isRequired,
  buttonState: PropTypes.string.isRequired,
  onTimerControl: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onResetSettings: PropTypes.func.isRequired,
  onModifyActiveTimer: PropTypes.func.isRequired,
};

export default TimerControls;
