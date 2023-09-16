import '../../styles/stats.scss';
import ActivitySummary from './ActivitySummary';
import { POMODORO, LONGBREAK, SHORTBREAK } from '../../consts/modes';
import StatSection from './StatSection';
import Calendar from './Calendar';
// eslint-disable-next-line require-jsdoc
export default function StatsOverview() {
  return (
    <div className='statsContainer'>
      <div className='highlightedSummary'>Summary</div>
      <StatSection name='Activity Summary'/>
      <div className='activitySummaryItems'>
        { /* TEST VALUES */ }
        <ActivitySummary type={POMODORO} number={21}/>
        <ActivitySummary type={SHORTBREAK} number={21}/>
        <ActivitySummary type={LONGBREAK} number={21}/>
      </div>
      <StatSection name='Events'/>
      <div className='events'>
        <Calendar />
      </div>
    </div>
  );
}
