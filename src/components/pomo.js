import { useSelector } from 'react-redux';
import { MODES, POMODORO, LONGBREAK, SHORTBREAK } from '../consts/modes';
import { Timer } from './shared/timer';
import { modeHelper } from './shared/helper';
import ModeButton from './ModeButton';
import './styles/pomo.scss';

// eslint-disable-next-line require-jsdoc
export default function Pomo() {
  const modeRedux = useSelector((state) => state.mode.currentMode);
  const timeRedux = useSelector((state) => state.mode.currentTime);
  const currentRoundRedux = useSelector((state) => state.mode.currentRound);

  return (
    <>
      <div className='timerContainer'>
        <div className='modeButtons'>
          <ModeButton mode={MODES[POMODORO]}>Pomodoro</ModeButton>
          <ModeButton mode={MODES[SHORTBREAK]}>Short Break</ModeButton>
          <ModeButton mode={MODES[LONGBREAK]}>Long Break</ModeButton>
        </div>
        <Timer timeReceived={timeRedux} modeReceived={modeRedux}/>
      </div>
      <div className='pomoCount'>#{ currentRoundRedux }</div>
      <div className='pomoMessage'>{ modeHelper(modeRedux)?.message }</div>
    </>
  );
}
