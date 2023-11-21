import { useSelector } from 'react-redux';
import modeHelper from '../../utils/modeHelper';
import PropTypes from 'prop-types';

/**
 * Displays the current pomodoro session count and it's accompanying message
 * A single "session" is 1 pomodoro + any break
 * @param { string } currentMode the current pomo mode expects 'pomodoro', 'shortBreak', or 'longBreak'
 * @return { JSX.Element }
 */
function PomoStatus({ currentMode }) {
  const currentRoundRedux = useSelector((state) => state.mode.currentRound);
  return (
    <div className='status'>
      <div className='pomoCount'>#{ currentRoundRedux }</div>
      <div className='pomoMessage'>{ modeHelper(currentMode)?.message }</div>
    </div>
  );
};

PomoStatus.propTypes = {
  currentMode: PropTypes.string.isRequired,
};

export default PomoStatus;
