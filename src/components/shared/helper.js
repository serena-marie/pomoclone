import { MODES } from '../../consts/modes';
/**
 * Returns the full mode object. Useful when you don't have the key value.
 * @param {String} modeReceived
 * @return {Object} MODE object
 */
function modeHelper(modeReceived) {
  return Object.values(MODES).find((mode) => mode.name === modeReceived);
}

export { modeHelper };
