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

export default formatTime;
