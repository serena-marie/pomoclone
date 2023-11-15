import Dexie from 'dexie';
import { MILLISECONDS_PER_MINUTE } from '../consts/timeMaths';

const db = new Dexie('PomocloneLogs');
db.version(1).stores({
  pomodoroLogs: '++id, mode, startDate, endDate, total',
});

/**
 * Adds pomodoro session to database
 * @param {string} currentMode the current sessions mode
 * @param {Date} startTime Date Object with ISOString start time of session
 * @param {Date} endTime Date Object with ISOString end time of sessions
 * @return {object} JSON of the logged event
 */
function addToDatabase(currentMode, startTime, endTime) {
  const log = {
    mode: currentMode,
    startTime: startTime,
    endTime: endTime,
    totalDuration: (new Date(endTime) - new Date(startTime)) / MILLISECONDS_PER_MINUTE,
  };
  db.pomodoroLogs.add(log).catch((error) => {
    console.error('Failed to log this stint :( Error: ' + error);
  });
  return log;
}

export { db, addToDatabase };
