import { useSelector } from 'react-redux';
import { Timer } from '../components/timer/timer';
import ModesButton from '../components/modeButtons/ModesButtons';
import '../styles/pomo.scss';
import PomoStatus from '../components/pomoStatus/PomoStatus';
import Modal from '../components/modal/modal';
import { useModalContext } from '../components/modal/ModalContext';

// eslint-disable-next-line require-jsdoc
export default function Pomo() {
  const modeRedux = useSelector((state) => state.mode.currentMode);
  const timeRedux = useSelector((state) => state.mode.currentTime);

  // eslint-disable-next-line no-unused-vars
  const { isModalOpen, setIsModalOpen } = useModalContext();

  return (
    <>
      <div className='timerContainer'>
        <ModesButton />
        <Timer timeReceived={timeRedux} modeReceived={modeRedux}/>
      </div>
      <PomoStatus currentMode={modeRedux}/>
      { isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : ''}
    </>
  );
}
