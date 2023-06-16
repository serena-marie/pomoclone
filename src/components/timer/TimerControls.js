import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { TIMERCONTROLS } from '../../consts/timerControls';

// eslint-disable-next-line require-jsdoc
function TimerControls({ timerActive, buttonState, onTimerControl, onReset, onResetSettings, onModifyActiveTimer}) {
  return (
    <div className='timerControls'>
      <button className='startPause' onClick={() => onTimerControl(buttonState)}> { buttonState } </button>
      <FontAwesomeIcon icon={faForwardStep} onClick={() => onReset()}/>
      <button onClick={onReset}> { TIMERCONTROLS.reset }</button>
      <button onClick={onResetSettings}>Restore Setting to default</button>
      {/** Only list Add / Subtract controls when timer is active */}
      {
        timerActive &&
                  <div className='timerManipulate'>
                    <button onClick={() => onModifyActiveTimer(5, TIMERCONTROLS.add)}>
                      { TIMERCONTROLS.add }
                    </button>
                    <button onClick={() => onModifyActiveTimer(1, TIMERCONTROLS.subtract)}>
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
