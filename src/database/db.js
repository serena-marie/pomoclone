import Dexie from 'dexie';

export const db = new Dexie('PomocloneLogs');
db.version(1).stores({
  pomodoroLogs: '++id, mode, startDate, endDate, total',
});
