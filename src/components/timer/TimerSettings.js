import React from 'react';
import PropTypes from 'prop-types';


// eslint-disable-next-line require-jsdoc
function TimerSettingsEditor({ timeReceived, modeReceived, onTimeSettingsChange, onToggle, updateTime }) {
  /**
   * Updates time to user entered valued on Enter.
   * @param {Event} event
   */
  function handleChange(event) {
    if (event.key === 'Enter') {
      const enteredTime = parseInt(event.target.value);
      if (Number.isInteger(enteredTime) && enteredTime > 0) {
        onTimeSettingsChange(modeReceived, enteredTime); // edit store
        updateTime(enteredTime*60); // edit state
      } else {
        console.log('Unexpected value. Please enter minutes as whole & positive number.');
      }
      onToggle(true);
    }
  };

  return (
    <div>
      <p className='warning'>
        {`Editing time settings for ${modeReceived}`} <br/>
        {`Please enter in minutes. Whole & positive numbers only. Press enter to submit.`}
      </p>
      <input type="number" defaultValue={timeReceived} onKeyDown={handleChange} />
    </div>
  );
};

TimerSettingsEditor.propTypes = {
  timeReceived: PropTypes.number.isRequired,
  modeReceived: PropTypes.string.isRequired,
  onTimeSettingsChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
};

export default TimerSettingsEditor;

