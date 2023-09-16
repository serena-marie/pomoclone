import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const ModalContext = createContext();

/**
 * ModalProvider is a context provider for managing modal state
 * @param {React.node} children
 * @return {JSX.Element}
 */
function ModalProvider({children}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
      {children}
    </ModalContext.Provider>
  );
}

/**
 * Custom hook for accessing the ModalContext
 * @return {Function}
 */
function useModalContext() {
  return useContext(ModalContext);
}

export { ModalProvider, useModalContext };

ModalProvider.propTypes = {
  children: PropTypes.node,
};
