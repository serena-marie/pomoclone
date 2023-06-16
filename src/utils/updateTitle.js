import modeHelper from './modeHelper';

/**
 * Updates tab title with current countdown time & mode's message
 * @param {String} time Formatted time
 * @param {String} mode Name of the current mode
 */
export function updateTitle(time, mode) {
  document.title = formatTitle(time, mode);
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
