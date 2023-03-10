import PropTypes from 'prop-types';

const { shape, string, number } = PropTypes;

const modeType = shape({
  name: string,
  time: number,
  message: string,
});

export { modeType };
