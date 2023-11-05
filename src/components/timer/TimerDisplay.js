import PropTypes from 'prop-types';
import formatTime from '../../utils/formatTime';

/**
 * Displays the formatted time remaining.
 * @param {number} time The time remaining in seconds
 * @return {JSX.Element} Formatted time
 */
function TimerDisplay({ time, onDoubleClick }) {
  return <p className='timer' onDoubleClick={onDoubleClick}>{formatTime(time)}</p>;
}

TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export default TimerDisplay;
