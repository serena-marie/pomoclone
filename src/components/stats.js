import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/stats.scss';

// eslint-disable-next-line require-jsdoc
export default function StatsOverview() {
  return (
    <div>
      <div className='summaryDiv'>Summary</div>
      <div className='activitySummary'>
        {/* Could probably make this a component */}
      </div>
      <div className='events'>
        <div className='calendar'>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView='timeGridWeek'
            height={'50vh'}
            allDaySlot={false}
            dayHeaderFormat={{day: '2-digit', weekday: 'short'}}
            scrollTime={false}
            scrollTimeReset={false}
          />
        </div>
      </div>
    </div>
  );
}
