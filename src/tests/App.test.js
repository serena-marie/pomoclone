import { screen } from '@testing-library/react';
import App from '../App';
import { customRender } from './setupTests';

describe('Initial page loage, button render tests', () => {
  // eslint-disable-next-line no-unused-vars
  let renderedApp;

  beforeEach(() => {
    renderedApp = customRender(<App />);
  });

  test('renders start button', () => {
    const startButton = screen.getByRole('button', {
      name: /start/i,
    });
    expect(startButton).toBeInTheDocument();
  });

  test('renders pomodoro button', () => {
    const pomodoroButton = screen.getByRole('button', {
      name: /pomodoro/i,
    });
    expect(pomodoroButton).toBeInTheDocument();
  });

  test('renders short break button', () => {
    const shortbreakButton = screen.getByRole('button', {
      name: /short break/i,
    });
    expect(shortbreakButton).toBeInTheDocument();
  });

  test('renders long break button', () => {
    const longbreakButton = screen.getByRole('button', {
      name: /long break/i,
    });
    expect(longbreakButton).toBeInTheDocument();
  });
});

describe('Initial page load, timer', () => {
  // eslint-disable-next-line no-unused-vars
  let renderedApp;

  beforeEach(() => {
    renderedApp = customRender(<App />);
  });

  test('renders timer element', () => {
    // To Do
  });
});
