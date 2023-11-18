import { screen, waitFor, fireEvent } from '@testing-library/react';
import { Timer } from '../components/timer/timer';
import { POMODORO, SHORTBREAK, LONGBREAK, SECONDS_PER_MINUTE, MILLISECONDS_PER_SECOND } from '../consts';
import { formatTime } from '../utils/formattingHelpers';
import { customRender } from './setupTests';

/**
 * App initially expects time in minutes and does the conversion, makes a little silly with testing.
 * For ease, I'm using 0.05 (3 seconds) for passedTime to not have to worry about multiple decimal places
 * Doing 1 minute or 30 seconds, is a bit long. jest timeouts after 5000ms - jest.setTimeout(newTimeout) to increase the timeout value
 * testing-libray/react waitFor can be extended, but waits 1ms by default
 */
describe('Timer tests', () => {
  const THREE_SECONDS = 0.05; // 5% of a minute == 3 seconds
  const initialTime = 1;
  const passedTime = initialTime - THREE_SECONDS;
  const initialTimeSec = initialTime * SECONDS_PER_MINUTE;
  const passedTimeSec = passedTime * SECONDS_PER_MINUTE;
  const initialTimeSecFormatted = formatTime(initialTimeSec);
  const passedTimeSecFormatted = formatTime(passedTimeSec);

  function setupTimer(mode) {
    customRender(<Timer timeReceived={initialTime} modeReceived={mode}/>);
  }

  let mode = POMODORO;
  test(`${mode} - Timer decrements`, async () => {
    setupTimer(mode)
    expect(screen.getByText(`${initialTimeSecFormatted}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /start/i,}))

    await waitFor(() => {
      expect(screen.getByText(`${passedTimeSecFormatted}`)).toBeInTheDocument()
    }, {  timeout: 5 * MILLISECONDS_PER_SECOND  })
  }),

  mode = SHORTBREAK;
  test(`${mode} - Timer decrements`, async () => {
    // customRender(<Timer timeReceived={initialTime} modeReceived={SHORTBREAK}/>)
    setupTimer(mode);
    expect(screen.getByText(`${initialTimeSecFormatted}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /start/i,}))

    await waitFor(() => {
      expect(screen.getByText(`${passedTimeSecFormatted}`)).toBeInTheDocument()
    }, {  timeout: 5 * MILLISECONDS_PER_SECOND  })
  }),

  mode = LONGBREAK;
  test(`${mode} - Timer decrements`, async () => {
    setupTimer(mode)

    expect(screen.getByText(`${initialTimeSecFormatted}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /start/i,}))

    await waitFor(() => {
      expect(screen.getByText(`${passedTimeSecFormatted}`)).toBeInTheDocument()
    }, {  timeout: 5 * MILLISECONDS_PER_SECOND  })
  })
})
