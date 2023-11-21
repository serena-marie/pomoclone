
import { screen } from '@testing-library/react';
import PomoStatus from '../components/pomoStatus/PomoStatus';
import { customRender } from './setupTests';
import { POMODORO } from '../consts';
describe('inital page render, rounds and message', () => {

  beforeEach(() => {
    customRender(<PomoStatus currentMode={POMODORO}/>);
  })

  test('should display correct inital round', () => {
    const round = screen.getByText(/#1/i);
    expect(round).toBeInTheDocument();
  }),
  test('should display correct message', () => {
    const message = screen.getByText(/time to focus!/i);
    expect(message).toBeInTheDocument();
  })
})