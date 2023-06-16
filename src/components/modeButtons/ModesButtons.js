import ModeButton from './ModeButton';
import { MODES, POMODORO, LONGBREAK, SHORTBREAK } from '../../consts/modes';

// eslint-disable-next-line require-jsdoc
function ModesButton() {
  return (
    <div className='modeButtons'>
      <ModeButton mode={MODES[POMODORO]}>Pomodoro</ModeButton>
      <ModeButton mode={MODES[SHORTBREAK]}>Short Break</ModeButton>
      <ModeButton mode={MODES[LONGBREAK]}>Long Break</ModeButton>
    </div>
  );
};

export default ModesButton;
