import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../../styles/calendar.scss';
// eslint-disable-next-line require-jsdoc
export default function Calendar() {
  return (
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
  );
}
