import modeHelper from './modeHelper';

/**
  * Formats time to be displayed
  * @param {number} time Time in seconds
  * @return {String} Formatted time 00:00
  */
function formatTime(time) {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);

  minute = minute.toString().length === 1 ? '0' + minute : minute;
  second = second.toString().length === 1 ? '0' + second : second;
  return `${minute}:${second}`;
}

/**
 * Formats title and message for tab displays as `Time - Message`
 * @param {String} time Formatted time
 * @param {String} mode Name of the current mode
 * @return {String} Formatted document title
 */
function formatTitle(time, mode) {
  const message = modeHelper(mode)?.message;
  return `${time} - ${message}`;
}

export { formatTime, formatTitle };
