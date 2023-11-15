import PropTypes from 'prop-types';
import { changeCurrentMode } from '../../store/modeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { modeType } from '../types';

/**
   * @param {Object} mode MODE object, name of the button being used
   * @param {String} children
   * @return {Button} ModeButton
   */
function ModeButton({ mode, children }) {
  const modeRedux = useSelector((state) => state.mode.currentMode);
  const isTimerActive = useSelector((state) => state.mode.timerActive);
  const dispatch = useDispatch();

  return (
    <>
      {
        isTimerActive ?
        <button className= {`modeButton ${mode.name === modeRedux ? 'activeMode': ''} disabled`}>
          { children }
        </button> :
        <button className= {`modeButton ${mode.name === modeRedux ? 'activeMode': ''}`}
          onClick={() => dispatch(changeCurrentMode(mode.name))}>{children}</button>
      }
    </>
  );
}

ModeButton.propTypes = {
  mode: modeType,
  children: PropTypes.string,
};

export default ModeButton;
