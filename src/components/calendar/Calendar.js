import { DateTime } from 'luxon';
import '../../styles/Calendar.scss';

/* eslint-disable require-jsdoc */
export default function Calendar(/* { startTime, endTime } */) {
  // Temporary
  const startTime = DateTime.fromObject({ hour: 9, minute: 0 }); // 9:00 AM
  const endTime = DateTime.fromObject({ hour: 19, minute: 15 }); // 7:00 PM

  const timeSlots = [];
  let currentTime = startTime;
  while (currentTime < endTime) {
    timeSlots.push(currentTime);
    currentTime = currentTime.plus({ minutes: 15 });
  }

  const currentDate = DateTime.now();
  const weekStart = currentDate.startOf('week');
  const weekEnd = currentDate.endOf('week');

  const weekDates = [];
  let currentDay = weekStart;
  while (currentDay <= weekEnd) {
    weekDates.push(currentDay);
    currentDay = currentDay.plus({days: 1});
  }
  return (
    <div>
      <h2>Weekly Calendar</h2>
      <div className='weekHeader'>{weekStart.toFormat('MMMM dd, yyyy')} - {weekEnd.toFormat('MMMM dd, yyyy')}</div>
      <div className='dates'></div>
      <div className="calendar">
        <div className="time-axis">
          {
            timeSlots.map((timeSlot) => (
              <div key={timeSlot.toISO()}>{timeSlot.toFormat('h:mm a')}</div>
            ))
          }
        </div>
        <div className="date-axis">
          {
            weekDates.map((date) => (
              <div className='day-axis' key={date.toISO()}>{date.toFormat('ccc')}</div>
            ))
          }
        </div>
        <div className="calendar-body">
          {/* events */}
        </div>
      </div>
    </div>
  );
}
