/* eslint-disable require-jsdoc */
import PropTypes from 'prop-types';
import { MODES, POMODORO, LONGBREAK, SHORTBREAK } from '../../consts/modes';
import '../../styles/summary.scss';

export default function ActivitySummary({type, number}) {
  function typeSwitch(activityType) {
    switch (activityType) {
      case POMODORO:
        return 'focused';
      case LONGBREAK:
        return 'long break';
      case SHORTBREAK:
        return 'short break';
      default:
        return '';
    }
  }
  return (
    <div className='summaryContainer'>
      <div className='content'>
        <div className='number'>
          { number }
        </div>
        <div className='details'>
          hours
          <div> { typeSwitch(type) } </div>
        </div>
      </div>
    </div>
  );
}

const validType = (props, propName, componentName) => {
  if (!MODES[props[propName]]) {
    return new Error(
        `Invalid prop ${propName} passed to ${componentName}.
        Received '${props[propName]}' Expected a valid mode.`,
    );
  }
};
ActivitySummary.propTypes = {
  type: validType,
  number: PropTypes.number,
};

