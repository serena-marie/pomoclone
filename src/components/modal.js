/* eslint-disable require-jsdoc */
import '../styles/modal.scss';
import StatsOverview from './stats';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function Modal({setIsModalOpen}) {
  const contentRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="modalContainer">
      <div className="modal" ref={contentRef}>
        <h1> Hello from Modal </h1>
        <StatsOverview/>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setIsModalOpen: PropTypes.func,
};
