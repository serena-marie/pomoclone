/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import { useSelector, useDispatch } from 'react-redux';
import { MODES } from '../consts/modes';
import { changeMode } from './modeSlice';
import { Timer } from './shared/timer';
import './styles/pomo.scss';

/**
 * Not sure if this is the way for documenting components but it's a start!
 * @return {Component} Pomodoro timer component
 */
export default function Pomo() {
  const modeRedux = useSelector((state) => state.mode.value);
  const timeRedux = useSelector((state) => state.mode.time);
  const dispatch = useDispatch();
  function ModeButton({ mode, children }) {
    return (
      <button
        className= {`modeButton ${mode.name === modeRedux ? 'active': ''}`}
        onClick={() => dispatch(changeMode(mode))}
      >
        {children}
      </button>
    );
  }

  return (
    <div className='timerContainer'>
      <div className='modeButtons'>
        <ModeButton mode={MODES.POMODORO}>Pomodoro</ModeButton>
        <ModeButton mode={MODES.SHORT_BREAK}>Short Break</ModeButton>
        <ModeButton mode={MODES.LONG_BREAK}>Long Break</ModeButton>
      </div>
      <Timer timeReceived={timeRedux} modeReceived={modeRedux}/>
    </div>
  );
}
