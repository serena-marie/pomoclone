import PropTypes from 'prop-types';
import { changeMode } from './modeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { modeType } from './types';

/**
   * @param {Object} mode MODE object
   * @param {String} children
   * @return {Button} ModeButton
   */
function ModeButton({ mode, children }) {
  const modeRedux = useSelector((state) => state.mode.value);
  const dispatch = useDispatch();
  return (
    <button
      className= {`modeButton ${mode.name === modeRedux ? 'active': ''}`}
      onClick={() => dispatch(changeMode(mode))}
    >
      {children}
    </button>
  );
}

ModeButton.propTypes = {
  mode: modeType,
  children: PropTypes.string,
};

export default ModeButton;
