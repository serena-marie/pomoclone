import PropTypes from 'prop-types';
import '../../styles/section.scss';
// eslint-disable-next-line require-jsdoc
export default function StatSection({name}) {
  return (
    <div className='sectionContainer'>
      <p className='sectionHeader'>{name}</p>
      <div className='sectionDivider'></div>
    </div>
  );
}

StatSection.propTypes = {
  name: PropTypes.string.isRequired,
};
