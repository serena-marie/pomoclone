import { MODES } from '../../consts/modes';
/**
 *
 * @param {String} modeReceived
 * @return {Object} MODE object
 */
function modeHelper(modeReceived) {
  return Object.values(MODES).find((mode) => mode.name === modeReceived);
}

export { modeHelper };
