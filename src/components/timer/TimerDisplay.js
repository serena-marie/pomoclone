import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the formatted time remaining.
 * @param {number} time The time remaining in seconds
 * @return {JSX.Element} Formatted time
 */
function TimerDisplay({ time, onDoubleClick }) {
  return <p className='timer' onDoubleClick={onDoubleClick}>{formatTime(time)}</p>;
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

TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export default TimerDisplay;
