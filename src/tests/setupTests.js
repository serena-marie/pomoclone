// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// //  custom renderer - separate out?
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';

// eslint-disable-next-line react/prop-types
const TestWrapper = ({ children }) => {
  // return <Provider store={store}>{children}</Provider>;
  return (
    <React.StrictMode>
      <Provider store={store}>
        {children}
      </Provider>
    </React.StrictMode>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: TestWrapper, ...options });

export { customRender };
// //  custom renderer - separate out?
