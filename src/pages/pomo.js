import { useSelector } from 'react-redux';
import { Timer } from '../components/timer/timer';
import ModesButton from '../components/modeButtons/ModesButtons';
import '../styles/pomo.scss';
import PomoStatus from '../components/pomoStatus/PomoStatus';

// eslint-disable-next-line require-jsdoc
export default function Pomo() {
  const modeRedux = useSelector((state) => state.mode.currentMode);
  const timeRedux = useSelector((state) => state.mode.currentTime);

  return (
    <>
      <div className='timerContainer'>
        <ModesButton />
        <Timer timeReceived={timeRedux} modeReceived={modeRedux}/>
      </div>
      <PomoStatus currentMode={modeRedux}/>
    </>
  );
}
