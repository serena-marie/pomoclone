import { useSelector } from 'react-redux';
import modeHelper from '../../utils/modeHelper';
import PropTypes from 'prop-types';

// eslint-disable-next-line require-jsdoc
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
